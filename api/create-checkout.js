// Vercel Serverless Function — 创建 Stripe Checkout Session
// 路径: POST /api/create-checkout
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 产品映射（与前端 PRODUCTS 数组对应）
const PRODUCT_MAP = {
  1: { name: 'AI财神 · 毛绒挂件款', price: 5900 },   // $59.00 (cents)
  2: { name: 'AI财神 · 树脂摆件款', price: 7900 },   // $79.00
  3: { name: 'AI财神 · 文曲星礼盒', price: 9900 },   // $99.00
  4: { name: 'AI财神 · 金运手办公盒', price: 12900 }, // $129.00
};

module.exports = async (req, res) => {
  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // 构建 Stripe line_items
    const lineItems = items.map(item => {
      const product = PRODUCT_MAP[item.id];
      if (!product) throw new Error(`Invalid product ID: ${item.id}`);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [`https://blingjew.com/products/product${item.id}.jpg`],
            metadata: {
              type: 'caishen-ai-product',
              product_id: String(item.id),
            },
          },
          unit_amount: product.price,
        },
        quantity: item.qty || 1,
      };
    });

    // 创建 Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.BASE_URL || 'https://blingjew.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL || 'https://blingjew.com'}/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'NZ', 'DE', 'FR', 'NL', 'JP', 'KR', 'SG', 'MY', 'TH', 'PH', 'HK', 'TW'],
      },
      metadata: {
        source: 'blingjew.com',
      },
      // 自动发邮件收据
      automatic_tax: { enabled: false },
      customer_creation: 'always',
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });

  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
