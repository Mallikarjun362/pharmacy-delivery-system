export default function BuyerOrderCard({ order_details }: any) {
  return (
    <div
      style={{
        backgroundColor: '#0002',
        borderRadius: '20px',
        padding: '20px',
      }}
    >
      Order : {JSON.stringify(order_details)}
    </div>
  );
}
