'use client';
import { useGlobalContext } from '@/app/_context/store';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import {
  IGeneralAccountDetails,
  getGeneralAccountDetails,
  setGeneralAccountDetails,
} from '../_functionality';

export function GeneralDetailsEditForm() {
  const { setHoverContent } = useGlobalContext();
  const [details, setDetails] = useState<IGeneralAccountDetails | any>({});
  const [gender, setGender] = useState('');
  const session = useSession();
  useEffect(() => {
    (async () => {
      const d =
        (await getGeneralAccountDetails(
          session.data?.user?.custome_data.db_id || ''
        )) || {};
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
      <h1>General Details :</h1>
      <input
        style={{ display: 'none' }}
        type="text"
        name="db_id"
        defaultValue={session.data?.user?.custome_data?.db_id || ''}
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
      <h1>Address :</h1>
      <input
        type="text"
        name="building"
        placeholder="Building"
        defaultValue={details?.address?.building}
      />
      <input
        type="text"
        name="additional_details"
        placeholder="Additional details"
        defaultValue={details?.address?.additional_details}
      />
      <input
        type="text"
        name="landmarks"
        placeholder="Landmarks"
        defaultValue={details?.address?.landmarks}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        defaultValue={details?.address?.city}
      />
      <input type="submit" value="Update" />
    </form>
  );
}
