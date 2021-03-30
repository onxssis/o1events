import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentVerificationFailedException extends HttpException {
  protected _transactionDetails: Record<string, any>;

  constructor({ message = 'Payment Verification Failed', transactionDetails }) {
    super(message, HttpStatus.BAD_REQUEST);
    this._transactionDetails = transactionDetails;
  }

  get transactionDetails() {
    return this._transactionDetails;
  }
}
