'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Order, { IOrderItem, OrderStatus } from '@/models/Order';
import Account, { AccountActions } from '@/models/Account';
import { getServerSession } from 'next-auth';
import { toJSON } from '@/utils';

const orderFSM: {
  [key in OrderStatus]: { Y: Array<OrderStatus>; N: Array<OrderStatus> };
} = {
  // PRE
  PLACED: { Y: [], N: [] },
  'CONFIRMATION-REQUEST': { Y: ['PLACED'], N: [] },

  // MAIN
  CONFIRMED: { Y: ['CONFIRMATION-REQUEST'], N: [] },
  DISPATCHED: { Y: ['CONFIRMED'], N: [] },
  RECEIVED: { Y: ['DISPATCHED'], N: [] },

  // MISC
  CANCELED: {
    Y: ['CONFIRMED', 'DISPATCHED', 'PLACED', 'CONFIRMATION-REQUEST'],
    N: ['RECEIVED', 'CONFIRMATION-REQUEST'],
  },
  REJECTED: { Y: ['PLACED', 'CONFIRMED'], N: [] },

  // POST
  'REFUND-REQUEST': { Y: [], N: ['CANCELED', 'REJECTED'] },
  'REFUND-WAITING': { Y: ['REFUND-REQUEST'], N: [] },
  'REFUND-DONE': { Y: ['REFUND-WAITING'], N: [] },
};

export const getOrders = async (): Promise<Array<any>> => {
  const session = await getServerSession(authOptions);
  const userType = session?.user.custome_data.user_type;
  const db_id = session?.user.custome_data.db_id;
  let result: Array<any> = [];

  if (userType === 'SELLER') {
    result = await Order.find({ seller: db_id })
      .select({ _id: 1, timeline: 1, status: 1, order_status: 1 })
      .lean()
      .exec();
  } else if (userType === 'BUYER') {
    result = await Order.find({ buyer: db_id })
      .select({ _id: 1, timeline: 1, status: 1, order_status: 1 })
      .lean()
      .exec();
  } else if (userType === 'DISPATCHER') {
    result = await Order.find({ dispatcher: db_id })
      .select({ _id: 1, timeline: 1, status: 1, order_status: 1 })
      .lean()
      .exec();
  }
  return toJSON(result);
};

export const getOrderDetails = async (order_db_id: string) =>
  toJSON(
    await Order.findById(order_db_id)
      .select({
        messages: { m: 1, s: 1, t: 1 },
        delivery_address: 1,
        available_items: 1,
        prescription: 1,
        order_status: 1,
        total_cost: 1,
        timeline: 1,
        payment: 1,
        buyer: 1,
      })
      .populate({
        path: 'buyer',
        select: {
          primary_email: 1,
          first_name: 1,
          last_name: 1,
          address: 1,
        },
      })
      .populate({
        path: 'prescription',
        select: {
          file: 1,
        },
        populate: {
          path: 'file',
          select: {
            file: 1,
          },
        },
      })
      .lean()
      .exec()
  );

export const setOrderItems = async ({
  order_db_id,
  available_items,
  non_available_items,
}: {
  order_db_id: string;
  available_items: Array<IOrderItem>;
  non_available_items: Array<IOrderItem>;
}) => {
  await Order.findByIdAndUpdate(order_db_id, {
    available_items,
    non_available_items,
  }).exec();
  return true;
};

export const updateDosage = async ({
  order_db_id,
  comment_db_arr_id,
  dosage_details,
}: {
  order_db_id: string;
  comment_db_arr_id: string;
  dosage_details: string;
}) =>
  !!(await Order.findByIdAndUpdate(
    order_db_id,
    {
      $set: {
        'available_items.$[item].dosage_details': dosage_details,
      },
    },
    {
      arrayFilters: [{ 'item._id': comment_db_arr_id }],
    }
  ));

// -------------------------------------------------------------------------
export const dispatchOrder = async ({
  order_db_id,
}: {
  order_db_id: string;
}) => {
  const session = await getServerSession(authOptions);
  const dispatcher_email = (
    await Account.findById(session?.user.custome_data.db_id as string)
      .select({
        seller_dispatcher: 1,
      })
      .lean()
      .exec()
  ).seller_dispatcher;
  const theDispatcher = await AccountActions.getUserRefAndTypeIdByEmail(
    dispatcher_email
  );
  await Order.findByIdAndUpdate(order_db_id, {
    dispatcher: theDispatcher._id,
    order_status: 'DISPATCHED',
  });
};

// -------------------------------------------------------------------------
export const rejectOrder = async ({
  reason,
  order_db_id,
}: {
  reason: string;
  order_db_id: string;
}) =>
  !!(await Order.findByIdAndUpdate(order_db_id, {
    order_status: 'REJECTED',
    reject_reason: reason,
  }));

// -------------------------------------------------------------------------
export const cancleOrder = async ({
  reason,
  order_db_id,
}: {
  reason: string;
  order_db_id: string;
}) =>
  await Order.findByIdAndUpdate(order_db_id, {
    order_status: 'CANCLED',
    cancel_reason: reason,
  });

// -------------------------------------------------------------------------
export const setOrderDelivered = async ({
  order_db_id,
}: {
  order_db_id: string;
}) =>
  await Order.findByIdAndUpdate(order_db_id, {
    order_status: 'DELIVERED',
  });

export const sendMessage = async ({
  message,
  order_db_id,
}: {
  message: string;
  order_db_id: string;
}) => {
  const session = await getServerSession(authOptions);
  const userType = session?.user.custome_data.user_type;
  await Order.findByIdAndUpdate(order_db_id, {
    $push: {
      messages: { m: message, s: userType, t: Date.now() },
    },
  });
};

export const refreshMessages = async ({
  order_db_id,
}: {
  order_db_id: string;
}) =>
  toJSON(
    (
      await Order.findById(order_db_id)
        .select({
          messages: {
            m: 1,
            s: 1,
            t: 1,
          },
          _id: 0,
        })
        .lean()
        .exec()
    )?.messages || []
  );
