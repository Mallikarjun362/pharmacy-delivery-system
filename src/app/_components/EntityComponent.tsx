export const ActionButton = ({
  cb=null,
  bg='#0002',
  txt,
}: {
  cb?: any;
  bg?: string;
  txt: string;
}) => (
  <button
    style={{ backgroundColor: bg, padding: '3px 15px', borderRadius: '100px' }}
    onClick={cb}
  >
    {txt}
  </button>
);

export default function EntityComponent({
  entity_details,
  action_buttons = [],
}: {
  entity_details: any;
  action_buttons?: Array<any>;
}) {
  return (
    <div
      style={{
        border: '3px solid #0002',
        backgroundColor: '#0001',
        borderRadius: '10px',
        padding: '15px',
      }}
    >
      <div>{JSON.stringify(entity_details)}</div>
      <br />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {action_buttons}
      </div>
    </div>
  );
}
