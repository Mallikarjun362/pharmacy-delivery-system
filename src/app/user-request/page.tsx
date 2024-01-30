import { authOptions } from '../api/auth/[...nextauth]/route';
import { getReqsReceived, getReqsSent } from './_functionality';
import { getServerSession } from 'next-auth';

const ReqSent = (obj: any) => (
  <div style={{ padding: '20px', background: '#0001', borderRadius: '10px' }}>
    {JSON.stringify(obj)}
  </div>
);
const ReqReceived = (obj: any) => (
  <div style={{ padding: '20px', background: '#0001', borderRadius: '10px' }}>
    {JSON.stringify(obj)}
  </div>
);

export default async function UserRequestPage() {
  const session = await getServerSession(authOptions);
  const req_sent = session?.user.custome_data?.user_type
    ? await (session?.user.custome_data?.user_type == 'ADMIN'
        ? getReqsSent('ADMIN')
        : getReqsSent(session?.user.email))
    : [];
  const req_received = session?.user.custome_data?.user_type
    ? await (session?.user.custome_data?.user_type == 'ADMIN'
        ? getReqsReceived('ADMIN')
        : getReqsReceived(session?.user.email))
    : [];
  return (
    <main className="mainPage">
      <h1>Sent</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {req_sent.map((ele, idx) => (
          <ReqSent obj={ele} key={idx} />
        ))}
      </div>
      <h1>Received</h1>
      <div>
        {req_received.map((ele, idx) => (
          <ReqReceived obj={ele} key={idx} />
        ))}
      </div>
    </main>
  );
}
