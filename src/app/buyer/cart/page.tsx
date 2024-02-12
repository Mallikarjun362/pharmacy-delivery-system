'use client';
import { SellerCart } from './_components/ClientComponents';
import { useGlobalContext } from '@/app/_context/store';
import { useEffect, useState } from 'react';

function generateRandomString() {
  const alphanumericChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    result += alphanumericChars.charAt(randomIndex);
  }
  return result;
}

export default function CartPage() {
  const { cart } = useGlobalContext();
  const [sellers, setSellers] = useState<Array<any>>([]);

  useEffect(() => {
    let _sellers: Array<any> = [];
    for (let val of Object.values(cart)) {
      if (!_sellers.includes((val as any)?.seller_db_id)) {
        _sellers.push((val as any)?.seller_db_id);
      }
    }
    setSellers(_sellers);
  }, []);

  return (
    <main className="mainPage">
      {sellers.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: '100px',
            fontSize: '20px',
            color: 'gray',
          }}
        >
          Cart is empty
        </div>
      ) : (
        sellers.map((val, idx) => <SellerCart seller_db_id={val} key={idx} />)
      )}
    </main>
  );
}
