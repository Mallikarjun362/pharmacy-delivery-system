'use client';
import { useRef } from 'react';
import { handleGeneralRequestSubmit } from '../_functionality/ServerActions';

export default function GeneralRequestForm({
  userIdentifier,
}: {
  userIdentifier: string;
}) {
  const theForm = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={theForm}
      className="standardForm"
      style={{
        boxShadow: '0 0 7px 7px #0002',
        borderRadius: '12px',
        maxWidth: '600px',
        width: '80vw',
      }}
      action={async (formData) => {
        await handleGeneralRequestSubmit(formData);
        theForm.current?.reset();
      }}
    >
      <h1>
        Me:
        <span style={{ color: 'blue', padding: '0 10px', fontWeight: 'bold' }}>
          {userIdentifier}
        </span>
      </h1>
      <input
        type="text"
        name="from_user"
        defaultValue={userIdentifier}
        style={{ display: 'none' }}
      />
      <textarea
        name="description"
        placeholder="Message"
        required
        autoComplete="off"
      />
      <input
        type="text"
        name="to_user"
        placeholder="To user (Email)"
        autoComplete="off"
        required
      />
      <select
        name="req_type"
        defaultValue={'GENERAL'}
        style={{ padding: '15px' }}
      >
        <option value="GENERAL">General request</option>
      </select>
      <input type="submit" value="Send" />
    </form>
  );
}
