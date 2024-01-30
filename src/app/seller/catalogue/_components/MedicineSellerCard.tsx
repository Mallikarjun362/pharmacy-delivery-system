'use client';
import { deleteMedicine } from '../_functionality/ServerActions';

const ActionButton = ({
  cb,
  bg,
  txt,
}: {
  cb: any;
  bg: string;
  txt: string;
}) => (
  <button
    style={{ backgroundColor: bg, padding: '3px 15px', borderRadius: '100px' }}
    onClick={cb}
  >
    {txt}
  </button>
);

export default function MedicineSellerCard({
  medicine_details,
}: {
  medicine_details: any;
}) {
  return (
    <div
      style={{
        backgroundColor: '#0001',
        borderRadius: '10px',
        padding: '15px',
      }}
    >
      <div>
        <h2 style={{ fontSize: '30px' }}>{medicine_details?.title}</h2>
        <div>Price: {medicine_details?.price}</div>
        <div>Count: {medicine_details?.stock_count}</div>
      </div>
      <br />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        <ActionButton cb={() => null} bg="orange" txt="Edit item" />
        <ActionButton
          cb={() => deleteMedicine({ item_db_id: medicine_details._id || '' })}
          bg="red"
          txt="Delete"
        />
      </div>
    </div>
  );
}
