import { getOrdersMade } from './_functionality/ServerActions';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import BuyerOrderCard from './_components/BuyerOrderCard';
import CartCard from '@/app/_components/CartCard';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const orders_made: Array<any> = session?.user.custome_data.db_id
    ? await getOrdersMade({
        my_db_id: session?.user.custome_data.db_id,
      })
    : [];
  return (
    <main className="mainPage">
      {orders_made.map((ele: any, idx) => (
        <BuyerOrderCard order_details={ele} key={idx} />
      ))}
      <CartCard />
    </main>
  );
}
