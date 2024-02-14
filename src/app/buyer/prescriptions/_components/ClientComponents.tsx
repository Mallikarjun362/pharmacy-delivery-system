'use client';
import { useGlobalContext } from '@/app/_context/store';
import {
  getPrescriptionImage,
  getSellerOptions,
  placeOrderFromPrescription,
} from '../_functionality/ServerActions';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function PlaceOrder({
  prescription_db_id,
}: {
  prescription_db_id: string;
}) {
  const session = useSession();
  const { setHoverContent } = useGlobalContext();
  const [sellerOptions, setSellerOptions] = useState<Array<any>>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  useEffect(() => {
    (async () => {
      setSellerOptions(await getSellerOptions());
    })();
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ color: 'red' }}>
        Selected Seller: {selectedOption?.primary_email}
      </div>
      <div>
        {sellerOptions.map((ele: any, idx) => (
          <button onClick={() => setSelectedOption(ele)} key={idx}>
            Seller: {ele.primary_email}
          </button>
        ))}
      </div>
      <button
        style={{ backgroundColor: '#0F08' }}
        onClick={async () => {
          if (!selectedOption) return alert('Select a seller');
          await placeOrderFromPrescription({
            buyer_db_id: session.data?.user.custome_data.db_id || '',
            seller_db_id: selectedOption?._id,
            prescription_db_id,
          });
          setHoverContent(null);
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export const PlaceOrderButton = ({ db_id }: { db_id: string }) => {
  const { setHoverContent } = useGlobalContext();
  return (
    <button
      onClick={async () => {
        setHoverContent(<PlaceOrder prescription_db_id={db_id} />);
      }}
      style={{
        backgroundColor: 'orange',
        borderRadius: '10px',
        padding: '5px 10px',
      }}
    >
      Place order
    </button>
  );
};
