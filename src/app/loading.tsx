import ClipLoader from 'react-spinners/ClipLoader';

export default function Loading() {
  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <p style={{ fontSize: '50px' }}>Loading...</p>
      {/* <ClipLoader
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
    </div>
  );
}
