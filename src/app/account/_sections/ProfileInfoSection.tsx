import GeneralDetailsEditForm from '../_components/GeneralDetailsEditForm';
import { InfoRowUserType } from '../_components/ClientComponents';
import HoverTriggerButton from '@/app/_components/HoverTriggerButton';
import DisplaykeyValue from '../_components/DisplayKeyValue';
import styles from '../styles.module.css';
import { format } from 'date-fns';

export default async function ProfileInfoSection({
  userDetails,
}: {
  userDetails: any;
}) {
  return (
    <div className={`${styles.infoSection}`}>
      <h1>User Details</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>General</h3>
        <HoverTriggerButton
          hoverContent={<GeneralDetailsEditForm />}
          title="Edit details"
        />
      </div>
      <div className={styles.tableWrapper}>
        <table className={`${styles.infoTable}`}>
          <tbody>
            <DisplaykeyValue
              k="Name"
              v={
                (userDetails?.first_name || '') +
                ' ' +
                (userDetails?.last_name || '')
              }
            />
            <DisplaykeyValue
              k="Primary email"
              v={userDetails?.primary_email || ''}
            />
            <InfoRowUserType userDetails={userDetails} />
            <DisplaykeyValue k="Fathers name" v={userDetails?.father_name} />
            <DisplaykeyValue k="Phone number" v={userDetails?.phone_number} />
            <DisplaykeyValue
              k="Telegram number"
              v={userDetails?.telegram_number}
            />
            <DisplaykeyValue
              k="Whatsapp number"
              v={userDetails?.whatsapp_number}
            />
            <DisplaykeyValue k="Gender" v={userDetails?.gender} />
            <DisplaykeyValue k="UPI ID" v={userDetails?.upi_id} />
          </tbody>
        </table>
      </div>
      <h4 style={{ margin: '10px', fontSize: '25px' }}>Address</h4>
      <div className={styles.tableWrapper}>
        <table className={`${styles.infoTable}`}>
          <tbody>
            <DisplaykeyValue k="Building" v={userDetails?.address?.building} />
            <DisplaykeyValue
              k="Landmarks"
              v={userDetails?.address?.landmarks}
            />
            <DisplaykeyValue
              k="Additional details"
              v={userDetails?.address?.additional_details}
            />
            <DisplaykeyValue k="City" v={userDetails?.address?.city} />
          </tbody>
        </table>
      </div>
      <h3>Important details</h3>
      <div className={styles.tableWrapper}>
        <table className={`${styles.infoTable}`}>
          <tbody>
            <DisplaykeyValue k="IIT Bhilai ID" v={userDetails?.student_id} />
            <DisplaykeyValue k="Aadhar number" v={userDetails?.aadhar_number} />
            <DisplaykeyValue k="Blood group" v={userDetails?.blood_group} />
            <DisplaykeyValue
              k="Date of birth"
              v={
                userDetails?.date_of_birth
                  ? format(userDetails?.date_of_birth, 'dd / MMM / yyyy')
                  : ''
              }
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
