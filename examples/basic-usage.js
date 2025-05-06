import { MpesaService } from '../src/server/payment/mpesa.js';
import { ATSmsService } from '../src/server/sms/africastalking.js';

// Initialize services
const mpesa = new MpesaService(
  process.env.MPESA_CONSUMER_KEY,
  process.env.MPESA_CONSUMER_SECRET,
  process.env.MPESA_SHORTCODE,
  process.env.MPESA_PASSKEY
);

const sms = new ATSmsService(
  process.env.AT_API_KEY,
  process.env.AT_USERNAME
);

// Process payment
async function processOrder(phone, amount) {
  try {
    const payment = await mpesa.stkPush(phone, amount, 'ORDER_123');
    await sms.send({
      to: phone,
      message: `Payment of KES ${amount} received!`
    });
    return payment.data;
  } catch (error) {
    console.error('Payment failed:', error);
  }
}