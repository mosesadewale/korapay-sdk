import {
  CardAction,
  CardType,
  Country,
  Currency,
  IdentityType,
  MobileMoneyOperator,
  PaymentChannel,
  TransactionStatus,
} from "../enums.ts";

export type Authorization = {
  pin?: string;
  otp?: string;
  avs?: string;
};

/**
 * A representation of a card
 */
export type Card = {
  /**
   * The debit card number.
   */
  number: string;
  /**
   * The card's verification value.
   */
  cvv: string;
  /**
   * The card's expiry month e.g., 08
   */
  expiryMonth: string;
  /**
   * The card's expiry year e.g., 24
   */
  expiryYear: string;
  /**
   * The card owner's name
   */
  name?: string;
  /**
   * The card's pin
   */
  pin?: string;
};

/**
 * A representation of the data sent to korapay to
 * initiate a charge via card
 */
export type ChargeViaCardPayload = {
  /**
   * A unique reference for the payment.
   * The reference must be at least 8 characters long.
   */
  reference: string;
  /**
   * Customer information
   */
  customer: {
    /**
     * The name of your customer.
     */
    name: string;
    /**
     * The email of your customer.
     */
    email: string;
  };
  /**
   * Your customer's card information
   */
  card: Card;
  /**
   * Amount for the charge
   */
  amount: number;
  /**
   * An enum representing the currency for the
   * charge. E.g., `Currency.NGN`
   */
  currency: Currency;
  /**
   * A URL to which we can redirect your customer
   * after their payment is complete.
   */
  redirectUrl?: string;
  /**
   * An object with a maximum of 5 fields/keys for storing additional
   * information. Empty dictionaries are not allowed. Each field name
   * (i.e., dictionary keys) can have a maximum length of 20 characters.
   * Allowed characters: A-Z, a-z, 0-9, and -.
   */
  // deno-lint-ignore no-explicit-any
  metadata?: Record<string, any>;
};

export type AuthorizeCardChargePayload = {
  transactionReference: string;
  authorization: Authorization;
};

/**
 * A representation of the data sent to korapay to initiate a
 * charge via bank transfer
 */
export type ChargeViaBankTransferPayload = {
  /**
   * A unique reference for the payment.
   * The reference must be at least 8 characters long.
   */
  reference: string;
  /**
   * The customer's information
   */
  customer: {
    /**
     * The name of your customer.
     */
    name?: string;
    /**
     * The email of your customer.
     */
    email: string;
  };
  /**
   * The amount for the charge
   */
  amount: number;
  /**
   * An enum representing the currency for the charge.
   * E.g., `Currency.NGN`. Currently, the
   * only supported currency is `Currency.NGN`
   */
  currency: Currency;
  /**
   * The account name that should be displayed
   * when the account number is resolved.
   */
  accountName?: string;
  /**
   * Information/narration about the transaction.
   */
  narration?: string;
  /**
   * A URL to which we can send the webhook
   * notification for the transaction.
   */
  notificationUrl?: string;
  /**
   * This sets who bear the fees of the transaction. If it
   * is set to `True`,the merchant will bear the fee. If
   * it is set to `False`, the customer will bear the fee.
   * By default, it is `False`.
   */
  merchantBearsCost?: string;
  /**
   * An object with a maximum of 5 fields/keys for storing
   * additional information. Empty dictionaries are not allowed.
   * Each field name (i.e., dictionary keys) can have a maximum
   * length of 20 characters. Allowed characters: A-Z, a-z, 0-9, and -.
   */
  // deno-lint-ignore no-explicit-any
  metadata?: Record<string, any>;
};

/**
 * A representation of the data sent to korapay to create a
 * virtual bank account.
 */
