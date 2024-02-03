'use client';
import { useGlobalContext } from '@/app/_context/store';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import {
  IGeneralAccountDetails,
  getGeneralAccountDetails,
  setGeneralAccountDetails,
} from '../_functionality/ServerActions';

export default function GeneralDetailsEditForm() {
  const { setHoverContent } = useGlobalContext();
  const [userDetails, setUserDetails] = useState<IGeneralAccountDetails | any>({});
  const [gender, setGender] = useState('');
  const userDbId = useSession().data?.user?.custome_data?.db_id;
  useEffect(() => {
    (async () => {
      const user = userDbId ? await getGeneralAccountDetails(userDbId) : null;
      setUserDetails(user);
      setGender(user?.gender || '');
    })();
  }, []);
  if (!userDbId) return null;
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
        defaultValue={userDbId}
      />
      <input
        type="text"
        name="first_name"
        placeholder="First name"
        defaultValue={userDetails.first_name}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last name"
        defaultValue={userDetails.last_name}
      />
      <input
        type="text"
        name="father_name"
        placeholder="Father's name"
        defaultValue={userDetails.father_name}
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Phone number"
        defaultValue={userDetails.phone_number}
      />
      <input
        type="text"
        name="telegram_number"
        placeholder="Telegram number"
        defaultValue={userDetails.whatsapp_number}
      />
      <input
        type="text"
        name="whatsapp_number"
        placeholder="Whatsapp number"
        defaultValue={userDetails.telegram_number}
      />
      <input
        type="text"
        name="upi_id"
        placeholder="UPI Id"
        defaultValue={userDetails.upi_id}
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
        defaultValue={userDetails?.address?.building}
      />
      <input
        type="text"
        name="additional_details"
        placeholder="Additional details"
        defaultValue={userDetails?.address?.additional_details}
      />
      <input
        type="text"
        name="landmarks"
        placeholder="Landmarks"
        defaultValue={userDetails?.address?.landmarks}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        defaultValue={userDetails?.address?.city}
      />
      <input type="submit" value="Update" />
    </form>
  );
}