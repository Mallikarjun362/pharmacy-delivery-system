'use client';
import {
  setOrderDelivered,
  getOrderDetails,
  refreshMessages,
  dispatchOrder,
  updateDosage,
  sendMessage,
  cancleOrder,
  rejectOrder,
} from '../_functionality/ServerActions';
import { ActionButton } from '@/app/_components/EntityComponent';
import { InfoBlock } from '@/app/_components/Components';
import { useGlobalContext } from '@/app/_context/store';
import TheLoader from 'react-spinners/BarLoader';
import { useSession } from 'next-auth/react';
import { getTimeDiffFromNow } from '@/utils';
import { useEffect, useState } from 'react';
import { IMessage } from '@/models/Order';

const EventsTimeline = ({ events }: { events: Array<any> }) => (
  <div
    style={{
      border: '2px solid gray',
      width: 'min-content',
      borderRadius: '10px',
      userSelect: 'none',
      padding: '10px',
    }}
  >
    <h1 style={{ fontSize: '25px' }}>Time line </h1>
    <table style={{ padding: '10px', margin: '20px' }}>
      <tbody>
        {events.map((e: { event: string; t: string }, idx) => (
          <tr
            style={{ display: 'flex', gap: '10px', fontSize: '20px' }}
            key={idx}
          >
            <td>{idx + 1}.</td>
            <td
              style={{
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
                color: 'gray',
              }}
            >
              {e.event}
            </td>
            <td style={{ whiteSpace: 'nowrap' }}>{getTimeDiffFromNow(e.t)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function GlobalOrderOverview({
  order_db_id,
}: {
  order_db_id: string;
}) {
  const { setHoverContent } = useGlobalContext();
  const session = useSession();
  const sessionUserType = session.data?.user.custome_data.user_type;
  const sessionDbId = session.data?.user.custome_data.db_id;
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [orderMessages, setOrderMessages] = useState<Array<IMessage>>([]);
  useEffect(() => {
    (async () => {
      const val = await getOrderDetails(order_db_id);
      setOrderDetails(val);
      setOrderMessages(val.messages);
    })();
  }, []);
  if (!orderDetails._id)
    return (
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '250px',
          maxWidth: '80vw',
          display: 'flex',
          width: '900px',
        }}
      >
        <TheLoader width={200} />
      </div>
    );
  return (
    <div
      style={{
        flexDirection: 'column',
        height: 'min-content',
        alignItems: 'center',
        minWidth: '50vw',
        display: 'flex',
        padding: '20px',
        width: '100%',
      }}
    >
      <div>
        {orderDetails?.prescription?.file?.file ? (
          <img
            src={`data:image/jpeg;base64,${orderDetails.prescription.file.file}`}
            height={1000}
            width={1000}
            alt="Image"
          />
        ) : null}
      </div>
      <br />
      <EventsTimeline events={orderDetails.timeline} />
      <br />
      <InfoBlock
        obj={{
          'Full name':
            orderDetails.buyer.first_name + ' ' + orderDetails.buyer.last_name,
          Email: orderDetails.buyer.primary_email,
          'Order status': orderDetails.order_status,
          'Ordered at': getTimeDiffFromNow(orderDetails.timeline[0].t),
          'Payment mode': orderDetails.payment.mode,
          'Total payment': <>&#8377; {orderDetails.total_cost}</>
        }}
      />
      <br />
      <br />
      <div className="tableWrapper">
        <table className="standardTable">
          <thead>
            <tr style={{ backgroundColor: '#0000' }}>
              <th style={{ width: 'min-content' }}>S No.</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit price</th>
              <th>Dosage details</th>
            </tr>
          </thead>
          <tbody>
            {(orderDetails.available_items as Array<any>).map(
              (item: any, idx: number) => (
                <tr key={idx} style={{ fontSize: '22px' }}>
                  <td style={{ padding: '20px', width: 'min-content' }}>
                    {idx + 1}.
                  </td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit_price}</td>
                  <td>
                    {sessionUserType === 'SELLER' &&
                    orderDetails.order_status === 'CONFIRMED' ? (
                      <form
                        action="#"
                        onSubmit={async (e: any) => {
                          e.preventDefault();
                          const val = new FormData(e.target)
                            .get('dosage_details')
                            ?.toString() as string;
                          await updateDosage({
                            order_db_id: orderDetails._id,
                            comment_db_arr_id: item._id,
                            dosage_details: val,
                          });
                          alert('Details updated');
                        }}
                        className="standardForm"
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        <textarea
                          name="dosage_details"
                          rows={2}
                          cols={10}
                          defaultValue={item.dosage_details}
                          style={{
                            padding: '5px 10px',
                            minWidth: '100px',
                          }}
                        />
                        <input
                          type="submit"
                          value="Save"
                          style={{
                            width: 'min-content',
                            padding: '5px 10px',
                            margin: 0,
                          }}
                        />
                      </form>
                    ) : (
                      (item.dosage_details as string)
                        .split('\n')
                        .map((ele, idx) => <p key={idx}>{ele}</p>)
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <br />
      {/* ---------------------- ADDRESS --------------------- */}
      <div style={{ width: '100%', padding: '20px 0', fontSize: '22px' }}>
        <b>Address:</b> {orderDetails?.buyer?.address?.building},{' '}
        {orderDetails?.buyer?.address?.additional_details},{' '}
        {orderDetails?.buyer?.address?.landmarks},{' '}
        {orderDetails?.buyer?.address?.city}
      </div>
      {/* ------------------ REJECT OR CANCLE ------------------ */}
      {orderDetails.order_status === 'CONFIRMED' ? (
        <form
          className="standardForm"
          style={{
            width: '100%',
            flexDirection: 'row',
          }}
          onSubmit={async (e: any) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            if (fd.get('reject')) {
              await rejectOrder({
                reason: fd.get('reason')?.toString() as string,
                order_db_id: orderDetails._id,
              });
            } else {
              await cancleOrder({
                reason: fd.get('reason')?.toString() as string,
                order_db_id: orderDetails._id,
              });
            }
            setHoverContent(null);
          }}
        >
          <input
            type="text"
            name="reason"
            required
            placeholder="Reason or Type 'Cancel'"
          />
          {sessionDbId === orderDetails?.buyer?._id ? (
            <input
              type="submit"
              value="Cancle"
              name="cancle"
              style={{
                backgroundColor: 'lightblue',
                width: 'min-content',
                padding: '5px 10px',
                margin: 0,
              }}
            />
          ) : null}
          {sessionUserType === 'SELLER' ? (
            <input
              type="submit"
              value="Reject"
              name="reject"
              style={{
                backgroundColor: 'red',
                width: 'min-content',
                padding: '5px 10px',
                margin: 0,
              }}
            />
          ) : null}
        </form>
      ) : null}

      <br />
      {/* ------------------------- MESSAGES ------------------------ */}

      <div style={{ width: '100%', border: '2px solid gray', padding: '10px' }}>
        <div>
          {orderMessages.map((msg, idx) => (
            <div key={idx}>
              <b
                style={{ color: msg.s === sessionUserType ? 'green' : 'gray' }}
              >
                {msg.s === sessionUserType ? 'You' : msg.s} :{' '}
              </b>
              {msg.m}
            </div>
          ))}
        </div>
        <form
          className="standardForm"
          id="messageForm"
          action={async (formData: FormData) => {
            if (!formData.get('send')) return;
            const message = formData.get('message')?.toString() as string;
            await sendMessage({
              order_db_id: orderDetails._id,
              message,
            });
            setOrderMessages((prev: any) => [
              ...prev,
              { s: sessionUserType, t: Date.now(), m: message },
            ]);
            (document.getElementById('messageForm') as any)?.reset();
          }}
        >
          <input type="text" name="message" required />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div
              className="inputBtn"
              style={{
                backgroundColor: 'orange',
                textAlign: 'center',
                flex: 1,
              }}
              onClick={async () =>
                setOrderMessages(
                  await refreshMessages({ order_db_id: orderDetails._id })
                )
              }
            >
              Refresh
            </div>
            <input type="submit" value="Send" name="send" style={{ flex: 1 }} />
          </div>
        </form>
      </div>

      <div style={{ width: '100%' }}>
        <h1 style={{ fontSize: '30px', margin: '30px 0' }}>Actions :</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {orderDetails.order_status === 'CONFIRMED' &&
          sessionUserType === 'SELLER' ? (
            <ActionButton
              bg="lightgreen"
              txt="Dispatched"
              cb={async () => {
                await dispatchOrder({ order_db_id: orderDetails._id });
                setHoverContent(null);
              }}
            />
          ) : null}
          {orderDetails.order_status === 'DISPATCHED' &&
          sessionUserType === 'DISPATCHER' ? (
            <ActionButton
              bg="lightgreen"
              txt="Delivered"
              cb={async () => {
                await setOrderDelivered({ order_db_id: orderDetails._id });
                setHoverContent(null);
              }}
            />
          ) : null}
        </div>
      </div>
      <br />
      <div style={{ color: 'red' }}>
        {orderDetails.reject_reason}
        {orderDetails.calcle_reason}
      </div>
    </div>
  );
}
