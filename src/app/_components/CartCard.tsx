import med from "@/../../public/images/pills.png";
import add from "@/../../public/images/add.png";
import minus from "@/../../public/images/remove.png";
import Image from 'next/image';
import React, { useState } from 'react';

export default function CartCard({ order_details }: any) {
    const [counter, setCounter] = useState(order_details.quantity);

  // Function to increase the counter
  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  // Function to decrease the counter
  const decreaseCounter = () => {
    setCounter(counter - 1);
  };
  return (
    <div
      style={{
        backgroundColor: '#D8E0EA',
        borderRadius: '20px',
        padding: '20px',
        width: '70%',
        height: 'fit-content',
        display: "inline-flex",
        margin: '20px 0px 20px 0px'
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
        <h1 style={{fontWeight: '500'}}> Name: {JSON.stringify(order_details.title)}</h1>
        {/* <h1 style={{fontWeight: '500'}}> Quantity: {counter}</h1> */}
        {/* <h1>{order_details}</h1>     */}
        <div>
            Quantity:
            <button><Image src={minus} alt='add' onClick={decreaseCounter} style={{height: '15px', width: '15px', marginRight: '10px', marginLeft: '10px'}}/></button>
            {counter}
            <button><Image src={add} alt='add' onClick={increaseCounter} style={{height: '15px', width: '15px', marginLeft: '10px'}}/></button>
        </div>
      </div>
    </div>
  );
}
