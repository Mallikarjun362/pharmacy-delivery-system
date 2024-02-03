'use client';
import { changeUserType } from '../_functionality/ServerActions';
import { useGlobalContext } from '@/app/_context/store';
import DisplaykeyValue from './DisplayKeyValue';

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

export const InfoRowUserType = ({ userDetails }: any) => (
  <DisplaykeyValue
    k="User type"
    v={userDetails?.user_type}
    btns={
      userDetails?.user_type === 'GENERAL'
        ? [
            <RowEditButton
              bg="cyan"
              cb={() =>
                changeUserType({
                  email: userDetails.primary_email,
                  to_user_type: 'BUYER',
                })
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
                })
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
                })
              }
              text="Dispatcher"
              key={2}
            />,
          ]
        : []
    }
  />
);
