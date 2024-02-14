import {
  IAccountDetails,
  getAccountDetailsById,
  getAccountDetailsByEmail,
} from './_functionality/ServerActions';
import ProofDocumentSection from './_sections/ProofDocumentSection';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
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
  const isAdminView = userEmail && userSessionData.user_type === 'ADMIN';

  return (
    <main className={`mainPage`}>
      {isAdminView ? (
        <h1 style={{ fontSize: '30px', color: 'red' }}>Admin view</h1>
      ) : null}
      {!isAdminView && userSessionData.user_type !== userDetails.user_type ? (
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
      {userDetails ? (
        <>
          <ProfileInfoSection userDetails={userDetails} />
          <ProofDocumentSection userDetails={userDetails} />
        </>
      ) : (
        <>
          No user found with email <b>{userEmail}</b>
        </>
      )}
    </main>
  );
}
