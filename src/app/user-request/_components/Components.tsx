import { RequestResponseForm } from './ClientComponents';
import { format, formatDistance } from 'date-fns';
import styles from '../styles.module.css';
import { getTimeDiffFromNow } from '@/utils';

const ReqBg: { [key: string]: string } = {
  PENDING: '#F7E671',
  ACCEPTED: '#C6ECB6',
  REJECTED: '#F1A999',
};

const codeToTitle = (txt: string) =>
  txt.replaceAll('_', ' ').toLowerCase().replace(/^./, txt[0].toUpperCase());

const ReqFg: { [key: string]: string } = {
  PENDING: '#C57421',
  ACCEPTED: 'green',
  REJECTED: 'red',
};

const ReqDataDisplay = ({ req }: any) => {
  if (req.req_type === 'CHANGE_USER_TYPE')
    return (
      <p>
        To user type: <b>{req?.data?.to_user_type}</b>
      </p>
    );
};

export const RequestCard = ({
  req,
  type = 'SENT',
}: {
  req: any;
  type?: 'SENT' | 'RECEIVED';
}) => (
  <div
    className={`${styles.requestMain}`}
    style={{
      background: ReqBg[req?.status],
    }}
  >
    <div className={styles.requestDate}>
      {getTimeDiffFromNow(req.timestamp)}
    </div>
    <div
      className={`${styles.requestStatus}`}
      style={{
        color: ReqFg[req?.status],
      }}
    >
      {req.status}
    </div>
    <p style={{ fontSize: '30px', color: '#000B' }}>
      {codeToTitle(req.req_type)}
    </p>
    {type === 'RECEIVED' ? (
      <div className={`${styles.requestEmail}`}>
        From: <b>{req.from_user}</b>
      </div>
    ) : (
      <div className={`${styles.requestEmail}`}>To: {req.to_user}</div>
    )}
    <div className={`${styles.requestBody}`}>
      <ReqDataDisplay req={req} />
      {req.description.split('\n').map((txt: string, idx: number) => (
        <p key={idx}>{txt}</p>
      ))}
    </div>
    {req.reject_message || req.cancel_reason ? (
      <hr style={{ border: '1px solid #0003', marginTop: '7px' }} />
    ) : null}
    {req.status != 'PENDING' ? (
      <div style={{ padding: '10px 0' }}>
        {req.reject_message}
        {req.cancel_reason}
      </div>
    ) : null}
    {type === 'RECEIVED' && req.status === 'PENDING' ? (
      <RequestResponseForm req={req} />
    ) : null}
  </div>
);
