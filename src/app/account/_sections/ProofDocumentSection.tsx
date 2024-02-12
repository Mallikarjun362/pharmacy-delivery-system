import HoverTriggerButton from '@/app/_components/HoverTriggerButton';
import AddDocumentForm from '../_components/AddDocumentForm';
import DisplayFile from '@/app/_components/DisplayFile';
import styles from '../styles.module.css';
import { format } from 'date-fns';

export default async function ProofDocumentSection({
  userDetails,
}: {
  userDetails: any;
}) {
  return (
    <div className={`${styles.infoSection}`}>
      <h1>Documents</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Medical history</h3>
        <HoverTriggerButton
          hoverContent={<AddDocumentForm docType="MEDICAL" />}
          title="Add"
        />
      </div>
      <div className={styles.tableWrapper}>
        <table className={`${styles.infoTable}`}>
          <tbody>
            {userDetails?.medical_history?.map((ele: any, idx: number) => (
              <tr key={idx}>
                <td>{ele.title}</td>
                <td>{ele.doc_type}</td>
                <td>
                  {format(ele.timestamp, 'd MMM / yyyy')}
                </td>
                <td
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    padding: '10px',
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <HoverTriggerButton
                    buttonStyle={{
                      fontSize: '14px',
                      padding: '2px 10px',
                      background: 'lightgreen',
                    }}
                    hoverContent={<DisplayFile file_db_id={(ele as any)._id} />}
                    title="View file"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Verification documents</h3>
        <HoverTriggerButton
          hoverContent={<AddDocumentForm docType="PROOF" />}
          title="Add"
        />
      </div>
      <div className={styles.tableWrapper}>
        <table className={`${styles.infoTable}`}>
          <tbody>
            {userDetails?.proof_documents?.map((ele: any, idx: number) => (
              <tr key={idx}>
                <td>{ele.title}</td>
                <td>{ele.doc_type}</td>
                <td>{format(ele.timestamp, 'd MMM / yyyy')}</td>
                <td
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    padding: '10px',
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <HoverTriggerButton
                    buttonStyle={{
                      fontSize: '14px',
                      padding: '2px 10px',
                      background: 'lightgreen',
                    }}
                    hoverContent={<DisplayFile file_db_id={(ele as any)._id} />}
                    title="View file"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
