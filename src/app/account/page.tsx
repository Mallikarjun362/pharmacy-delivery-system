import {
  IAccountDetails,
  getAccountDetailsByEmail,
  getAccountDetailsById,
} from './_functionality/ServerActions';
import ProofDocumentSection from './_sections/ProofDocumentSection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProfileInfoSection from './_sections/ProfileInfoSection';
import { ImNotification } from 'react-icons/im';
import { getServerSession } from 'next-auth';
import styles from './styles.module.css';

export default async function AccountPage({
  userEmail = '',
}: {
  userEmail?: string;
}) {
  const userSessionData = (await getServerSession(authOptions))?.user
    ?.custome_data;
  if (!userSessionData?.db_id) return null;
  const userDetails: IAccountDetails = userEmail
    ? await getAccountDetailsByEmail(userEmail)
    : await getAccountDetailsById(userSessionData?.db_id);
  if (!userDetails)
    return (
      <div>
        <h1>Admin view</h1>
        No user found with email <b>{userEmail}</b>
      </div>
    );
  return (
    <main className="mainPage">
      {userEmail ? (
        <h1 style={{ fontSize: '30px', color: 'red' }}>Admin view</h1>
      ) : null}
      {!userEmail && userSessionData.user_type !== userDetails.user_type  ? (
        <div className={styles.notification}>
          <ImNotification
            style={{ fontSize: '60px', padding: '7px', color: '#F0872A' }}
          />
          <div>
            Sign in and Sign out to reflect changes. <br />
            User type changed from <b>{userSessionData.user_type}</b> to{' '}
            <b>{userDetails.user_type}</b>
          </div>
        </div>
      ) : null}
      <ProfileInfoSection userDetails={userDetails} />
      <ProofDocumentSection userDetails={userDetails} />
    </main>
  );
}
