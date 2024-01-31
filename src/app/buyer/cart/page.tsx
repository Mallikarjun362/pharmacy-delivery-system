'use client';
import { placeOrderManual } from './_functionality/ServerComponents';
import { useGlobalContext } from '@/app/_context/store';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function generateRandomString() {
  const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    result += alphanumericChars.charAt(randomIndex);
  }

  return result;
}

export default function CartPage() {
  const session = useSession();
  const { cart } = useGlobalContext();
  const [is_prescription_required, setIsPrescriptionRequired] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);  
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to 'Cash On Delivery';
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const RadioButtonStyles = `
  .paymentMethodContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .paymentMethodLabel {
    margin-bottom: 5px;
  }

  .paymentMethodRadio {
    margin-right: 5px;
  }`

  useEffect(() => {
    let s = 1;
    for (let val of Object.values(cart)) {
      if ((val as any).is_prescription_required) {
        setIsPrescriptionRequired(true);
      }
      s += (val as any).unit_price * (val as any).quantity;
    }
    setTotalPrice(s);
  }, []);

  const handlePayNow = async () => {
    window.location.replace(`upi://pay?pa=9494248739@paytm&amp;pn=Mr Gaddey Hemanth Chowdary&amp;am=${totalPrice}&amp;mc=bdOMam96965720364044&amp;cu=INR;tr=${generateRandomString()};tn=pharmacy delivery payment`);
  };  


  const handlePlaceOrder = async () => {
    if (is_prescription_required && !file)
      return alert('Prescription required');
    
    if (Object.keys(cart)?.length === 0) {
      return alert('Cart is empty');
    }

    const formData = new FormData();
    formData.append('file', file);

    await placeOrderManual({
      cart,
      buyer_db_id: session?.data?.user?.custome_data.db_id,
      seller_db_id: (Object.values(cart)[0] as any).seller_db_id,
      prescription_file: file ? formData : null,
    });

    alert('Order confirmed successfully');
  };

  return (
    <main className="mainPage">
      <div>
        <h2>Items :</h2>
        {Object.keys(cart).map((k, idx) => (
          <div key={idx}>{JSON.stringify(cart[k])}</div>
        ))}
      </div>
      {is_prescription_required ? (
        <input
          type="file"
          name="prescription"
          placeholder="Prescription Required"
          onChange={(e) => {
            console.log((e.target as any).files[0]);
            setFile((e.target as any).files[0]);
          }}
          required
        />
      ) : (
        <div>Prescription not required</div>
      )}
      <div>Total price : &#8377; {totalPrice}</div>

      <p>Select Payment Method:</p>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'20px', marginTop: '10px' }}>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={() => setPaymentMethod('cod')}
          />
          Cash On Delivery
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={() => setPaymentMethod('upi')}
          />
          UPI
        </label>
      </div>

      {(paymentMethod=='upi') &&
      <button
        onClick={
          handlePayNow
          // Redirect to the external link
          //window.location.href = 'upi://pay?pa=9494248739@paytm&amp;pn=Mr Gaddey Hemanth Chowdary&amp;am=10&amp;mc=bdOMam96965720364044&amp;cu=INR;tr=20sssj9j3s8j38;tn=business_related_stuff'; // Replace with your external link
        }
        style={{
          backgroundColor: '#0aab5b',//'#2196F3',  // Replace with your desired background color
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          marginLeft: '0px',
          marginTop: '20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Pay Money
      </button>}

      {(paymentMethod=='cod') && <button
        style={{
          backgroundColor: '#eba434',  // Replace with your desired background color
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          marginLeft: '0px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',  // Add margin for spacing
        }}
        onClick={async () => {
          if (is_prescription_required && !file)
            return alert('Prescription required');
          if (Object.keys(cart)?.length === 0) {
            return alert('Cart is empty');
          }
          const formData = new FormData();
          formData.append('file', file);
          await placeOrderManual({
            cart,
            buyer_db_id: session?.data?.user?.custome_data.db_id,
            seller_db_id: (Object.values(cart)[0] as any).seller_db_id,
            prescription_file: file ? formData : null,
          });
          alert('Order confirmed successfully');

        }}
      >
        Place Order
      </button>
      }

      {/* <button onClick={handlePayNow} className="payNowButton">
        PAY MONEY
      </button>

      <button onClick={handlePlaceOrder}>
        Pay Rs. {totalPrice}
      </button> */}
    </main>
  );
}
