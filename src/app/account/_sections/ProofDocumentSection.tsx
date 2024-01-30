import { HoverButtom } from '../_components/ClientComponents';
import styles from '../styles.module.css';
export default function ProofDocumentSection() {
  return (
    <div className={`${styles.profileInfoSection}`}>
      <h1>Documents</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Medical history</h3>
        <HoverButtom hoverContent={'Add'} title="Add" />
      </div>
      <table className={`${styles.infoTable}`}>
        <tbody></tbody>
      </table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Verification documents</h3>
        <HoverButtom hoverContent={'Add'} title="Add" />
      </div>
      <table className={`${styles.infoTable}`}>
        <tbody></tbody>
      </table>
    </div>
  );
}
