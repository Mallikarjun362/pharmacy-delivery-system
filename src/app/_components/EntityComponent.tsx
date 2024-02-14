import { CSSProperties } from 'react';

export const ActionButton = ({
  cb = null,
  bg = '#0002',
  txt,
}: {
  cb?: any;
  bg?: string;
  txt: string;
}) => (
  <button
    style={{
      backgroundColor: bg,
      padding: '3px 15px',
      borderRadius: '100px',
      height: 'min-content',
    }}
    onClick={cb}
  >
    {txt}
  </button>
);

export default function EntityComponent({
  details,
  buttons = '',
  style = {},
}: {
  details: any;
  buttons?: any;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        border: '3px solid #0002',
        backgroundColor: '#0001',
        borderRadius: '10px',
        padding: '15px',
        ...style,
      }}
    >
      <div>{details}</div>
      <br />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {buttons}
      </div>
    </div>
  );
}
