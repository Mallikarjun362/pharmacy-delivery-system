'use client';
import { GoDotFill } from 'react-icons/go';
import { TfiMenu } from 'react-icons/tfi';
import { GrClose } from 'react-icons/gr';
import { useState } from 'react';
import Link from 'next/link';

export const DropDownItem = ({
  icon,
  title,
  url,
}: {
  title: string;
  url: string;
  icon: any;
}) => (
  <Link
    href={url}
    className="hover:bg-[#0001] hover:text-[#0e308fe8] duration-0 text-[#0007]"
    style={{
      borderBottom: '1px solid gray',
      padding: '15px 20px',
      alignItems: 'center',
      fontWeight: '500',
      fontSize: '20px',
      display: 'flex',
      gap: '20px',
    }}
  >
    <span className="duration-0" style={{ fontSize: '30px' }}>
      {icon ? icon : <GoDotFill />}
    </span>
    <span className="duration-0">{title}</span>
  </Link>
);

export const DropDownMenu = ({
  items,
  userType,
}: {
  items: any;
  userType: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      style={{ position: 'relative' }}
      onMouseLeave={() => setIsOpen(false)}
      onMouseEnter={() => setIsOpen(true)}
    >
      <div
        className="hover:bg-[#0002]"
        style={{
          border: '2px solid #0e308fe8',
          alignItems: 'center',
          borderRadius: '10px',
          color: '#0e308fe8',
          cursor: 'pointer',
          display: 'flex',
          padding: '5px',
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div style={{ fontSize: '24px', padding: '5px 10px',fontWeight:"500" }}>{userType ? userType : "Sign in"}</div>
        {isOpen ? <GrClose size={47} /> : <TfiMenu size={47} />}
      </div>
      {isOpen ? (
        <div
          style={{
            transform: 'translateX(-100px) translateY(-15px)',
            boxShadow: '0 0 7px 7px #0002',
            flexDirection: 'column',
            borderRadius: '15px',
            overflow: 'hidden',
            background: '#EEE',
            position: 'fixed',
            display: 'flex',
            margin: '10px',
          }}
        >
          {Object.keys(items).map((url: any,idx:number) => (
            <DropDownItem
              key={idx}
              icon={items[url].icon}
              title={items[url].title}
              url={url}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
