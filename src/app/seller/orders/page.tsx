import { ViewPrescriptionImageButton } from '@/app/buyer/prescriptions/_components/ClientComponents';
import HoverTriggerButton from '@/app/_components/HoverTriggerButton';
import { getOrdersReceived } from './_functionality/ServerActions';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EntityComponent from '@/app/_components/EntityComponent';
import { btn_reject } from './_components/ClientComponents';
import { getServerSession } from 'next-auth';
import { CSSProperties } from 'react';
import AddOrEditItems from './_components/AddOrEditItems';

export default async function SellerOrdersPage() {
  const session = await getServerSession(authOptions);
  const orders_received = await getOrdersReceived({
    seller_db_id: session?.user.custome_data.db_id!,
  });
  const btn_style: CSSProperties = {
    backgroundColor: 'pink',
    borderRadius: '100px',
    padding: '4px 15px',
  };
  return (
    <main className="mainPage">
      {orders_received.map((ele, idx) => (
        <EntityComponent
          entity_details={ele}
          key={idx}
          action_buttons={[
            <HoverTriggerButton
              button_style={btn_style}
              txt="Add or edit items"
              key={'add-items'}
              the_component={
                <AddOrEditItems
                  order_db_id={ele?._id}
                  seller_db_id={session?.user.custome_data.db_id!}
                  prescription_db_id={ele?.prescription?._id}
                />
              }
            />,
            btn_reject,
          ]}
        />
      ))}
      {/* <AddOrEditItems
        order_db_id={orders_received[0]?._id}
        seller_db_id={session?.user.custome_data.db_id!}
      /> */}
    </main>
  );
}
