'use client';
import PlaceOrder, {
  PlaceOrderButton,
  ViewPrescriptionImageButton,
} from './ClientComponents';
import { deletePrescription, placeOrder } from '../_functionality';
import { format } from 'date-fns';

export default function PrescriptionCard({
  details,
}: {
  details: { title?: string; timestamp?: string; _id?: string };
}) {
  return (
    <div
      style={{
        border: '2px solid gray',
        position: 'relative',
        borderRadius: '5px',
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      <p style={{ fontSize: '30px' }}>{details.title}</p>
      <p
        style={{
          position: 'absolute',
          fontSize: '22px',
          padding: '10px',
          color: 'gray',
          right: 0,
          top: 0,
        }}
      >
        {format(new Date(details.timestamp || Date.now()), 'dd/MM/yyyy')}
      </p>
      <br />
      <div style={{ display: 'flex', gap: '10px' }}>
        <PlaceOrderButton db_id={details?._id || ''} />
        <ViewPrescriptionImageButton _id={details?._id || ''} />
        <button
          onClick={() => deletePrescription(details?._id || '')}
          style={{
            backgroundColor: 'red',
            borderRadius: '10px',
            padding: '5px 10px',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
