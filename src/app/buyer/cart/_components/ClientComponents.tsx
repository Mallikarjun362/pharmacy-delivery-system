'use client';
import { IoIosRemoveCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import medicineImage from '@/../../public/images/pills.png';
import { useGlobalContext } from '@/app/_context/store';
import { useEffect, useState } from 'react';
import styles from '../styles.module.css';
import Image from 'next/image';
import { placeOrderManual } from '../_functionality/ServerComponents';

export const CartItemCard = ({ item, update }: { item: any; update: any }) => {
  const { cart, setCart } = useGlobalContext();
  const [quantity, setQuantity] = useState(item.quantity);

  const add_item = () => {
    setQuantity((prev: any) => prev + 1);
    setCart((prev: any) => {
      prev[item.item_db_id].quantity += 1;
      return prev;
    });
    update((prev: boolean) => !prev);
  };

  const reduce_item = () => {
    const val = Math.max(0, quantity - 1);
    setQuantity(val);
    setCart((prev: any) => {
      prev[item.item_db_id].quantity = val;
      return prev;
    });
    update((prev: boolean) => !prev);
  };

  return (
    <div
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#D8E0EA',
        height: 'fit-content',
        borderRadius: '10px',
        padding: '10px 30px',
        overflow: 'hidden',
        display: 'flex',
        width: '100%',
        gap: '50px',
      }}
    >
      <Image
        src={medicineImage}
        alt="Medicine image"
        style={{
          objectFit: 'contain',
          minWidth: '70px',
          width: '7%',
        }}
      />
      <div style={{ flex: 1, fontSize: '22px' }}>
        <p style={{ marginBottom: '10px' }}>
          Name: <b>&quot;{item.title}&quot;</b>
        </p>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: '20px',
          }}
        >
          <button onClick={() => add_item()}>
            <IoMdAddCircleOutline />
          </button>
          <span>
            <div style={{ whiteSpace: 'nowrap' }}>
              {quantity} x
              <span
                style={{
                  border: '1px solid black',
                  borderRadius: '10px',
                  marginLeft: '10px',
                  padding: '7px',
                  background: '#0001',
                }}
              >
                &#8377; {item.unit_price}
              </span>
            </div>
          </span>
          <button onClick={() => reduce_item()}>
            <IoIosRemoveCircleOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export const SellerCart = ({ seller_db_id }: { seller_db_id: string }) => {
  const { cart, setCart } = useGlobalContext();
  const [sellerCart, setSellerCart] = useState<Array<any>>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [update, setUpdate] = useState<boolean>(false);
  const [isPrescriptionRequired, setIsPrescriptionRequired] =
    useState<boolean>(false);

  useEffect(() => {
    let _totalCost = 0;
    let _isPrescriptionRequired = false;
    for (let val of Object.values(cart)) {
      if (
        (val as any).is_prescription_required &&
        (val as any).quantity !== 0
      ) {
        _isPrescriptionRequired = true;
      }
      _totalCost += (val as any).unit_price * (val as any).quantity;
    }
    setIsPrescriptionRequired(_isPrescriptionRequired);
    setTotalCost(_totalCost);
    setSellerCart(
      Object.values(cart).filter(
        (val: any) => val.seller_db_id === seller_db_id
      )
    );
  }, [update]);
  if (totalCost === 0) return null;
  return (
    <div className={`${styles.sellerCart}`}>
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          gap: '20px',
          flex: 4,
        }}
      >
        {Object.values(sellerCart).map((item, idx) => (
          <CartItemCard item={item} key={idx} update={setUpdate} />
        ))}
      </div>
      <div style={{ border: '1px solid grey' }} />
      <form
        className="standardForm"
        onSubmit={async (e: any) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const finalCart: { [k: string]: number } = {};
          for (let ele of sellerCart) {
            if (ele.quantity !== 0) {
              finalCart[ele.item_db_id as string] = ele.quantity;
            }
          }
          placeOrderManual({ cart: finalCart, formData }).then(() => {
            setCart((prev: any) => {
              const newCart: { [k: string]: any } = {};
              for (let k of Object.keys(prev)) {
                if (prev[k].seller_db_id !== seller_db_id) {
                  newCart[k] = prev[k];
                }
              }
              return newCart;
            });
            setUpdate((prev) => !prev);
          });
        }}
        style={{
          flexDirection: 'column',
          padding: '10px',
          flex: 3,
        }}
      >
        <p style={{ whiteSpace: 'nowrap', fontSize: '25px' }}>
          Total: <b>&#8377; {totalCost}</b>
        </p>
        {isPrescriptionRequired ? (
          <input
            placeholder="Prescription Required"
            name="prescription_file"
            type="file"
            required
          />
        ) : (
          <div>Prescription not required</div>
        )}
        <select
          style={{ padding: '15px' }}
          name="payment_mode"
          defaultValue={''}
          required
        >
          <option value="" disabled>
            -- Select payment mode --
          </option>
          <option value="COD">Cash on delivery</option>
          <option value="UPI">UPI</option>
        </select>
        <input type="submit" value={'Place order'} />
      </form>
    </div>
  );
};
