'use client';
import { useGlobalContext } from '../_context/store';
import { CSSProperties } from 'react';

export default function HoverTriggerButton({
  hoverContent = 'CONTENT',
  buttonStyle = {},
  title,
}: {
  buttonStyle?: CSSProperties;
  hoverContent?: any;
  title: string;
}) {
  const { setHoverContent } = useGlobalContext();
  return (
    <button
      style={{
        backgroundColor: '#0002',
        borderRadius: '100px',
        padding: '5px 20px',
        ...buttonStyle,
      }}
      onClick={() => setHoverContent(hoverContent)}
    >
      {title}
    </button>
  );
}