export type CreateVirtualBankAccountPayload = {
  /**
   * The name of the Virtual Bank account.
   */
  accountName: string;
  /**
   * Your unique reference to identify a virtual bank account.
   */
  accountReference: string;
  /**
   * This is the bank code of the bank providing the virtual
   * bank account. E.g., `035` is the code for Wema Bank. Use
   * `000` to create a virtual bank account in the sandbox environment.
   */
  bankCode: string;
  /**
   * Customer's information
   */
  customer: {
    /**
     * The customer's name.
     */
    name: string;
    /**
     * The customer's email.
     */
    email?: string;
  };
  /**
   * Know your customer information
   */
  kyc: {
    /**
     * The Bank Verification Number (BVN) of the customer.
     */
    bvn: string;
    /**
     * The National Identity Number (NIN) of your customer.
     */
    nin?: string;
  };
  permanent?: boolean;
};

/**
 * A representation of the data sent to korapay to initiate a
 * charge via mobile money
 */
export type ChargeViaMobileMoneyPayload = {
  /**
   * A unique reference for the payment.
   * The reference must be at least 8 characters long.
   */
  reference: string;
  /**
   * Customer's information
   */
  customer: {
    /**
     * The name of your customer
     */
    name?: string;
    /**
     * The email of your customer
     */
    email: string;
  };
  /**
   * The amount for the charge
   */
  amount: number;
  /**
   * mobile money information
   */
  mobileMoney: {
    /**
     * The mobile number of the customer to be charged e.g., 254700000000.
     */
    number: number;
  };
  /**
   * An enum representing the currency the payment should be made in e.g., `Currency.KES`.
   */
  currency: Currency;
  /**
   * The webhook URL to be called when the transaction is complete.
   */
  notificationUrl?: string;
  /**
   * A URL to which we can redirect your customer after their payment is complete.
   */
  redirectUrl?: string;
  /**
   * This sets who bear the fees of the transaction. If it is set to `True`,
   * the merchant will bear the fee. If it is set to `False`, the customer will bear the fee.
   * By default, it is `False`.
   */
  merchantBearsCost?: boolean;
  /**
   * Information/narration about the transaction.
   */
  description?: string;
  /**
   * An object with a maximum of 5 fields/keys for storing additional information.
   * Empty dictionaries are not allowed. Each field name (i.e., dictionary keys) can have a
   * maximum length of 20 characters. Allowed characters: A-Z, a-z, 0-9, and -.
   */
  // deno-lint-ignore no-explicit-any
  metadata?: Record<string, any>;
};

/**
 * A representation of the data sent to korapay to
 * initiate a charge
 */
export type InitiateChargePayload = {
  /**
   * Your transaction reference. Must be unique for every transaction.
   */
  reference: string;
  /**
   * The amount to charge the customer.
   */
  amount: number;
  /**
   * An enum representing the currency to charge the
   * customer in. E.g., `Currency.GHS`.
   */
  currency: Currency;
  /**
   * The description of the transaction.
   */
  narration: string;
  /**
   * The webhook URL to be called when the transaction is complete.
   */
  notificationUrl: string;
  /**
   * Customer's information
   */
  customer: {
    /**
     * The customer's name
     */
    name?: string;
    /**
     * The customer's email
     */
    email: string;
  };
  /**
   * An array of `PaymentChannel` enum representing the payment channels
   * you want to support for accepting the payments. E.g.,
   * `[PaymentChannel.CARD, PaymentChannel.BANK_TRANSFER]`
   */
  channels?: PaymentChannel[];
  /**
   * A enum representing the preferred payment channel when multiple
   * payment channels are supported. E.g., `PaymentChannel.MOBILE_MONEY`
   */
  defaultChannel?: PaymentChannel;
  /**
   * The URL to redirect your customer when the transaction is complete.
   */
  redirectUrl?: string;
};

/**
 * A representation of the data sent to korapay to initiate a
 * charge via direct bank debit
 */
