'use client';
import { getAllMedicines } from './_functionality/ServerActions';
import BrowseItemCard from './_components/BrowseItemCard';
import search from '@/../../public/search.svg';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import '@/app/globals.css';

export default function BrowsePage() {
  const [catalogueItems, setCatalogueItems] = useState<Array<any>>([]);
  const [displayItems, setDisplayItems] = useState<Array<any>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const session = getSession();
  useEffect(() => {
    (async () => {
      const vals = await getAllMedicines();
      setCatalogueItems(vals);
      setDisplayItems(vals);
    })();
  }, []);
  const searchItems = (term?: string) => {
    if (!term) {
      setDisplayItems(catalogueItems);
      return;
    }
    setDisplayItems(
      catalogueItems.filter(
        (ele) => ele.title.includes(term) || term.includes(ele.title)
      )
    );
  };
  return (
    <main className="mainPage" style={{ padding: '100px 10%' }}>
      <div className="search">
        <div className={`${styles.search_container}`}>
          <input
            placeholder="Search products..."
            title="Search bar"
            className={`${styles.search_input}`}
            onChange={(e) => {
              searchItems(e.target.value);
              // setSearchTerm(e.target.value)
            }}
          />
          <button
            type="submit"
            // onClick={() => searchItems(searchTerm)}
          >
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
      </div>
      <div
        className={`${styles.card_display}`}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          padding: '30px',
        }}
      >
        {displayItems.map((item: any, idx: number) => (
          <BrowseItemCard item_details={item} key={idx} />
        ))}
      </div>
    </main>
  );
}
