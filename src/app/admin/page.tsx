import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/api/auth/signin?callbackUrl=/admin")
  }
  return <main>AdminPage</main>;
}
