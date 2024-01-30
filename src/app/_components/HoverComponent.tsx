'use client';
import { useGlobalContext } from '../_context/store';
import { RxCross2 } from 'react-icons/rx';

export default function HoverComponent() {
  const { hoverContent, setHoverContent } = useGlobalContext();
  if (!hoverContent) return null;
  return (
    <div
      style={{
        backgroundColor: '#0009',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          boxShadow: '0px 0px 10px 10px white',
          backgroundColor: '#DDD',
          borderRadius: '5px',
          overflowX: 'hidden',
          overflowY: 'scroll',
          minHeight: '400px',
          minWidth: '400px',
          maxHeight: '70%',
          padding: '10px',
          maxWidth: '80%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <button onClick={() => setHoverContent(null)}>
            <RxCross2
              className="hover:bg-red-300"
              style={{
                border: '2px solid red',
                borderRadius: '5px',
                fontSize: '40px',
                color: 'red',
              }}
            />
          </button>
        </div>
        <div style={{ padding: '10px' }}>{hoverContent}</div>
      </div>
    </div>
  );
}
