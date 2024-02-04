import { authOptions } from '../api/auth/[...nextauth]/route';
import acnt from '@/../../public/person.svg';
import { getServerSession } from 'next-auth';
import { debugLog } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function MainNavigationBar() {
  const session = await getServerSession(authOptions);
  const userType = session?.user.custome_data.user_type;
  const navLinks: { [key: string]: any } = {
    '/browse': 'Browse',
    ...(session
      ? {
          ...(userType === 'BUYER'
            ? {
                '/buyer/cart': 'Cart',
                '/buyer/orders': 'Orders',
                '/buyer/prescriptions': 'Prescritions',
              }
            : {}),
          ...(userType === 'SELLER'
            ? {
                '/seller/catalogue': 'Catalogue',
                '/seller/orders': 'Incoming orders',
              }
            : {}),
          ...(userType === 'ADMIN'
            ? {
                '/admin/user-overview': 'User overview',
              }
            : {}),
          '/user-request': 'User requests',
          '/api/auth/signout?callbackUrl=/': 'Sign out',
        }
      : {
          '/api/auth/signin': 'Sign in',
        }),
  };
  return (
    <div
      className="flex"
      style={{
        justifyContent: 'space-between',
        display: 'inline-flex',
        height: 'min-content',
        minHeight: '80px',
        alignItems: 'center',
        padding: '5px 100px',
        position: 'sticky',
        userSelect: 'none',
        borderBottom: '2px solid #0e308fe8',
        overflow: 'hidden',
        width: '100vw',
        top: 0,
      }}
    >
      <Link
        href={'/'}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'inline-flex',
          color: '#0e308fe8',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: '40px',
          fontWeight: '650',
          padding: '5px 75px',
        }}
      >
        Med-Kit
      </Link>
      <div
        className=""
        style={{
          gap: '10px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {Object.keys(navLinks).map((url: any) => (
          <Link href={url} className="navLink" key={url}>
            {navLinks[url]}
          </Link>
        ))}
        {session
          ? [
              <Link
                href={'/account'}
                className="account flex items-center gap-2"
                key={'account'}
              >
                <Image src={acnt} alt="accnt" />{' '}
                <h1
                  style={{
                    margin: '0 7px',
                    fontSize: '1.5vw',
                  }}
                >
                  Account
                </h1>
                <span className="text-lg">
                  {session?.user?.custome_data?.user_type}
                </span>
              </Link>,
            ]
          : null}
      </div>
    </div>
  );
}
