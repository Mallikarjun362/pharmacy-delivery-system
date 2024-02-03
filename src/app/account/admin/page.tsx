import ProofDocumentSection from '../_sections/ProofDocumentSection';
import ProfileInfoSection from '../_sections/ProfileInfoSection';
import { useEffect, useState } from 'react';
import AccountPage from '../page';

export default function AdminUserViewPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const userEmail = searchParams?.userEmail?.toString();
  const isValidEmail = !!String(userEmail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!isValidEmail)
    return (
      <main className="mainPage">
        <span>
          Not a valid email <b style={{ padding: '10px' }}>{userEmail}</b>
        </span>
      </main>
    );
  return <AccountPage userEmail={userEmail} />;
}
