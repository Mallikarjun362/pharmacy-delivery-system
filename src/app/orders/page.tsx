import HoverTriggerButton from '@/app/_components/HoverTriggerButton';
import SellerOrderOverview from './_components/SellerOrderOverview';
import EntityComponent from '@/app/_components/EntityComponent';
import { getOrders } from './_functionality/ServerActions';
import { InfoBlock } from '@/app/_components/Components';
import { getTimeDiffFromNow } from '@/utils';

export default async function SellerOrdersPage() {
  const orders_received = await getOrders();
  const status_colors: any = { REJECTED: '#EFA4A6', DISPATCHED: '#F4A841AA' };
  return (
    <main className="mainPage">
      {orders_received.reverse().map((ele, idx) => (
        <EntityComponent
          style={{
            backgroundColor: status_colors[ele.order_status],
          }}
          details={
            <InfoBlock
              obj={{
                'Order ID': ele._id?.toString(),
                'Ordered at': getTimeDiffFromNow(ele.timeline[0].t),
                Status: ele.order_status,
              }}
            />
          }
          key={idx}
          buttons={
            <HoverTriggerButton
              buttonStyle={{
                backgroundColor: 'pink',
                borderRadius: '100px',
                padding: '4px 15px',
              }}
              title="Order overview"
              key={'add-items'}
              hoverContent={<SellerOrderOverview order_db_id={ele._id} />}
            />
          }
        />
      ))}
    </main>
  );
}
