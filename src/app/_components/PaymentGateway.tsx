'use client';

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { debugLog } from '@/utils';
import { useState } from 'react';

export default async function PaymentGateway() {
  const session = await getServerSession(authOptions);
  const [rawText, setRawText] = useState('lol');

  debugLog('NAV BAR', session);
  return (
    <div>
      <button>Payment Gateway</button>
    </div>
  );
}
