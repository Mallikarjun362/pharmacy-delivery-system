'use client';
import { IoIosRemoveCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import medicineImage from '@/../../public/images/pills.png';
import { useGlobalContext } from '@/app/_context/store';
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
          is_prescription_required: item_details.is_prescription_required,
          unit_price: item_details.unit_price,
          seller_db_id: item_details.seller,
          item_db_id: item_details._id,
          title: item_details.title,
          quantity: 1,
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
    <div className={`${styles.itemCard}`}>
      <Image
        alt="Medicine"
        src={medicineImage}
        style={{ width: '30%', objectFit: 'contain', margin: '15px' }}
      />
      <hr style={{ border: '0.5px solid #0002', width: '100%' }} />
      <div
        style={{
          justifyContent: 'space-between',
          backgroundColor: '#00000009',
          flexDirection: 'column',
          padding: '10px',
          display: 'flex',
          width: '100%',
          flex: 1,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '30px' }}>{item_details.title}</span>
          <span
            style={{
              border: '1px solid gray',
              whiteSpace: 'nowrap',
              borderRadius: '10px',
              fontSize: '25px',
              padding: '10px',
            }}
          >
            &#8377; {item_details.unit_price}
          </span>
        </div>
        <p style={{ color: 'gray' }}>
          {item_details.is_prescription_required
            ? 'Prescription required'
            : 'Prescription not required'}
        </p>
        <p
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxHeight: '50px',
            margin: '5px',
          }}
        >
          {item_details.description}
        </p>
        {item_details.stock_count > 0 ? (
          <p style={{ color: 'green' }}>
            Stock count: {item_details.stock_count}
          </p>
        ) : null}
        <div
          style={{
            justifyContent: 'center',
            fontSize: '30px',
            display: 'flex',
            color: 'gray',
            width: '100%',
            gap: '20px',
          }}
        >
          {item_details.stock_count > 0 ? (
            <>
              <button onClick={() => add_item(item_details)}>
                <IoMdAddCircleOutline />
              </button>
              <span>{quantity}</span>
              <button onClick={() => reduce_item(item_details)}>
                <IoIosRemoveCircleOutline />
              </button>
            </>
          ) : (
            <p style={{ color: 'red' }}>Out of stock</p>
          )}
        </div>
      </div>
    </div>
  );
}
