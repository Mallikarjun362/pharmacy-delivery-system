import Order from '@/models/Order';

export const getOrdersReceived = async ({
  seller_db_id,
}: {
  seller_db_id: string;
}) => {
  const result = (
    await Order.find({ seller: seller_db_id }).select({ _id: 1 })
  ).toJSON();
  return result;
};
