'use client';
import { changeUserType } from '../_functionality/ServerActions';
import { useGlobalContext } from '@/app/_context/store';
import DisplaykeyValue from './DisplayKeyValue';
import { useState } from 'react';

export const RowEditButton = ({
  bg = '#0002',
  text,
  cb,
}: {
  text: string;
  bg: string;
  cb: any;
}) => (
  <button
    key={2}
    style={{
      borderRadius: '50px',
      backgroundColor: bg,
      padding: '2px 10px',
      fontSize: '15px',
    }}
    onClick={cb}
  >
    {text}
  </button>
);

export const InfoRowUserType = ({ userDetails }: any) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <DisplaykeyValue
      k="User type"
      v={userDetails?.user_type}
      btns={
        userDetails?.user_type === 'GENERAL' && !isClicked
          ? [
              <RowEditButton
                bg="cyan"
                cb={() =>
                  changeUserType({
                    email: userDetails.primary_email,
                    to_user_type: 'BUYER',
                  }).then(() => setIsClicked(true))
                }
                text="Buyer"
                key={0}
              />,
              <RowEditButton
                bg="#0F07"
                cb={() =>
                  changeUserType({
                    email: userDetails.primary_email,
                    to_user_type: 'SELLER',
                  }).then(() => setIsClicked(true))
                }
                text="Seller"
                key={1}
              />,
              <RowEditButton
                bg="orange"
                cb={() =>
                  changeUserType({
                    email: userDetails.primary_email,
                    to_user_type: 'DISPATCHER',
                  }).then(() => setIsClicked(true))
                }
                text="Dispatcher"
                key={2}
              />,
            ]
          : []
      }
    />
  );
};
