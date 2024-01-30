'use client';
import { getPrescriptionImage } from '@/app/buyer/prescriptions/_functionality';
import { getMedicinesByMe } from '../../catalogue/_functionality/ServerActions';
import { useEffect, useState } from 'react';
import { setOrderItems } from '../_functionality/ServerActions';

const CartItem = ({
  item,
  bg,
  removeItem,
}: {
  item: any;
  bg: string;
  removeItem: any;
}) => (
  <tr style={{ backgroundColor: bg }}>
    <td>{item.title}</td>
    <td>{item.dosage_details}</td>
    <td>&#8377;{item.cost}</td>
    <td>
      <button onClick={() => removeItem(item?.temp_id, item?.is_available)}>
        Remove
      </button>
    </td>
  </tr>
);

export default function AddOrEditItems({
  order_db_id,
  seller_db_id,
  prescription_db_id,
}: {
  order_db_id: string;
  seller_db_id: string;
  prescription_db_id: string;
}) {
  const [imageData, setImageData] = useState<any>('');
  const [nonAvaliableItems, setNonAvailableItems] = useState<Array<any>>([]);
  const [catalogueItems, setCatalogueItems] = useState<Array<any>>([]);
  const [currentItem, setCurrentItem] = useState<any>({ title: '', price: 0 });
  const [avaliableItems, setAvailableItems] = useState<Array<any>>([]);

  const save_changes = async () => {
    await setOrderItems({
      available_items: avaliableItems.map((item: any) => ({
        dosage_details: item.dosage_details,
        title: item.title,
        cost: item.cost,
      })),
      non_available_items: nonAvaliableItems.map((item: any) => ({
        dosage_details: item.dosage_details,
        title: item.title,
        cost: item.cost,
      })),
      order_db_id,
    });
  };

  const removeItem = (temp_id: string, is_available: string) => {
    if (is_available === 'YES') {
      setAvailableItems((prev: Array<any>) =>
        prev.filter((ele) => ele?.temp_id !== temp_id)
      );
    } else {
      setNonAvailableItems((prev: Array<any>) =>
        prev.filter((ele) => ele?.temp_id !== temp_id)
      );
    }
  };
  useEffect(() => {
    (async () => {
      setCatalogueItems(await getMedicinesByMe({ seller_db_id }));
      setImageData(await getPrescriptionImage(prescription_db_id));
      // setNonAvailableItems([]);
      // setAvailableItems([]);
    })();
  }, []);
  return (
    <div style={{ width: '50vw', padding: '20px' }}>
      <img
        src={`data:image/jpeg;base64,${imageData[0]}`}
        alt="Image"
        width={1000}
        height={1000}
      />
      <br />
      <br />
      <h1 style={{ fontSize: '30px' }}>Add or edit items</h1>
      <br />
      <br />
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Dosage details</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {avaliableItems.map((ele) => (
            <CartItem item={ele} bg="lightgreen" removeItem={removeItem} />
          ))}
          {nonAvaliableItems.map((ele) => (
            <CartItem item={ele} bg="#F009" removeItem={removeItem} />
          ))}
        </tbody>
      </table>
      <form
        className="standardForm"
        onReset={() => setCurrentItem({ title: '', price: 0 })}
        onSubmit={(e) => {
          e.preventDefault();
          const { title, price, quantity, dosage_details, is_available } =
            e.target as any;
          if (is_available.value === 'YES') {
            setAvailableItems((prev: any) => [
              ...prev,
              {
                dosage_details: dosage_details.value,
                cost: price.value,
                title: title.value,
                temp_id: Date.now().toString(),
                is_available: is_available.value,
              },
            ]);
          } else {
            setNonAvailableItems((prev: any) => [
              ...prev,
              {
                dosage_details: dosage_details.value,
                cost: price.value,
                title: title.value,
                temp_id: Date.now().toString(),
                is_available: is_available.value,
              },
            ]);
          }
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={currentItem.title}
          onChange={(e) =>
            setCurrentItem((prev: any) => ({ ...prev, title: e.target.value }))
          }
        />
        <input type="number" name="quantity" placeholder="Quantity" step={1} />
        <input
          type="number"
          name="price"
          placeholder="Price (&#8377;)"
          value={currentItem.price}
          onChange={(e) =>
            setCurrentItem((prev: any) => ({ ...prev, price: e.target.value }))
          }
        />
        <input type="text" name="dosage_details" placeholder="Dosage details" />
        <select name="is_available" defaultValue={'YES'}>
          <option value="YES">AVAILABLE</option>
          <option value="NO">NOT AVAILABLE</option>
        </select>
        <div className="resetSubmitDiv">
          <input type="reset" value="Clear" />
          <input type="submit" value="Add medicine" />
        </div>
      </form>
      <table className="catalogueItems" style={{ width: '100%' }}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Quantity Available</td>
          </tr>
        </thead>
        <tbody>
          {catalogueItems.map((item, idx) => (
            <tr
              style={{ backgroundColor: '#FFE2BE', border: '1px solid black' }}
              key={idx}
            >
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>&#8377; {item.price}</td>
              <td>{item.stock_count}</td>
              <td>
                <button onClick={() => setCurrentItem(item)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex p-2 gap-4 mt-12">
        <button className="bg-orange-500 p-2 flex-1">
          Request confirmation
        </button>
        <button className="bg-green-300 p-2 flex-1">Save</button>
      </div>
    </div>
  );
}
