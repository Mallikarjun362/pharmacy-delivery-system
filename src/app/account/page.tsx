import ProofDocumentSection from './_sections/ProofDocumentSection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProfileInfoSection from './_sections/ProfileInfoSection';
import { AccountActions, IAccount } from '@/models/Account';
import { getServerSession } from 'next-auth';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const user_details: IAccount = session?.user?.custome_data?.db_id
    ? await AccountActions.getUserDetailsFull(
        session?.user?.custome_data?.db_id
      ).then((data) => ({ ...data, _id: data._id.toString() }))
    : {};
  return (
    <main className="mainPage">
      <ProfileInfoSection user_details={user_details}/>
      <ProofDocumentSection />
    </main>
  );
}
