'use client';
import { placeOrderManual } from './_functionality/ServerComponents';
import { useGlobalContext } from '@/app/_context/store';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const session = useSession();
  const { cart } = useGlobalContext();
  const [is_prescription_required, setIsPrescriptionRequired] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<number>(10);
  useEffect(() => {
    let s = 0;
    for (let val of Object.values(cart)) {
      if ((val as any).is_prescription_required) {
        setIsPrescriptionRequired(true);
      }
      s += (val as any).unit_price * (val as any).quantity;
    }
    setTotalPrice(s);
  }, []);
  return (
    <main className="mainPage">
      <div>
        <h2>Items :</h2>
        {Object.keys(cart).map((k, idx) => (
          <div key={idx}>{JSON.stringify(cart[k])}</div>
        ))}
      </div>
      {is_prescription_required ? (
        <input
          type="file"
          name="prescription"
          placeholder="Prescription Required"
          onChange={(e) => {
            console.log((e.target as any).files[0]);
            setFile((e.target as any).files[0]);
          }}
          required
        />
      ) : (
        <div>Prescription not required</div>
      )}
      <div>Total price : &#8377; {totalPrice}</div>
      <button
        onClick={async () => {
          window.location.replace(`upi://pay?pa=9494248739@paytm&amp;pn=Mr Gaddey Hemanth Chowdary&amp;am=10&amp;mc=bdOMam96965720364044&amp;cu=INR;tr=20sssj9j3s8j38;tn=business_related_stuff`);

          // if (is_prescription_required && !file)
          //   return alert('Prescription required');
          // if (Object.keys(cart)?.length === 0) {
          //   return alert('Cart is empty');
          // }
          // const formData = new FormData();
          // formData.append('file', file);
          // await placeOrderManual({
          //   cart,
          //   buyer_db_id: session?.data?.user?.custome_data.db_id,
          //   seller_db_id: (Object.values(cart)[0] as any).seller_db_id,
          //   prescription_file: file ? formData : null,
          // });
          // alert('Order confirmed successfully');

        }}
      >
        Pay Rs. {totalPrice}
      </button>
    </main>
  );
}
