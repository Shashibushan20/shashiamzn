// pages/api/create-checkout-session.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  // Create a product for each item (assuming unique products)
  const transformedProducts = await Promise.all(items.map(async (item) => {
    const product = await stripe.products.create({
      name: item.title,
      description: item.description,
      images: [item.image],
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(item.price * 100), // Ensure it's an integer amount
      currency: 'usd',
    });

    return {
      name: item.title,
      description: item.description,
      images: [item.image],
      price: price.id,
    };
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_rates: [],
      shipping_address_collection: {
        allowed_countries: ['US', 'IN'],
      },
      line_items: transformedProducts.map((product) => ({
        price: product.price,
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.HOST}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.HOST}/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
};
