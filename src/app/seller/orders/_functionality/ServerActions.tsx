'use server';
import Order, { IOrderItem, OrderActions } from '@/models/Order';
import { toJSON } from '@/utils';
import { revalidatePath } from 'next/cache';

export const getOrdersReceived = async ({
  seller_db_id,
}: {
  seller_db_id: string;
}): Promise<Array<any>> => {
  return JSON.parse(
    JSON.stringify(
      await Order.find({ seller: seller_db_id })
        .select({ _id: 1, prescription: 1, buyer: 1 })
        .populate({
          path: 'prescription',
          select: {
            timestamp: 1,
            title: 1,
            _id: 1,
          },
        })
        .populate({
          path: 'buyer',
          select: {
            primary_email: 1,
            _id: 1,
          },
        })
        .lean()
        .exec()
    )
  );
};

export const getOrderDetails = async (order_db_id: string) =>
  toJSON(await Order.findById(order_db_id).select({ available_items: 1 }).lean().exec());

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
