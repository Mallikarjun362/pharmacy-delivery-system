const DisplaykeyValue = ({
  k,
  v,
  btns = [],
}: {
  k: string;
  v: string | number | Date;
  btns?: Array<any>;
}) => (
  <tr
    style={{
      width: '100%',
      margin: '2px',
    }}
  >
    <td style={{ fontWeight: '500', userSelect: 'none', width: '30%' }}>{k}</td>
    <td style={{ userSelect: 'none', color: 'gray' }}>:</td>
    <td>{v?.toString()}</td>
    <td
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '10px',
        display: 'flex',
        gap: '10px',
      }}
    >
      {btns}
    </td>
  </tr>
);

export default DisplaykeyValue;
