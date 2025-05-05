# Interface Lab SDK 🇰🇪

[![Version](https://img.shields.io/npm/v/@interfacelab/sdk)](https://npmjs.com/package/@interfacelab/sdk)
[![License](https://img.shields.io/badge/License-AGPL%203.0%20%26%20Commercial-blue)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/interfacelab/sdk/ci.yml)](https://github.com/interfacelab/sdk/actions)
[![Test Coverage](https://img.shields.io/codecov/c/github/interfacelab/sdk)](https://codecov.io/gh/interfacelab/sdk)

Build compliant forms with Kenyan payment and SMS integrations. Supports M-Pesa, Flutterwave, and Africa's Talking.

## Features ✨

* 📝 **Form Builder** with validation
* 📱 **M-Pesa STK Push** & **Flutterwave** integrations
* 📨 **Africa's Talking SMS** notifications
* 🔐 **JWT Authentication** & rate limiting
* 📊 **Usage Dashboard** with analytics

## Installation ⚙️

```bash
npm install @interfacelab/sdk
```

## Quickstart 🚀

### 1. Form with SMS Notification

```javascript
import { FormBuilder, ATSmsService } from '@interfacelab/sdk';

const formConfig = {
  fields: [
    { name: 'phone', type: 'tel', label: 'M-Pesa Number', required: true },
    { name: 'amount', type: 'number', label: 'Amount (KES)', min: 10 }
  ]
};

function OrderForm() {
  const handleSubmit = async (data) => {
    // Send SMS confirmation
    const sms = new ATSmsService();
    await sms.send({
      to: data.phone,
      message: `Order of KES ${data.amount} received!`
    });
  };

  return <FormBuilder config={formConfig} onSubmit={handleSubmit} />;
}
```

### 2. M-Pesa Payment

```javascript
import { MpesaService } from '@interfacelab/sdk/payment';

const mpesa = new MpesaService({
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  shortCode: process.env.MPESA_SHORTCODE,
  passKey: process.env.MPESA_PASSKEY
});

// Initiate STK Push
const response = await mpesa.stkPush({
  phone: '+254712345678',
  amount: 1000, // KES 10.00
  reference: 'ORDER_123'
});
```

## Monetization 💰

### Pricing Model

| Feature            | Free Tier             | Paid Plan                   |
| ------------------ | --------------------- | --------------------------- |
| SMS Notifications  | 100/month             | \$0.01 per SMS              |
| Payment Processing | 50 transactions/month | 2% + \$0.20 per transaction |
| Support            | Community Forum       | 24/7 Priority Support       |

**Upgrade**: Email [sales@interfacelab.co.ke](mailto:sales@interfacelab.co.ke) for production API keys.

## Advanced Usage 🧠

### Custom Themes

```javascript
import '@interfacelab/sdk/styles/themes/corporate.css';

<FormBuilder theme="corporate" />
```

### Webhooks

```javascript
import { WebhookHandler } from '@interfacelab/sdk';

// M-Pesa callback
WebhookHandler.register('/mpesa-callback', (payload) => {
  console.log('Payment received:', payload);
});
```

## Security 🔒

### Best Practices

#### Validate phone numbers

```javascript
/^\+254[17]\d{8}$/.test(phone); // Valid Kenyan number
```

#### Encrypt sensitive data

```javascript
import { encryptField } from '@interfacelab/sdk/security';
const encrypted = encryptField('password123');
```

* Rotate JWT tokens every 24 hours

## Troubleshooting 🛠️

### Common Errors

| Error Code              | Solution                |
| ----------------------- | ----------------------- |
| `INVALID_MPESA_NUMBER`  | Use +254 prefix format  |
| `AT_SMS_QUOTA_EXCEEDED` | Upgrade SMS plan        |
| `FLW_AUTH_FAILED`       | Verify Flutterwave keys |

## Contributing 🤝

1. Fork the repository
2. Create feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feat/amazing-feature`
5. Open Pull Request

## License 📄

* **Core SDK**: AGPL-3.0
* **Payment Modules**: Commercial License

Need Help? Contact [support@interfacelab.co.ke](mailto:support@interfacelab.co.ke)
<!-- **Developer Docs**: [https://developer.interfacelab.co.ke](https://developer.interfacelab.co.ke) -->
