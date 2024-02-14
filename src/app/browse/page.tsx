'use client';
import { getAllMedicines } from './_functionality/ServerActions';
import BrowseItemCard from './_components/BrowseItemCard';
import { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import styles from './styles.module.css';
import '@/app/globals.css';

export default function BrowsePage() {
  const [catalogItems, setCatalogItems] = useState<Array<any>>([]);
  const [displayItems, setDisplayItems] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const vals = (await getAllMedicines()).reverse();
      setCatalogItems(vals);
      setDisplayItems(vals);
    })();
  }, []);
  const searchItems = (term?: string) => {
    if (!term) {
      setDisplayItems(catalogItems);
      return;
    }
    setDisplayItems(
      catalogItems.filter(
        (ele) => ele.title.includes(term) || term.includes(ele.title)
      )
    );
  };
  return (
    <main className="mainPage" style={{ padding: '70px 10%' }}>
      <div
        style={{
          border: '2px solid #0e308fe8',
          backgroundColor: 'white',
          borderRadius: '100px',
          padding: '10px 20px',
          alignItems: 'center',
          alignSelf: 'center',
          overflow: 'hidden',
          minHeight: '50px',
          maxWidth: '80vw',
          display: 'flex',
        }}
      >
        <input
          style={{ outline: 'none', fontSize: '21px', width: '90%' }}
          onChange={(e) => searchItems(e.target.value)}
          placeholder="Search products..."
          title="Search bar"
        />
        <button type="submit">
          <GoSearch fontSize={30} />
        </button>
      </div>
      {/* ITEMS */}
      <div className={`${styles.gridContainer}`}>
        {displayItems.map((item: any, idx: number) => (
          <BrowseItemCard item_details={item} key={idx} />
        ))}
      </div>
    </main>
  );
}
