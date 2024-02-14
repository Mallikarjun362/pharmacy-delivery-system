import { authOptions } from '../api/auth/[...nextauth]/options';
import { DropDownMenu } from './ClientComponents';
import acnt from '@/../../public/person.svg';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
// ICONS
import { MdOutlineLocalPostOffice } from 'react-icons/md';
import { FaPrescriptionBottleAlt } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineExplore } from 'react-icons/md';
import { BiSolidPackage } from 'react-icons/bi';
import { PiSignOutFill } from 'react-icons/pi';
import { VscAccount } from 'react-icons/vsc';
import { GrCatalog } from 'react-icons/gr';
import { LuLogIn } from 'react-icons/lu';
import { GoHome } from 'react-icons/go';

export default async function MainNavigationBar() {
  const session = await getServerSession(authOptions);
  const userType = session?.user.custome_data.user_type;

  const navLinks: { [key: string]: any } = {
    '/browse': 'Browse',
  };

  const dropdownLinks: { [url: string]: { icon: any; title: string } } = {
    ...(session
      ? {
          '/': { icon: <GoHome />, title: 'Home' },
          '/browse': { icon: <MdOutlineExplore />, title: 'Browse' },
          '/account': { icon: <VscAccount />, title: `Account - ${userType}` },
          // ------------ ONLY BUYER ------------
          ...(userType === 'BUYER' || userType === 'ADMIN'
            ? {
                '/buyer/cart': {
                  icon: <MdOutlineShoppingCart />,
                  title: 'Cart',
                },
                '/orders': { icon: <BiSolidPackage />, title: 'Orders' },
                '/buyer/prescriptions': {
                  icon: <FaPrescriptionBottleAlt />,
                  title: 'Prescription',
                },
              }
            : {}),

          // ------------ ONLY SELLER ------------
          ...(userType === 'SELLER'
            ? {
                '/seller/catalog': { icon: <GrCatalog />, title: 'Catalog' },
                '/orders': {
                  icon: <BiSolidPackage />,
                  title: 'Incoming orders',
                },
              }
            : {}),
          // ---------------- DISPATCHER -----------------
          ...(userType === 'DISPATCHER'
            ? {
                '/orders': { icon: <BiSolidPackage />, title: 'Pending orders' },
              }
            : {}),

          // ------------ ONLY DISPATCHER ------------
          ...(userType === 'ADMIN'
            ? {
                '/admin/user-overview': {
                  icon: <LuLayoutDashboard />,
                  title: 'User overview',
                },
              }
            : {}),

          // ------------- ANY LOGIN USER -------------
          '/user-request': {
            icon: <MdOutlineLocalPostOffice />,
            title: 'User requests',
          },
          '/api/auth/signout?callbackUrl=/': {
            icon: <PiSignOutFill />,
            title: 'Sign out',
          },
        }
      : {
          '/api/auth/signin': { icon: <LuLogIn />, title: 'Sign in' },
        }),
  };
  return (
    <nav
      className="flex lg:p-[5px] lg:pl-[100px] lg:pr-[100px] pl-[30px] pr-[30px]"
      style={{
        borderBottom: '2px solid #0e308fe8',
        justifyContent: 'space-between',
        height: 'min-content',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        position: 'sticky',
        userSelect: 'none',
        overflow: 'hidden',
        minHeight: '80px',
        display: 'flex',
        width: '100%',
        zIndex: 2,
        top: 0,
      }}
    >
      {/* LEFT SECTION */}
      <Link
        href={'/'}
        style={{
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          color: '#0e308fe8',
          fontWeight: '650',
          fontSize: '40px',
        }}
      >
        Med-Kit
      </Link>
      {/* RIGHT SECTION */}
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          gap: '10px',
        }}
      >
        <DropDownMenu items={dropdownLinks} userType={userType as string} />
      </div>
    </nav>
  );
}
