import med from "@/../../public/images/pills.png";
import Image from 'next/image';

export default function CartCard({ order_details }: any) {
  return (
    <div
      style={{
        backgroundColor: '#D8E0EA',
        borderRadius: '20px',
        padding: '20px',
        width: '70%',
        height: 'fit-content',
        display: "inline-flex"
      }}
    >
      {/* Order : {JSON.stringify(order_details)} */}
      <div style={{
        display : 'flex',
        position: 'relative'
      }}>
        <Image src={med} alt='product_icon' style={{
          width: '5vw',
          height: '5vw'
        }}/>
      </div>
      <div style={{
        marginLeft: '50px'
      }}>
        <h1 style={{fontWeight: '500'}}> Name: Vicks</h1>
        <h1 style={{fontWeight: '500'}}> Quantity: 2</h1>
        <div><button></button></div>
      </div>
    </div>
  );
}
