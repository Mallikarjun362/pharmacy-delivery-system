import Link from 'next/link';
import Image from 'next/image';
import acnt from "C:\\Users\\Admin\\Desktop\\Semester-6\\CSD\\pharmacy-delivery-system\\public\\person.svg"
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
        // backgroundColor: '#36C0E5',
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
      <div className="flex flex-wrap items-center" style={{ gap: '10px' }}>
        <Link href={'/browse'} className="navLink">
          Browse
        </Link>
        {session && session?.user?.custome_data?.user_type == 'BUYER'
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
        {session && session?.user?.custome_data.user_type == 'SELLER'
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
            <Link
              href={'/api/auth/signout?callbackUrl=/'}
              className="navLink"
              key={'auth'}
            >
              Sign out
            </Link>,
            <Link href={'/account'} className="account" key={'account'}>
            <Image src={acnt} alt='accnt'/> <h1 style={{fontSize: '1.5vw', marginBottom: '1px'}}>Account</h1>
            </Link>
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
