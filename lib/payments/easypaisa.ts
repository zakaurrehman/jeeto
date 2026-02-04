import crypto from 'crypto';

interface EasyPaisaConfig {
  storeId: string;
  hashKey: string;
  callbackUrl: string;
}

interface EasyPaisaPaymentParams {
  amount: number;
  orderId: string;
  description: string;
  customerEmail?: string;
  customerMobile?: string;
}

export class EasyPaisaPayment {
  private config: EasyPaisaConfig;

  constructor() {
    this.config = {
      storeId: process.env.EASYPAISA_STORE_ID || '',
      hashKey: process.env.EASYPAISA_HASH_KEY || '',
      callbackUrl: process.env.EASYPAISA_CALLBACK_URL || '',
    };
  }

  /**
   * Generate HMAC hash for EasyPaisa transaction
   */
  private generateHash(data: string): string {
    return crypto
      .createHmac('sha256', this.config.hashKey)
      .update(data)
      .digest('hex');
  }

  /**
   * Create payment request for EasyPaisa
   */
  createPaymentRequest(params: EasyPaisaPaymentParams) {
    const amount = params.amount.toFixed(2);
    const timestamp = Date.now().toString();

    // Create hash string: amount + orderId + storeId
    const hashString = `${amount}${params.orderId}${this.config.storeId}`;
    const hash = this.generateHash(hashString);

    const paymentData = {
      storeId: this.config.storeId,
      amount: amount,
      orderId: params.orderId,
      transactionType: 'MA', // Mobile Account
      emailAddress: params.customerEmail || '',
      mobileAccountNo: params.customerMobile || '',
      merchantHashedReq: hash,
      postBackURL: this.config.callbackUrl,
      orderRefNum: params.orderId,
    };

    return {
      // Production URL
      url: 'https://easypaystg.easypaisa.com.pk/easypay/Index.jsf',
      // For testing, use staging:
      // url: 'https://easypaystg.easypaisa.com.pk/easypay/Index.jsf',
      data: paymentData,
    };
  }

  /**
   * Verify callback from EasyPaisa
   */
  verifyCallback(callbackData: Record<string, string>): {
    isValid: boolean;
    isSuccess: boolean;
    transactionId: string;
    amount: number;
  } {
    const receivedHash = callbackData.merchantHashedResp;

    // Recreate hash: orderId + amount + responseCode
    const hashString = `${callbackData.orderId}${callbackData.amount}${callbackData.responseCode}`;
    const calculatedHash = this.generateHash(hashString);

    const isValid = receivedHash === calculatedHash;
    const isSuccess = callbackData.responseCode === '0000'; // 0000 = Success

    return {
      isValid,
      isSuccess,
      transactionId: callbackData.orderId,
      amount: parseFloat(callbackData.amount),
    };
  }

  /**
   * Inquire transaction status
   */
  async inquireTransaction(orderId: string) {
    const hashString = `${orderId}${this.config.storeId}`;
    const hash = this.generateHash(hashString);

    const inquiryData = {
      orderId,
      storeId: this.config.storeId,
      merchantHashedReq: hash,
    };

    // In production, you would make HTTP request to EasyPaisa inquiry API
    // For now, return the structure
    return {
      url: 'https://easypaystg.easypaisa.com.pk/easypay/Inquire.jsf',
      data: inquiryData,
    };
  }
}
