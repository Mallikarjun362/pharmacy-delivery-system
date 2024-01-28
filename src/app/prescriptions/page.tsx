import { getServerSession } from 'next-auth';
import PrescriptionCard from './_components/PrescriptionCard';
import PrescriptionCreationForm from './_components/PrescriptionCreationForm';
import { PrescriptionActions } from '@/models/Prescription';

export default async function PrescriptionPage() {
  const session = await getServerSession();
  const my_prescriptions: Array<any> =
    await PrescriptionActions.getMyPrescriptions({
      primary_email: session?.user?.email!,
    });
  return (
    <main className="mainPage">
      <PrescriptionCreationForm />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        {my_prescriptions.map((val, idx) => (
          <PrescriptionCard details={val} key={idx} />
        ))}
      </div>
    </main>
  );
}
