import del_boy from '@/../../public/images/delivery_boy.png';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <main
      className="mainPage"
      style={{ padding: 0, paddingBottom: '200px', overflowX: 'hidden' }}
    >
      {/* HERO SECTION */}
      <div
        style={{ display: 'flex', width: '100vw' }}
        className="flex-col lg:h-[90vh] lg:flex-row"
      >
        {/* LEFT */}
        <div className="lg:flex-1 ">
          <Image src={del_boy} alt="Del" />
        </div>
        {/* RIGHT */}
        <div className="lg:flex-1 lg:p-[2%] p-[10%]">
          <div
            className="lg:pt-[100px]"
            style={{
              fontSize: 'clamp(70px,5vw,10vw)',
              fontWeight: '700',
            }}
          >
            <p
              style={{
                color: '#13171C',
              }}
            >
              Rapid Drug
            </p>
            <p
              style={{
                color: '#2A69C1',
              }}
            >
              Delivery
            </p>
          </div>
          <div>
            <p
              style={{
                fontWeight: '400',
                marginTop: '15px',
                fontSize: '25px',
              }}
            >
              Delivering Health to Your Doorstep – Your Prescription, Our
              Priority
            </p>
          </div>
          <div>
            <Link href={'/browse'}>
              <button
                className="order_button"
                role="button"
                style={{
                  marginLeft: '50px',
                  marginTop: '42px',
                }}
              >
                <h1
                  style={{
                    fontSize: 'clamp(20px,1.5vw,100px)',
                    fontWeight: '450',
                    color: '#13171C',
                  }}
                >
                  Place Order
                </h1>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
