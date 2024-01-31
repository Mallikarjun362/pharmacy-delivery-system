'use client';
import { useGlobalContext } from '@/app/_context/store';
import { useState } from 'react';

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
    <div>
      <div>{JSON.stringify(item_details)}</div>
      <div>{quantity}</div>
      <div className="flex gap-5">
        <button onClick={() => add_item(item_details)}>ADD</button>
        <button onClick={() => reduce_item(item_details)}>REDUCE</button>
      </div>
    </div>
  );
}
