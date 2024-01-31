import { authOptions } from '../api/auth/[...nextauth]/route';
import acnt from '@/../../public/person.svg';
import { getServerSession } from 'next-auth';
import { debugLog } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function MainNavigationBar() {
  const session = await getServerSession(authOptions);
  debugLog('NAV BAR', session);
  return (
    <div
      className="flex"
      style={{
        justifyContent: 'space-between',
        display: 'inline-flex',
        height: 'min-content',
        alignItems: 'center',
        padding: '5px 100px',
        position: 'sticky',
        userSelect: 'none',
        borderBottom: '2px solid #0e308fe8',
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
      <div className="" style={{ gap: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link href={'/browse'} className="navLink">
          Browse
        </Link>
        {session && session?.user?.custome_data?.user_type == 'BUYER'
          ? [
              <Link href={'/buyer/cart'} className="navLink" key={'b-cart'}>
                Cart
              </Link>,
              <Link href={'/buyer/orders'} className="navLink" key={'b-orders'}>
                Orders
              </Link>,
              <Link
                href={'/buyer/prescriptions'}
                className="navLink"
                key={'b-prescription'}
              >
                Prescriptions
              </Link>,
            ]
          : null}
        {session && session?.user?.custome_data.user_type == 'SELLER'
          ? [
              <Link
                href={'/seller/orders'}
                className="navLink"
                key={'s-orders'}
              >
                Orders
              </Link>,
              <Link
                href={'/seller/catalogue'}
                className="navLink"
                key={'s-catalogue'}
              >
                Catalogue
              </Link>,
            ]
          : null}
        {session ? (
          [
            <Link href={'/user-request'} className="navLink" key={'request'}>
              User request
            </Link>,
            <Link
              href={'/api/auth/signout?callbackUrl=/'}
              className="navLink"
              key={'auth'}
            >
              Sign out
            </Link>,
            <Link
              href={'/account'}
              className="account flex items-center gap-2"
              key={'account'}
            >
              <Image src={acnt} alt="accnt" />{' '}
              <h1 style={{ fontSize: '1.5vw', marginBottom: '1px' }}>
                Account
              </h1>
              <span className="text-lg">
                {session?.user?.custome_data?.user_type}
              </span>
            </Link>,
          ]
        ) : (
          <Link href={'/api/auth/signin'} className="navLink">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
