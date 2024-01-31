'use client';
import { authOptions } from '../api/auth/[...nextauth]/route';
import search from '@/../../public/search.svg';
import { getServerSession } from 'next-auth';
import { debugLog } from '@/utils';
import Image from 'next/image';
import './components.css';

export default async function BrowserSearch() {
  const session = await getServerSession(authOptions);
  
  debugLog('Browser', session);
  return (
    <div className="search_container">
      <input
        placeholder="Search products..."
        title="Search bar"
        className="search_input"
      />
      <button type="submit">
        <Image
          src={search}
          alt="accnt"
          style={{
            right: '0px',
            height: '30px',
            width: '30px',
            zIndex: '2',
          }}
        />
      </button>
    </div>
  );
}
