'use client';
import { useGlobalContext } from '@/app/_context/store';
import med from '@/../../public/images/pills.png';
import styles from '../styles.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function BrowseItemCard({
  item_details,
}: {
  item_details: any;
}) {
  const { cart, setCart } = useGlobalContext();
  const initial_quantity: number =
    item_details._id in cart ? cart[item_details._id].quantity : 0;
  const [quantity, setQuantity] = useState(initial_quantity);
  const add_item = (item: any) => {
    setQuantity((prev) => prev + 1);
    if (item._id in cart) {
      setCart((prev: any) => {
        prev[item._id].quantity = prev[item._id].quantity + 1;
        return prev;
      });
    } else {
      setCart((prev: any) => {
        prev[item._id] = {
          quantity: 1,
          title: item_details.title,
          item_db_id: item_details._id,
          seller_db_id: item_details.seller,
          unit_price: item_details.unit_price,
          is_prescription_required: item_details.is_prescription_required,
        };
        return prev;
      });
    }
  };
  const reduce_item = (item: any) => {
    setQuantity((prev) => Math.max(0, prev - 1));
    if (item._id in cart) {
      setCart((prev: any) => {
        if (prev[item._id].quantity <= 1) {
          delete prev[item._id];
        } else {
          prev[item._id].quantity = prev[item._id].quantity - 1;
        }
        return prev;
      });
    }
  };

  return (
    <div className={`${styles.card}`}>
      <div
        style={{
          borderBottom: '2px solid #D9DDE3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={med}
          alt="medicine"
          style={{
            height: '5vw',
            width: '5vw',
          }}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{item_details?.title}</td>
          </tr>
          <tr>
            <td>Unit price</td>
            <td>{item_details?.unit_price}</td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td>{quantity}</td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          width: '300px',
          gap: '20px',
        }}
      >
        <button
          className=""
          onClick={() => add_item(item_details)}
        >
          ADD
        </button>
        <button onClick={() => reduce_item(item_details)}>REDUCE</button>
      </div>
    </div>
  );
}
