'use client';
import { getUserFile } from '../account/_functionality/ServerActions';
import { useEffect, useState } from 'react';
import TheLoader from 'react-spinners/BarLoader';

export default function DisplayFile({ file_db_id }: { file_db_id: string }) {
  const [theFile, setTheFile] = useState<any>({});
  useEffect(() => {
    (async () => {
      setTheFile(await getUserFile(file_db_id));
    })();
  }, []);
  console.log('HELLO');
  return (
    <div
      style={{
        width: '900px',
        maxWidth: '80vw',
        display: 'flex',
        minHeight: '250px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {theFile.file ? (
        <img
          src={`data:image/jpeg;base64,${theFile?.file}`}
          alt="Image"
          width={1000}
          height={1000}
        />
      ) : (
        <TheLoader width={200}/>
      )}
    </div>
  );
}
