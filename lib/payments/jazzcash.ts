import crypto from 'crypto';

interface JazzCashConfig {
  merchantId: string;
  password: string;
  integritySalt: string;
  returnUrl: string;
}

interface JazzCashPaymentParams {
  amount: number;
  billReference: string;
  description: string;
  customerEmail?: string;
  customerMobile?: string;
}

export class JazzCashPayment {
  private config: JazzCashConfig;

  constructor() {
    this.config = {
      merchantId: process.env.JAZZCASH_MERCHANT_ID || '',
      password: process.env.JAZZCASH_PASSWORD || '',
      integritySalt: process.env.JAZZCASH_INTEGRITY_SALT || '',
      returnUrl: process.env.JAZZCASH_RETURN_URL || '',
    };
  }

  /**
   * Generate secure hash for JazzCash transaction
   */
  private generateHash(data: Record<string, string>): string {
    // Sort keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Create hash string
    let hashString = this.config.integritySalt + '&';
    sortedKeys.forEach(key => {
      if (data[key] !== '' && data[key] !== undefined) {
        hashString += data[key] + '&';
      }
    });
    hashString = hashString.slice(0, -1); // Remove last &

    // Generate SHA256 hash
    return crypto
      .createHmac('sha256', this.config.integritySalt)
      .update(hashString)
      .digest('hex')
      .toUpperCase();
  }

  /**
   * Create payment request for JazzCash
   */
  createPaymentRequest(params: JazzCashPaymentParams) {
    const txnDateTime = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const txnExpiryDateTime = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14);

    const paymentData = {
      pp_Version: '1.1',
      pp_TxnType: 'MWALLET',
      pp_Language: 'EN',
      pp_MerchantID: this.config.merchantId,
      pp_SubMerchantID: '',
      pp_Password: this.config.password,
      pp_BankID: 'TBANK',
      pp_ProductID: 'RETL',
      pp_TxnRefNo: params.billReference,
      pp_Amount: (params.amount * 100).toString(), // Amount in paisa
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: txnDateTime,
      pp_BillReference: params.billReference,
      pp_Description: params.description,
      pp_TxnExpiryDateTime: txnExpiryDateTime,
      pp_ReturnURL: this.config.returnUrl,
      pp_SecureHash: '',
      ppmpf_1: params.customerEmail || '',
      ppmpf_2: params.customerMobile || '',
      ppmpf_3: '',
      ppmpf_4: '',
      ppmpf_5: '',
    };

    // Generate secure hash
    paymentData.pp_SecureHash = this.generateHash(paymentData);

    return {
      url: 'https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/',
      // For sandbox testing:
      // url: 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/',
      data: paymentData,
    };
  }

  /**
   * Verify callback from JazzCash
   */
  verifyCallback(callbackData: Record<string, string>): {
    isValid: boolean;
    isSuccess: boolean;
    transactionId: string;
    amount: number;
  } {
    const receivedHash = callbackData.pp_SecureHash;
    delete callbackData.pp_SecureHash;

    const calculatedHash = this.generateHash(callbackData);

    const isValid = receivedHash === calculatedHash;
    const isSuccess = callbackData.pp_ResponseCode === '000'; // 000 = Success

    return {
      isValid,
      isSuccess,
      transactionId: callbackData.pp_TxnRefNo,
      amount: parseInt(callbackData.pp_Amount) / 100, // Convert paisa to PKR
    };
  }
}
