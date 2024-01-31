import BrowseItemCard from './_components/BrowseItemCard';
import { getAllMedicines } from './_functionality/ServerActions';

export default async function BrowsePage() {
  const catalogue_items = await getAllMedicines();
  return (
    <main className="mainPage">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {catalogue_items.map((item: any, idx: number) => (
          <BrowseItemCard item_details={item} key={idx} />
        ))}
      </div>
    </main>
  );
}
