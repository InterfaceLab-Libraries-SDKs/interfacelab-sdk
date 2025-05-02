# Interface Lab SDK 🇰🇪

[![Version](https://img.shields.io/npm/v/@interfacelab/sdk)](https://npmjs.com/package/@interfacelab/sdk)
[![License](https://img.shields.io/badge/License-AGPL%203.0%20%26%20Commercial-blue)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/interfacelab/sdk/ci.yml)](https://github.com/interfacelab/sdk/actions)
[![Test Coverage](https://img.shields.io/codecov/c/github/interfacelab/sdk)](https://codecov.io/gh/interfacelab/sdk)

Build compliant forms with Kenyan payment and SMS integrations. Supports M-Pesa, Flutterwave, and Africa's Talking.

## Features ✨

- 📝 **Form Builder** with validation
- 📱 **M-Pesa STK Push** & **Flutterwave** integrations
- 📨 **Africa's Talking SMS** notifications
- 🔐 **JWT Authentication** & rate limiting
- 📊 **Usage Dashboard** with analytics

## Installation ⚙️

```bash
npm install @interfacelab/sdk

Configuration 🔑


Create .env file:
# M-Pesa (From Safaricom Developer Portal)
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=123456
MPESA_PASSKEY=your_passkey

# Flutterwave (From Dashboard)
FLW_PUBLIC_KEY=FLWPUBK-XXXX
FLW_SECRET_KEY=FLWSECK-XXXX

# Africa's Talking
AT_API_KEY=your_api_key
AT_USERNAME=interfacelab

Quickstart 🚀

1. Form with SMS Notification
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



