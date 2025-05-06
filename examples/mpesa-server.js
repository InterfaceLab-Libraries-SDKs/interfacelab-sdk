import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MpesaService } from '../src/server/payment/mpesa.js';
import { PaymentError } from '../src/server/errors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize MPesa Service
const mpesa = new MpesaService({
    consumerKey: 'your_consumer_key',
    consumerSecret: 'your_consumer_secret',
    businessShortCode: 'your_business_shortcode',
    lipaNaMpesaPasskey: 'your_passkey'
});

// Payment Endpoint
app.post('/initiate-payment', async (req, res) => {
    try {
        const { phone, amount } = req.body;
        
        const stkPushResponse = await mpesa.initiateSTKPush({
            phoneNumber: phone,
            amount: amount,
            callbackURL: 'https://your-domain.com/callback'
        });

        res.json({
            message: 'Payment initiated successfully',
            transactionId: stkPushResponse.CheckoutRequestID
        });
        
    } catch (error) {
        if (error instanceof PaymentError) {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Server Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});