import { ImCross } from 'react-icons/im';

export default function AccessDeniedPage() {
  return (
    <main
      style={{
        backgroundColor: '#F3D1CB44',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflowY: 'scroll',
        display: 'flex',
        color: 'gray',
        padding: '10%',
        gap: '30px',
        flex: 1,
      }}
    >
      <ImCross style={{ fontSize: '500px', color: 'red' }} />
      <br />
      <h1 style={{ fontSize: '80px', color: '#0009', fontWeight: '500' }}>
        Access Denied
      </h1>
      <div
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '30px',
          display: 'flex',
          gap: '15px',
        }}
      >
        <p>You do not have the permission to view this page.</p>
        <p>Please check your credentials and try again.</p>
      </div>
      <p>
        Error Code: <b>403</b>
      </p>
    </main>
  );
}
