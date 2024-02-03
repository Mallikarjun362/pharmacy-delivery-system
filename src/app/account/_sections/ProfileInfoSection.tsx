import GeneralDetailsEditForm from '../_components/GeneralDetailsEditForm';
import { InfoRowUserType } from '../_components/ClientComponents';
import { HoverButtom } from '../_components/ClientComponents';
import DisplaykeyValue from '../_components/DisplayKeyValue';
import styles from '../styles.module.css';

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
        <HoverButtom
          hoverContent={<GeneralDetailsEditForm />}
          title="Edit details"
        />
      </div>
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
      <h4 style={{ margin: '10px', fontSize: '25px' }}>Address</h4>
      <table className={`${styles.infoTable}`}>
        <tbody>
          <DisplaykeyValue k="Building" v={userDetails?.address?.building} />
          <DisplaykeyValue k="Landmarks" v={userDetails?.address?.landmarks} />
          <DisplaykeyValue
            k="Additional details"
            v={userDetails?.address?.additional_details}
          />
          <DisplaykeyValue k="City" v={userDetails?.address?.city} />
        </tbody>
      </table>
      <h3>Important details</h3>
      <table className={`${styles.infoTable}`}>
        <tbody>
          <DisplaykeyValue k="IIT Bhilai ID" v={userDetails?.student_id} />
          <DisplaykeyValue k="Aadhar number" v={userDetails?.aadhar_number} />
          <DisplaykeyValue k="Blood group" v={userDetails?.blood_group} />
          <DisplaykeyValue k="Date of birth" v={userDetails?.date_of_birth} />
        </tbody>
      </table>
    </div>
  );
}
