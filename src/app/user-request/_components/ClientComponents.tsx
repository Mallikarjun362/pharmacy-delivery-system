'use client';
import {
  getReqsReceivedDone,
  handleResponseSubmit,
} from '../_functionality/ServerActions';
import styles from '../styles.module.css';
import { RequestCard } from './Components';
import { useGlobalContext } from '@/app/_context/store';

export const RequestResponseForm = ({ req }: any) => (
  <form action={handleResponseSubmit}>
    <input
      type="text"
      name="message"
      placeholder="Message / Reason"
      required
      autoComplete="off"
    />
    <div>
      <input
        type="text"
        name="db_id"
        defaultValue={req._id}
        style={{ display: 'none' }}
      />
      <input
        type="text"
        name="req_type"
        defaultValue={req.req_type}
        style={{ display: 'none' }}
      />
      <input type="submit" value="Accept" name="accept" />
      <input type="submit" value="Reject" name="reject" />
    </div>
  </form>
);

export default function RequestsReceivedDone({
  userIdentifier,
}: {
  userIdentifier: string;
}) {
  const { cacheReqReceivedDone, setCacheReqReceivedDone } = useGlobalContext();
  const refresh = async () =>
    setCacheReqReceivedDone(await getReqsReceivedDone(userIdentifier));
  if (cacheReqReceivedDone.length === 0) {
    return (
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          padding: '50px',
          width: '100%',
        }}
      >
        <button
          onClick={refresh}
          style={{
            backgroundColor: '#C5EAF9',
            borderRadius: '100px',
            padding: '10px 25px',
            fontSize: '20px',
          }}
        >
          See previvous requests
        </button>
      </div>
    );
  }
  return (
    <>
      <div className={`${styles.gridContainer}`}>
        {cacheReqReceivedDone
          .filter((ele: any) => ele.status === 'ACCEPTED')
          .reverse()
          .map((ele: any, idx: number) => (
            <RequestCard req={ele} key={idx} type="RECEIVED" />
          ))}
      </div>
      <div className={`${styles.gridContainer}`}>
        {cacheReqReceivedDone
          .filter((ele: any) => ele.status === 'REJECTED')
          .reverse()
          .map((ele: any, idx: number) => (
            <RequestCard req={ele} key={idx} type="RECEIVED" />
          ))}
      </div>
    </>
  );
}
