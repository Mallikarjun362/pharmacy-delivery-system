'use client';
import { deleteMedicine } from '../_functionality/ServerActions';

const InfoTile = ({ k, v }: { k: string; v: any }) => (
  <div
    style={{
      backgroundColor: '#FFF9',
      border: '2px solid gray',
      borderRadius: '7px',
      padding: '2px 10px',
      fontSize: '16px',
    }}
  >
    <b>{k} :</b>
    <p style={{ fontSize: '22px' }}>{v}</p>
  </div>
);

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
      <h1 style={{ fontSize: '30px' }}>{medicine_details?.title}</h1>
      <p>{medicine_details?.description}</p>
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          padding: '10px',
          gap: '15px',
        }}
      >
        <InfoTile k="Price" v={<>&#8377; {medicine_details?.unit_price}</>} />
        <InfoTile k="Stock count" v={medicine_details?.stock_count} />
        <InfoTile
          k="Prescription"
          v={
            medicine_details?.is_prescription_required
              ? 'Required'
              : 'Not required'
          }
        />
      </div>
      <br />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {/* <ActionButton cb={() => null} bg="orange" txt="Edit item" /> */}
        <ActionButton
          cb={() => deleteMedicine({ item_db_id: medicine_details._id || '' })}
          bg="red"
          txt="Delete"
        />
      </div>
    </div>
  );
}
