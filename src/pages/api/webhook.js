import { buffer } from 'micro';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../permissions.json');

const fulfillOrder = async (session) => {
  console.log('Fulfill order', session);

  const db = admin.firestore();

  try {
    await db
      .collection('users')
      .doc(session.metadata.email)
      .collection('orders')
      .doc(session.id)
      .set({
        amount: session.amount_total / 100,
        amount_shipping: (session.total_details && session.total_details.amount_shipping) / 100 || 30,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

    console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
  } catch (error) {
    console.error(`Error adding order to Firestore for session ${session.id}: ${error.message}`);
    throw error; // Propagate the error for better error handling
  }
};

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.error('Webhook error:', error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fulfillOrder(session)
        .then(() => res.status(200).end())
        .catch((err) => {
          console.error(`Webhook Error: ${err.message}`);
          res.status(400).send(`Webhook Error: ${err.message}`);
        });
    } else {
      console.log(`Unhandled event type: ${event.type}`);
      res.status(200).end();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export const config = {
  api: {
    bodyParser: false, // Not needed for webhooks
    externalResolver: true,
  },
};