export type ChargeViaDirectBankDebit = {
  /**
   * The amount of money to be debited. The Minimum is NGN 200.00.
   */
  amount: number;
  /**
   * The currency of the transaction.
   */
  currency: Currency;
  /**
   * A unique reference for the payment. This reference must be at least 8 characters long.
   */
  reference: string;
  /**
   * The unique code for each supported bank. Please refer to the bank codes table below.
   * https://developers.korapay.com/docs/pay-with-bank-direct-debit#bank-codes-ngn
   * You can only pass bank codes for the banks that have been enabled for your account.
   */
  bankCode: string;
  /**
   * The URL redirected to after transaction is completed.
   */
  redirectUrl?: string;
  /**
   * The customer to charge
   */
  customer: {
    /**
     * The name of your customer.
     */
    name: string;
    /**
     * The email of your customer.
     */
    email: string;
  };
  /**
   * Information/narration about the transaction.
   */
  narration?: string;
  /**
   * This sets who bear the fees of the transaction. If it is set to true, the merchant will bear the fee.
   * If it is set to false, the customer will bear the fee. By default, it is set to false.
   */
  merchantBearsCost?: boolean;
  notificationUrl?: string;
  /**
   * An object with a maximum of 5 fields/keys for storing additional information.
   * Empty dictionaries are not allowed. Each field name (i.e., dictionary keys) can have a
   * maximum length of 20 characters. Allowed characters: A-Z, a-z, 0-9, and -.
   */
  // deno-lint-ignore no-explicit-any
  metadata?: Record<string, any>;
};

/**
 * A representation of query parameters accepted by get payins.
 */
