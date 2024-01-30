import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { debugLog } from '@/utils';

export default async function MainNavigationBar() {
  const session = await getServerSession(authOptions);
  debugLog('NAV BAR', session);
  return (
    <div
      className="flex flex-wrap lg:flex-nowrap"
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#36C0E5',
        height: 'min-content',
        alignItems: 'center',
        padding: '5px 50px',
        position: 'sticky',
        userSelect: 'none',
        top: 0,
      }}
    >
      <Link
        href={'/'}
        style={{
          fontFamily: 'Times Roman',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: '35px',
          padding: '5px',
        }}
      >
        Prarmacy delivery system
      </Link>
      <div className="flex flex-wrap items-center" style={{ gap: '10px' }}>
        <Link href={'/browse'} className="navLink">
          Browse
        </Link>
        {session && session.user.custome_data.user_type == 'BUYER'
          ? [
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
        {session && session.user.custome_data.user_type == 'SELLER'
          ? [
              <Link href={'/seller/orders'} className="navLink" key={'s-orders'}>
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
            <Link href={'/account'} className="navLink" key={'account'}>
              Account
            </Link>,
            <Link
              href={'/api/auth/signout?callbackUrl=/'}
              className="navLink"
              key={'auth'}
            >
              Sign out
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
