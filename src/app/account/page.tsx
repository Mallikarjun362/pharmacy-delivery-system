import ProofDocumentSection from './_sections/ProofDocumentSection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProfileInfoSection from './_sections/ProfileInfoSection';
import { AccountActions, IAccount } from '@/models/Account';
import { ImNotification } from 'react-icons/im';
import { getServerSession } from 'next-auth';
import styles from './styles.module.css';

export default async function AccountPage() {
  const userSessionData = (await getServerSession(authOptions))?.user
    ?.custome_data;
  if (!userSessionData?.db_id) return null;
  const userDetails: IAccount = await AccountActions.getUserDetailsFull(
    userSessionData.db_id
  ).then((user) => ({ ...user, _id: user._id.toString() }));
  return (
    <main className="mainPage">
      {userSessionData.user_type !== userDetails.user_type ? (
        <div className={styles.notification}>
          <ImNotification
            style={{ fontSize: '60px', padding: '7px', color: '#F0872A' }}
          />
          <div>
            Sign in and Sign out to reflect changes. <br />
            User type changed from <b>{userSessionData.user_type}</b> to {' '}
            <b>{userDetails.user_type}</b>
          </div>
        </div>
      ) : null}
      <ProfileInfoSection userDetails={userDetails} />
      <ProofDocumentSection />
    </main>
  );
}