export type GetPayinsQueryParams = {
  limit?: number;
  currency?: Currency;
  endingBefore?: string;
  startingBefore?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type InitiateRefundPayload = {
  amount?: number;
  paymentReference: string;
  reference: string;
  reason?: string;
  webhookUrl?: string;
};

/**
 * A representation of query parameters accepted by get refund history.
 */
export type GetRefundHistoryQueryParams = {
  limit?: number;
  currency?: Currency;
  endingBefore?: string;
  startingBefore?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
};

/**
 * A representation of the data sent to korapay to initiate a payout
 * to bank account
 */
export type PayoutToBankAccountPayload = {
  /**
   * Unique transaction reference.
   */
  reference: string;
  /**
   * The transaction amount.
   */
  amount: number;
  /**
   * A enum representing the currency to disburse in. E.g., `Currency.NGN`
   */
  currency: Currency;
  /**
   * The Recipient bank code. Bank_codes on testmode with Test keys to simulate
   * a successful transaction are 044, 033, 058 i.e., Access, UBA and GTB respectively,
   * other banks would simulate a failed transaction on testmode with testkeys.
   */
  bankCode: string;
  /**
   * The recipient's account number.
   */
  accountNumber: string;
  /**
   * Customer's information
   */
  customer: {
    /** The customer's name */
    name?: string;
    /** The customer's email */
    email: string;
  };
  /**
   * The transaction's narration or description.
   */
  narration: string;
};

/**
 * A representation of the data sent to korapay to initiate a
 * payout to mobile money.
 */
export type PayoutToMobileMoneyPayload = {
  /**
   * Unique transaction reference.
   */
  reference: string;
  destination: {
    type: "mobile_money";
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * A enum representing the currency to disburse in. E.g., `Currency.NGN`
     */
    currency: Currency;
    mobileMoney: {
      /**
       * An enum or str representing the mobile money operator. E.g.,
       * MobileMoneyOperator.AIRTEL_KENYA`.
       */
      operator: MobileMoneyOperator;
      /**
       * The recipient's mobile money number.
       */
      mobileNumber: string;
    };
    /**
     * The transaction's narration or description.
     */
    narration?: string;
    /**
     * customer information
     */
    customer: {
      /**
       * customer's name
       */
      name?: string;
      /**
       * customer's email
       */
      email: string;
    };
  };
};

export type RemitToBankAccountPayload = {
  reference: string;
  destination: {
    type: "bank_account";
    amount: number;
    currency: Currency;
    narration?: string;
    bankAccount: {
      bank: string;
      account: string;
    };
    customer: {
      name?: string;
      email: string;
    };
  };
  remittanceData: {
    senderName: string;
    senderPhoneNumber?: string;
    senderDob?: string;
    senderCountryIso?: Country;
    senderNationality?: string;
    senderIdType?: string;
    senderIdNumber?: string;
    senderServiceProviderName?: string;
    remittancePurpose?: string;
    senderRecipientRelationship?: string;
    sourceOfFunds?: string;
    senderOccupation?: string;
  };
};

export type RemitToMobileMoneyPayload = {
  reference: string;
  destination: {
    type: "mobile_money";
    amount: number;
    currency: Currency;
    narration?: string;
    mobileMoney: {
      operator: MobileMoneyOperator;
      mobileNumber: string;
    };
    customer: {
      name?: string;
      email: string;
    };
  };
  remittanceData: {
    senderName: string;
    senderPhoneNumber?: string;
    senderDob?: string;
    senderCountryIso?: Country;
    senderNationality?: string;
    senderIdType: string;
    senderIdNumber?: string;
    senderServiceProviderName?: string;
    remittancePurpose?: string;
    senderRecipientRelationship?: string;
    sourceOfFunds?: string;
    senderOccupation?: string;
  };
};

export type PayoutOrder = {
  reference: string;
  amount: number;
  bankAccount: {
    bankCode: string;
    accountNumber: string;
  };
  customer: {
    name?: string;
    email: string;
  };
  narration?: string;
  type: "bank_account";
};

/**
 * A model representation of the data sent to korapay to initiate
 * a bulk payout to multiple bank accounts
 */
export type BulkPayoutToBankAccountPayload = {
  /**
   * A reference used to identify the batch.
   */
  batchReference: string;
  /**
   * A narration for the batch.
   */
  description: string;
  /**
   * This sets who bear the fees of the transaction. If it is set to `True`
   * the merchant will bear the fee. If it is set to `False`, the customer will bear the fee.
   * By default, it is `False`.
   */
  merchantBearsCost: boolean;
  /**
   * A enum representing the currency to disburse in. E.g., `Currency.NGN`
   */
  currency: Currency;
  /**
   * An array of `PayoutOrder` which is an objet representing individual recipient
   * information in the bulk payout.
   */
  payouts: PayoutOrder[];
};

export type GetPayoutsQueryParams = {
  limit?: number;
  endingBefore?: string;
  startingAfter?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type GetBalanceHistoryQueryParams = {
  currency?: Currency;
  direction?: string;
  limit?: number;
  endingBefore?: string;
  startingAfter?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type InitiateRateConversionPayload = {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  reference: string;
};

export type CompleteRateConversionPayload = {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  rateReference: string;
  customerName: string;
  customerEmail?: string;
  narration?: string;
};

export type GetRateConversionsQueryParams = {
  page?: number;
  limit?: number;
};

export type CreateCardPayload = {
  currency: Currency;
  cardHolderReference: string;
  reference: string;
  type: "virtual";
  brand?: CardType;
  amount: number;
};

export type FundCardPayload = {
  reference: string;
  amount: number;
  description?: string;
};

export type WithdrawFromCardPayload = FundCardPayload;

export type UpdateCardStatusPayload = {
  action: CardAction;
  reason: string;
};

export type CreateCardHolderPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  countryIdentity: {
    type: "bvn" | "national_id";
    number: string;
    country: Country;
  };
  address: {
    street: string;
    street2?: string;
    city: string;
    state: string;
    country: Country;
    zipCode: string;
  };
  identity: {
    type: IdentityType;
    number: string;
    image: string;
    country: Country;
  };
};

export type GetCardTransactionsQueryParams = {
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
  type?: string;
};

/**
 * A representation of the response returned as a result of
 * making a request to korapay
 */
export type KorapayResponse<T> = {
  /**
   * The HTTP status code of the response
   */
  statusCode: number;
  /**
   * The status fo the response
   */
  status: boolean;
  /**
   * The message of the response
   */
  message: string;
  /**
   * The code of the response if there is an error
   */
  code?: string;
  /**
   * The data returned in the response
   */
  data: T;
};
