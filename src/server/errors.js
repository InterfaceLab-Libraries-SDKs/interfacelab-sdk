// src/server/errors.js
export class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = "CustomError";
    }
  }

export class PaymentError extends Error {
  constructor(message) {
    super(message);
    this.name = "PaymentError";
  }
}

// OR export it explicitly at the end:
// class PaymentError extends Error { ... }
// export { PaymentError };