'use client';
import { useGlobalContext } from '@/app/_context/store';

export const HoverButtom = ({ hoverContent, title, style }: any) => {
  const { setHoverContent } = useGlobalContext();
  return (
    <button
      style={{
        backgroundColor: '#0002',
        height: 'min-content',
        borderRadius: '50px',
        padding: '5px 15px',
        ...style,
      }}
      onClick={() => setHoverContent(hoverContent)}
    >
      {title}
    </button>
  );
};
