import BrowseItemCard from './_components/BrowseItemCard';
import { getAllMedicines } from './_functionality/ServerActions';
import SearchBar from "@/app/_components/BrowserSearchBar";
import Card from "@/app/_components/ProductCard";
import "@/app/globals.css";
        
export default async function BrowsePage() {
  const catalogue_items = await getAllMedicines();
  return (
    <main className="mainPage">
      <div className="search">
            <SearchBar />
        </div>
        <div className="card_display">
            <Card />
        </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {catalogue_items.map((item: any, idx: number) => (
          <BrowseItemCard item_details={item} key={idx} />
        ))}
      </div>
    </main>
  );
}