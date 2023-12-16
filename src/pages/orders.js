// Orders.js

import React from 'react';
import Header from '../components/Header';
import { getSession, useSession } from 'next-auth/react';
import db from '../../firebase';
import moment from 'moment';
import Order from '../components/Order';

function Orders({ orders }) {
  const { data: session } = useSession();
  console.log('Orders:', orders);

  return (
    <div>
      <Header />
      <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
        {session ? (
          orders ? (
            <>
              <h2>{orders.length} orders</h2>
              <div className='mt-5 space-y-4'>
                {orders?.map(({ id, amount, items, timestamp, images }) => (
                  <Order
                    key={id}
                    id={id}
                    amount={amount}
                    items={items}
                    timestamp={timestamp}
                    images={images}
                  />
                ))}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
      </main>
    </div>
  );
}

export default Orders;

// getServerSideProps function

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  // Get the user logged-in credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  try {
    // Firebase DB
    const stripeOrders = await db
      .collection('users')
      .doc(session.user.email)
      .collection('orders')
      .orderBy('timestamp', 'desc')
      .get();

    // Stripe orders
    const orders = await Promise.all(
      stripeOrders.docs.map(async (order) => {
        const orderData = order.data();
        const timestamp =
          orderData.timestamp && orderData.timestamp.toDate()
            ? moment(orderData.timestamp.toDate()).unix()
            : null;

        console.log('Order:', order.id, 'Images:', orderData.images);

        return {
          id: order.id,
          amount: orderData.amount,
          images: orderData.images,
          timestamp: timestamp,
          items: orderData.items || [],
        };
      })
    );

    return {
      props: {
        orders,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);

    return {
      props: {
        error: 'Error fetching data',
      },
    };
  }
}
