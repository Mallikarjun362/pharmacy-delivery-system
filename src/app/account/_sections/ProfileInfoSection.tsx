import { InfoRowUserType } from '../_components/ClientComponents';
import { GeneralDetailsEditForm } from '../_components/EditForm';
import { HoverButtom } from '../_components/ClientComponents';
import DisplaykeyValue from '../_components/DisplayKeyValue';
import styles from '../styles.module.css';

export default async function ProfileInfoSection({
  user_details,
}: {
  user_details: any;
}) {
  return (
    <div className={`${styles.profileInfoSection}`}>
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
              (user_details?.first_name || '') +
              ' ' +
              (user_details?.last_name || '')
            }
          />
          <DisplaykeyValue
            k="Primary email"
            v={user_details?.primary_email || ''}
          />
          <InfoRowUserType user_details={user_details} />
          <DisplaykeyValue k="Fathers name" v={user_details?.father_name} />
          <DisplaykeyValue k="Phone number" v={user_details?.phone_number} />
          <DisplaykeyValue
            k="Telegram number"
            v={user_details?.telegram_number}
          />
          <DisplaykeyValue
            k="Whatsapp number"
            v={user_details?.whatsapp_number}
          />
          <DisplaykeyValue k="Gender" v={user_details?.gender} />
          <DisplaykeyValue k="UPI ID" v={user_details?.upi_id} />
        </tbody>
      </table>
      <h4 style={{margin:"10px",fontSize:"25px"}}>Address</h4>
      <table className={`${styles.infoTable}`}>
        <tbody>
          <DisplaykeyValue k="Building" v={user_details?.address?.building} />
          <DisplaykeyValue k="Landmarks" v={user_details?.address?.landmarks} />
          <DisplaykeyValue
            k="Additional details"
            v={user_details?.address?.additional_details}
          />
          <DisplaykeyValue k="City" v={user_details?.address?.city} />
        </tbody>
      </table>
      <h3>Important details</h3>
      <table className={`${styles.infoTable}`}>
        <tbody>
          <DisplaykeyValue k="IIT Bhilai ID" v={user_details?.student_id} />
          <DisplaykeyValue k="Aadhar number" v={user_details?.aadhar_number} />
          <DisplaykeyValue k="Blood group" v={user_details?.blood_group} />
          <DisplaykeyValue k="Date of birth" v={user_details?.date_of_birth} />
        </tbody>
      </table>
    </div>
  );
}
