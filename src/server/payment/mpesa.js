import axios from 'axios';
import { PaymentError } from '../errors.js';

export class MpesaService {
  constructor(consumerKey, consumerSecret, shortcode, passkey) {
    this.config = { consumerKey, consumerSecret, shortcode, passkey };
    this.authToken = null;
  }

  async authenticate() {
    const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString('base64');
    try {
      const response = await axios.get(
        'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        { headers: { Authorization: `Basic ${auth}` } 
      );
      this.authToken = response.data.access_token;
    } catch (error) {
      throw new PaymentError('M-Pesa authentication failed', 'MPESA_AUTH_ERROR');
    }
  }

  async stkPush(phone, amount) {
    if (!this.authToken) await this.authenticate();
    
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, -3);
      
    const password = Buffer.from(
      `${this.config.shortcode}${this.config.passkey}${timestamp}`
    ).toString('base64');

    try {
      const response = await axios.post(
        'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
          BusinessShortCode: this.config.shortcode,
          Password: password,
          Timestamp: timestamp,
          Amount: amount,
          PartyA: phone,
          PartyB: this.config.shortcode,
          PhoneNumber: phone,
          CallBackURL: `${process.env.API_BASE}/mpesa-callback`,
          AccountReference: 'INTERFACELAB',
          TransactionDesc: 'Payment via Interface Lab'
        },
        { headers: { Authorization: `Bearer ${this.authToken}` } }
      );
      
      return response.data;
    } catch (error) {
      throw new PaymentError('M-Pesa payment failed', 'MPESA_PAYMENT_ERROR');
    }
  }
}
