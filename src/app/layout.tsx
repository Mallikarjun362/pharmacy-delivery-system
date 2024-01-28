import MainNavigationBar from './_components/MainNavigationBar';
import type { Metadata } from 'next';
import './globals.css';
import AuthSessionProvider from './_components/AuthSessionProvider';
import { GlobalContextProvider } from './_context/store';
import HoverComponent from './_components/HoverComponent';

export const metadata: Metadata = {
  title: 'Parmacy Delivary System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-gray-100"
        style={{
          flexDirection: 'column',
          overflow: 'hidden',
          display: 'flex',
          height: '100vh',
          width: '100vw',
        }}
      >
        <AuthSessionProvider>
          <GlobalContextProvider>
            <MainNavigationBar />
            {children}
            <HoverComponent />
          </GlobalContextProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
