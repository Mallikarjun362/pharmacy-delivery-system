export const InfoBlock = ({ obj }: { obj: { [k: string]: any } }) => (
  <div
    style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', width: '100%' }}
  >
    {Object.keys(obj).map((k: string, idx: number) => (
      <div
        key={idx}
        className="hover:bg-[#0002]"
        style={{
          border: '2px solid black',
          flexDirection: 'column',
          borderRadius: '5px',
          fontSize: '20px',
          padding: '10px',
          display: 'flex',
        }}
      >
        <b style={{ userSelect: 'none' }}>{k} :</b>
        <div>{obj[k]}</div>
      </div>
    ))}
  </div>
);
