import Link from 'next/link';
import { getServerSession } from 'next-auth';

export default async function MainNavigationBar() {
  const session = await getServerSession();
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
        {session ? (
          [
            <Link href={'/orders'} className="navLink" key={1}>
              Orders
            </Link>,
            <Link href={'/prescriptions'} className="navLink" key={2}>
              Prescriptions
            </Link>,
            <Link href={'/account'} className="navLink" key={3}>
              Account
            </Link>,
            <Link
              href={'/api/auth/signout?callbackUrl=/'}
              className="navLink"
              key={4}
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
