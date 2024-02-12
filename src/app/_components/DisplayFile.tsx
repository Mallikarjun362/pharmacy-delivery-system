'use client';
import { getUserFile } from '../account/_functionality/ServerActions';
import TheLoader from 'react-spinners/BarLoader';
import { useEffect, useState } from 'react';

export default function DisplayFile({ file_db_id }: { file_db_id: string }) {
  const [theFile, setTheFile] = useState<any>({});
  useEffect(() => {
    (async () => setTheFile(await getUserFile(file_db_id)))();
  }, []);
  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '250px',
        maxWidth: '80vw',
        display: 'flex',
        width: '900px',
      }}
    >
      {theFile?.file ? (
        <img
          src={`data:image/jpeg;base64,${theFile?.file}`}
          height={1000}
          width={1000}
          alt="Image"
        />
      ) : (
        <TheLoader width={200} />
      )}
    </div>
  );
}
