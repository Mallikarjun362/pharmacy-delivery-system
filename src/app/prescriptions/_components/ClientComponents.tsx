'use client';

import { useGlobalContext } from '@/app/_context/store';
import { getPrescriptionImage } from '../_functionality';

export const ViewPrescriptionImageButton = ({ _id }: { _id: string }) => {
  const { setHoverContent } = useGlobalContext();
  return (
    <button
      onClick={async () => {
        const val = await getPrescriptionImage(_id);
        setHoverContent(
          <img src={`data:image/jpeg;base64,${val[0]}`} alt="Image" />
        );
      }}
      style={{
        backgroundColor: 'cyan',
        borderRadius: '10px',
        padding: '5px 10px',
      }}
    >
      View image
    </button>
  );
};
