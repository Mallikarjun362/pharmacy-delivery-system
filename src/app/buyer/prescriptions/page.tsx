import PrescriptionCreationForm from './_components/PrescriptionCreationForm';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import PrescriptionCard from './_components/PrescriptionCard';
import { PrescriptionActions } from '@/models/Prescription';
import { getServerSession } from 'next-auth';

export default async function PrescriptionPage() {
  const session = await getServerSession(authOptions);
  const my_prescriptions: Array<any> = session?.user?.custome_data?.db_id
    ? await PrescriptionActions.getMyPrescriptions(
        session?.user?.custome_data?.db_id
      )
    : [];
  return (
    <main className="mainPage">
      <PrescriptionCreationForm />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        {my_prescriptions.reverse().map((val, idx) => (
          <PrescriptionCard details={val} key={idx} />
        ))}
      </div>
    </main>
  );
}
