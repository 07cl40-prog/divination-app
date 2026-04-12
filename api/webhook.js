// Vercel Serverless Function — Stripe Webhook
// 路径: POST /api/webhook
// Stripe 回调通知：确认付款成功、发货等事件
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 临时日志（正式环境可替换为数据库）
// 注意：Vercel Serverless 是无状态的，生产环境建议接入数据库

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  // 验证 webhook 签名（防止伪造请求）
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // 开发环境无密钥时直接解析
      event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 处理事件
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('✅ 付款成功!', {
        sessionId: session.id,
        email: session.customer_details?.email,
        amount: session.amount_total / 100,
        currency: session.currency,
        shipping: session.shipping_details?.address,
      });
      // TODO: 在这里接入你的业务逻辑
      // - 发送确认邮件
      // - 创建订单记录
      // - 通知仓库发货
      break;
    }

    case 'payment_intent.succeeded': {
      const payment = event.data.object;
      console.log('💰 支付到账:', payment.amount / 100, payment.currency);
      break;
    }

    case 'payment_intent.payment_failed': {
      const payment = event.data.object;
      console.log('❌ 支付失败:', payment.id, payment.last_payment_error?.message);
      break;
    }

    default:
      console.log('Unhandled event type:', event.type);
  }

  return res.status(200).json({ received: true });
};
