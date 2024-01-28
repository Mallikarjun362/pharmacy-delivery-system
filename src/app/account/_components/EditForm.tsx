'use client';
import { useSession } from 'next-auth/react';
import {
  IGeneralAccountDetails,
  getGeneralAccountDetails,
  setGeneralAccountDetails,
} from '../_functionality';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/app/_context/store';

export function GeneralDetailsEditForm() {
  const { setHoverContent } = useGlobalContext();
  const [details, setDetails] = useState<IGeneralAccountDetails | any>({});
  const [gender, setGender] = useState('');
  const session = useSession();
  useEffect(() => {
    (async () => {
      const d = await getGeneralAccountDetails(session.data?.user?.email || '');
      setDetails(d);
      setGender(d.gender);
    })();
  }, []);

  return (
    <form
      className="standardForm"
      action={async (formData: FormData) => {
        await setGeneralAccountDetails(formData);
        setHoverContent(null);
      }}
    >
      <h1>General Details</h1>
      <input
        style={{ display: 'none' }}
        type="text"
        name="primary_email"
        defaultValue={session.data?.user?.email || ''}
      />
      <input
        type="text"
        name="first_name"
        placeholder="First name"
        defaultValue={details.first_name}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last name"
        defaultValue={details.last_name}
      />
      <input
        type="text"
        name="father_name"
        placeholder="Father's name"
        defaultValue={details.father_name}
      />

      <input
        type="text"
        name="phone_number"
        placeholder="Phone number"
        defaultValue={details.phone_number}
      />
      <input
        type="text"
        name="telegram_number"
        placeholder="Telegram number"
        defaultValue={details.whatsapp_number}
      />
      <input
        type="text"
        name="whatsapp_number"
        placeholder="Whatsapp number"
        defaultValue={details.telegram_number}
      />
      <input
        type="text"
        name="upi_id"
        placeholder="UPI Id"
        defaultValue={details.upi_id}
      />
      <select
        name="gender"
        value={gender || ''}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">-- SELECT GENDER --</option>
        <option value="MALE">MALE</option>
        <option value="FEMALE">FEMALE</option>
      </select>
      <input type="submit" value="Update" />
    </form>
  );
}
