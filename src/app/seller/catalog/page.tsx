import MedicineCreationForm from './_components/MedicineCreationForm';
import { getMedicinesByMe } from './_functionality/ServerActions';
import MedicineSellerCard from './_components/MedicineSellerCard';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function SellerCateloguePage() {
  const session = await getServerSession(authOptions);
  const medicines_by_me = session?.user.custome_data.db_id
    ? await getMedicinesByMe({ seller_db_id: session?.user.custome_data.db_id })
    : [];
  return (
    <main className="mainPage">
      <MedicineCreationForm />
      <div
        style={{
          flexDirection: 'column-reverse',
          padding: '50px 0px',
          display: 'flex',
          gap: '20px',
        }}
      >
        {medicines_by_me.map((ele, idx) => (
          <MedicineSellerCard medicine_details={ele} key={idx} />
        ))}
      </div>
    </main>
  );
}
