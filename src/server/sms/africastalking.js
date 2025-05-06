import AfricasTalking from 'africastalking';

export class ATSmsService {
  constructor(apiKey, username) {
    this.sms = AfricasTalking({
      apiKey,
      username
    }).SMS;
  }

  async send({ to, message }) {
    return this.sms.send({
      to,
      message,
      enqueue: true
    });
  }
}