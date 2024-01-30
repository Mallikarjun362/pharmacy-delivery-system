'use client';
import { useGlobalContext } from '@/app/_context/store';
import {
  getPrescriptionImage,
  getSellerOptions,
  placeOrderFromPrescription,
} from '../_functionality';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export const ViewPrescriptionImageButton = ({ _id }: { _id: string }) => {
  const { setHoverContent } = useGlobalContext();
  return (
    <button
      onClick={async () => {
        const val = await getPrescriptionImage(_id);
        setHoverContent(
          <img
            src={`data:image/jpeg;base64,${val[0]}`}
            alt="Image"
            width={1000}
            height={1000}
          />
        );
      }}
      style={{
        backgroundColor: 'cyan',
        borderRadius: '10px',
        padding: '5px 10px',
      }}
    >
      View image
    </button>
  );
};

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
        {sellerOptions.map((ele: any) => (
          <button onClick={() => setSelectedOption(ele)}>
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
