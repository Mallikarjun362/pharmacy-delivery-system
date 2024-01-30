import Image from 'next/image';
import del_boy from "C:\\Users\\Admin\\Desktop\\Semester-6\\CSD\\pharmacy-delivery-system\\public\\images\\delivery_boy.png";
import './globals.css';

export default function Home() {
  return <main className="">
    <div className='first'>
      <div className="left">
        <Image src={del_boy} alt='Del' className='home_img' />
      </div>
      <div className="right">
        <div>
          <p style={{
          color:'#13171C',
          fontWeight:'700',
          marginLeft: '31 px',
          marginTop: '87px',
          fontSize: '4vw'
          }} > 
          Rapid Drug</p>
          <p style={{
            color: '#2A69C1',
            fontWeight:'700',
            // marginLeft: '31px', 
            fontSize: '4vw'
          }}>
            Delivery
          </p>
        </div>
        <div>
          <p style={{
            fontWeight:'400',
            fontSize: '20px',
            marginTop: '15px',
          }}>
          Delivering Health to Your Doorstep – Your Prescription, Our Priority
          </p>
        </div>
        <div >
          <button className="order_button" role="button" style={{
              
              marginLeft: '50px',
              marginTop: '42px'
          }}><h1 style={{fontSize:"1.5vw", fontWeight: '450', color: '#13171C'}}>Place Order </h1></button>
        </div>
      </div>
    </div>
  </main>;
}
