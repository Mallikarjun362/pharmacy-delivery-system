import GeneralRequestForm from './_components/GeneralRequestForm';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { RequestCard } from './_components/Components';
import { IUserRequest } from '@/models/UserRequest';
import { getServerSession } from 'next-auth';
import styles from './styles.module.css';
import { toJSON } from '@/utils';
import {
  getReqsReceivedPending,
  getReqsSent,
} from './_functionality/ServerActions';
import RequestsReceivedDone from './_components/ClientComponents';

export default async function UserRequestPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const userIdentifier =
    session?.user?.custome_data?.user_type === 'ADMIN'
      ? 'ADMIN'
      : session?.user.email;
  const req_sent = toJSON(await getReqsSent(userIdentifier))?.reverse();
  const req_received_pending = toJSON(
    await getReqsReceivedPending(userIdentifier)
  )?.reverse();
  const req_received_done: Array<any> = [];
  return (
    <main className={`mainPage ${styles.requestMainPage}`}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <GeneralRequestForm userIdentifier={userIdentifier} />
      </div>
      <h1>Sent</h1>
      <div className={`${styles.gridContainer}`}>
        {req_sent.map((ele: IUserRequest, idx: number) => (
          <RequestCard req={ele} key={idx} />
        ))}
      </div>
      <hr style={{ borderWidth: '1px', borderColor: '#0003' }} />
      <h1>Received</h1>
      <div className={`${styles.gridContainer}`}>
        {req_received_pending.map((ele: IUserRequest, idx: number) => (
          <RequestCard req={ele} key={idx} type="RECEIVED" />
        ))}
      </div>
      <RequestsReceivedDone userIdentifier={userIdentifier} />
    </main>
  );
}
