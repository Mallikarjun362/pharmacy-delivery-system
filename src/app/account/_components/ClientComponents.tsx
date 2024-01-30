'use client';
import { useGlobalContext } from '@/app/_context/store';
import DisplaykeyValue from './DisplayKeyValue';
import { UserRequestActions } from '@/models/UserRequest';
import { changeUserType } from '../_functionality';

export const HoverButtom = ({ hoverContent, title, style }: any) => {
  const { setHoverContent } = useGlobalContext();
  return (
    <button
      style={{
        backgroundColor: '#0002',
        height: 'min-content',
        borderRadius: '50px',
        padding: '5px 15px',
        ...style,
      }}
      onClick={() => setHoverContent(hoverContent)}
    >
      {title}
    </button>
  );
};

export const RowEditButton = ({
  bg = '#0002',
  cb,
  s,
}: {
  bg: string;
  s: string;
  cb: any;
}) => (
  <button
    key={2}
    style={{
      backgroundColor: bg,
      fontSize: '15px',
      borderRadius: '50px',
      padding: '2px 10px',
    }}
    onClick={cb}
  >
    {s}
  </button>
);

export const InfoRowUserType = ({ user_details }: any) => (
  <DisplaykeyValue
    k="User type"
    v={user_details?.user_type}
    btns={
      user_details?.user_type === 'GENERAL'
        ? [
            <RowEditButton
              bg="cyan"
              cb={() =>
                changeUserType({
                  email: user_details.primary_email,
                  to_user_type: 'BUYER',
                })
              }
              s="Buyer"
              key={0}
            />,
            <RowEditButton
              bg="#0F07"
              cb={() =>
                changeUserType({
                  email: user_details.primary_email,
                  to_user_type: 'SELLER',
                })
              }
              s="Seller"
              key={1}
            />,
            <RowEditButton
              bg="orange"
              cb={() =>
                changeUserType({
                  email: user_details.primary_email,
                  to_user_type: 'DISPATCHER',
                })
              }
              s="Dispatcher"
              key={2}
            />,
          ]
        : []
    }
  />
);
