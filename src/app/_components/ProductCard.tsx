import './components.css'
import Image from 'next/image';
import med from "@/../../public/images/pills.png";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { debugLog } from '@/utils';

export default async function Card() {
  const session = await getServerSession(authOptions);
  debugLog('Browser', session);
  return (
    <div className='card'>
        <div style={{
            borderBottom: '2px solid #0e308fe8',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            }}>
            <Image src={med} alt='medicine' style={{
                height: '5vw',
                width: '5vw'
            }} />
        </div>
        <div style={{
            display: 'flex'
        }}>
            <div><h1>Name: Vicks</h1><h1>Price: Rs. 15</h1></div>
        </div>
    </div>
  );
}
