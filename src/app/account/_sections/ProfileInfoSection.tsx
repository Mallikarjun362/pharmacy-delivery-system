import { AccountActions, IAccount } from '@/models/Account';
import { getServerSession } from 'next-auth';
import styles from '../styles.module.css';
import { HoverButtom } from '../_components/ClientComponents';
import { GeneralDetailsEditForm } from '../_components/EditForm';

const DisplaykeyValue = ({
  k,
  v,
  btns = [],
}: {
  k: string;
  v: string | number | Date;
  btns?: Array<any>;
}) => (
  <tr
    style={{
      width: '100%',
      margin: '2px',
    }}
  >
    <td style={{ fontWeight: '500', userSelect: 'none', width: '30%' }}>{k}</td>
    <td style={{ userSelect: 'none', color: 'gray' }}>:</td>
    <td>{v?.toString()}</td>
    <td>{btns}</td>
  </tr>
);

export default async function ProfileInfoSection() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  const user_details: IAccount = await AccountActions.getUserDetails(
    session?.user?.email as string
  );
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
              (user_details.first_name || '') +
              ' ' +
              (user_details.last_name || '')
            }
          />
          <DisplaykeyValue k="Primary email" v={user_details.primary_email} />
          <DisplaykeyValue k="User type" v={user_details.user_type} />
          <DisplaykeyValue k="Fathers name" v={user_details.father_name} />
          <DisplaykeyValue k="Phone number" v={user_details.phone_number} />
          <DisplaykeyValue
            k="Telegram Number"
            v={user_details.telegram_number}
          />
          <DisplaykeyValue
            k="Whatsapp number"
            v={user_details.whatsapp_number}
          />
          <DisplaykeyValue k="Gender" v={user_details.gender} />
          <DisplaykeyValue k="UPI ID" v={user_details.upi_id} />
        </tbody>
      </table>
      <h3>Important details</h3>
      <table className={`${styles.infoTable}`}>
        <tbody>
          <DisplaykeyValue k="Student ID" v={user_details.student_id} />
          <DisplaykeyValue k="Aadhar number" v={user_details.aadhar_number} />
          <DisplaykeyValue k="Blood group" v={user_details.blood_group} />
          <DisplaykeyValue k="Date of birth" v={user_details.date_of_birth} />
        </tbody>
      </table>
    </div>
  );
}
