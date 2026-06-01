// deno-lint-ignore-file no-explicit-any
import { type Country, type Currency, HTTPMethod } from "./enums.ts";
import RestClient from "./restClient.ts";
import type {
  AuthorizeCardChargePayload,
  BulkPayoutToBankAccountPayload,
  ChargeViaBankTransferPayload,
  ChargeViaCardPayload,
  ChargeViaDirectBankDebit,
  ChargeViaMobileMoneyPayload,
  CompleteRateConversionPayload,
  CreateCardHolderPayload,
  CreateCardPayload,
  CreateVirtualBankAccountPayload,
  FundCardPayload,
  GetBalanceHistoryQueryParams,
  GetCardTransactionsQueryParams,
  GetPayinsQueryParams,
  GetPayoutsQueryParams,
  GetRateConversionsQueryParams,
  GetRefundHistoryQueryParams,
  InitiateChargePayload,
  InitiateRateConversionPayload,
  InitiateRefundPayload,
  KorapayResponse,
  PayoutToBankAccountPayload,
  PayoutToMobileMoneyPayload,
  RemitToBankAccountPayload,
  RemitToMobileMoneyPayload,
  UpdateCardStatusPayload,
  WithdrawFromCardPayload,
} from "./types/global.ts";
import type {
  Balance,
  Bank,
  BankAccount,
  BankCharge,
  BulkPayout,
  BulkPayoutTransaction,
  CardFund,
  CardHolder,
  CardWithdrawal,
  Charge,
  ChargeViaBankTransferData,
  CompleteCurrencyConversionData,
  CreateCardData,
  ExchangeRate,
  GetBalanceHistoryData,
  GetCardData,
  GetCardsData,
  GetCardTransactionsData,
  GetPayinsData,
  GetPayoutsData,
  GetPayoutsInBulkPayoutToBankAccountData,
  GetRateConversionsData,
  GetRefundHistoryData,
  GetVirtualBankAccountTransactionData,
  InitiateChargeData,
  InitiateCurrencyConversionData,
  MMO,
  MobileMoneyCharge,
  Payout,
  Refund,
  RefundDetail,
  ResendCardOtpData,
  UnifiedCharge,
  VirtualBankAccount,
} from "./types/responseModels.ts";

const SECRET_KEY_PREFIX = "sk_test_";

const PACKAGE_DEV_MODE_MESSAGE = `
💪🏽 "Korapay Integration powered by @gray-adeyi/korapay-sdk 0.3.0"🔥

Need more guide on how to use this package?
See api reference at https://jsr.io/@gray-adeyi/korapay-sdk/doc/~/KorapayClient

Found a bug?
Create an issue for it at https://github.com/gray-adeyi/korapay-sdk/issues

If this project is useful to you or your company, please consider sponsoring the project by
- 🧑🏻‍🤝‍🧑 Sharing it with your developer friends
- ✨ Starring it on github at https://github.com/gray-adeyi/korapay-sdk
- 💻 Contribute to it at https://github.com/gray-adeyi/korapay-sdk
- ☕ Buy me a coffee at https://buymeacoffee.com/jigani 

Note: This message only appears in dev mode. 
Set "disablePackageDevModeMessage" flag to true on instantiation
of KorapayClient to stop seeing this message.
`;

/**
 * A class for interfacing with Korapay API in your JS/TS project.
 */
export default class KorapayClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a KorapayClient.
   *
   * @remarks When no params are passed in, the client will attempt to load the
   * publicKey, secretKey, and encryptionKey via their respective default
   * environmental variable name.  'KORAPAY_PUBLIC_KEY','KORAPAY_SECRET_KEY'
   * and 'KORAPAY_ENCRYPTION_KEY', If a client is passed in, the publicKey,
   * and secretKey are ignored
   *
   * @param publicKey - Your korapay integration public key. Omit if
   * 'KORAPAY_PUBLIC_KEY' is set in your environmental variables.
   * @param secretKey - Your korapay integration secret key. Omit if
   * 'KORAPAY_SECRET_KEY' is set in your environmental variables.
   * @param encryptionKey - Your korapay integration key. Omit if
   * 'KORAPAY_ENCRYPTION_KEY' is set in your environmental variables.
   * @param client - A custom {@link RestClient} to use for making request to korapay.
   */
  constructor(
    publicKey?: string,
    secretKey?: string,
    encryptionKey?: string,
    client?: RestClient,
    disablePackageDevModeMessage = false,
  ) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(publicKey, secretKey, encryptionKey);
    }
    this.showPackageMessage(disablePackageDevModeMessage, secretKey);
  }

  /**
   * Accept debit card payments.
   *
   * @param payload - {@link ChargeViaCardPayload} is the data sent to korapay.
   *
   * @returns A promise containing a {@link KorapayResponse}
   */
  async chargeViaCard(
    payload: ChargeViaCardPayload,
  ): Promise<KorapayResponse<Charge>> {
    const chargeData = await this.client.encryptData(payload);
    return await this.client.call(
      "/merchant/api/v1/charges/card",
      HTTPMethod.POST,
      { chargeData },
    );
  }

  /**
   * Authorize a pending charge on a debit card.
   *
   * @param payload {@link AuthorizeCardChargePayload} is the data sent to korapay
   *  to authorize a charge
   * @returns A promise containing a {@link KorapayResponse}
   */
  authorizeCardCharge(
    payload: AuthorizeCardChargePayload,
  ): Promise<KorapayResponse<Charge>> {
    return this.client.call(
      "/merchant/api/v1/charges/card/authorize",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Resend one time password/pin for pending transaction.
   *
   * @param transactionReference The reference to the pending charge
   * returned as a response by korapay when the charge was initiated.
   * @returns A promise containing a {@link KorapayResponse}
   */
  resendCardOtp(
    transactionReference: string,
  ): Promise<KorapayResponse<ResendCardOtpData>> {
    return this.client.call(
      "/merchant/api/v1/charges/card/resend-otp",
      HTTPMethod.POST,
      { transactionReference },
    );
  }

  /**
   * Accept payments via bank transfers.
   *
   * @param payload {@link ChargeViaBankTransferPayload} is the data sent to korapay
   * to initiate a charge via bank transfer
   * @returns A promise containing a {@link KorapayResponse}
   */
  chargeViaBankTransfer(
    payload: ChargeViaBankTransferPayload,
  ): Promise<KorapayResponse<ChargeViaBankTransferData>> {
    return this.client.call(
      "/merchant/api/v1/charges/bank-transfer",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Create a virtual bank account.
   *
   * @param payload {@link CreateVirtualBankAccountPayload} is the data sent to korapay to
   * create a virtual bank account.
   * @returns A promise containing a {@link KorapayResponse}
   */
  createVirtualBankAccount(
    payload: CreateVirtualBankAccountPayload,
  ): Promise<KorapayResponse<VirtualBankAccount>> {
    return this.client.call(
      "/merchant/api/v1/virtual-bank-account",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Retrieve a virtual bank account.
   *
   * @param accountReference Your unique reference for the virtual bank account.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getVirtualBankAccount(
    accountReference: string,
  ): Promise<KorapayResponse<VirtualBankAccount>> {
    return this.client.call(
      `/merchant/api/v1/virtual-bank-account/${accountReference}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Retrieve transactions associated with a virtual bank account.
   *
   * @param accountNumber The account number of the virtual account.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getVirtualBankAccountTransactions(
    accountNumber: string,
  ): Promise<KorapayResponse<GetVirtualBankAccountTransactionData>> {
    return this.client.call(
      `/merchant/api/v1/virtual-bank-account/transactions?account_number=${accountNumber}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Create a virtual bank account for testing/development.
   *
   * @param accountNumber This is the account number of the Fixed Virtual Bank Account.
   * @param amount This is the amount you want to credit to the account. The minimum
   * amount is NGN 100, and the maximum amount is NGN 10,000,000.
   * @param currency An enum representing the currency for the account. Only `Currency.NGN` is accepted
   * for now.
   * @returns A promise containing a {@link KorapayResponse}
   */
  creditSandboxVirtualBankAccount(
    accountNumber: string,
    amount: number,
    currency: Currency,
  ): Promise<KorapayResponse<null>> {
    return this.client.call(
      "/merchant/api/v1/virtual-bank-account/sandbox/credit",
      HTTPMethod.POST,
      { accountNumber, amount, currency },
    );
  }

  /**
   * Accept payments via mobile money.
   *
   * @param payload {@link ChargeViaMobileMoneyPayload} is the data sent to korapay to
   * initiate a charge via mobile money
   * @returns A promise containing a {@link KorapayResponse}
   */
  chargeViaMobileMoney(
    payload: ChargeViaMobileMoneyPayload,
  ): Promise<KorapayResponse<MobileMoneyCharge>> {
    return this.client.call(
      "/merchant/api/v1/charges/mobile-money",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Authorize a payment via mobile money
   *
   * @param reference The reference to the transaction.
   * @param token the otp or token from the customer.
   * @returns A promise containing a {@link KorapayResponse}
   */
  authorizeMobileMoneyCharge(
    reference: string,
    token: string,
  ): Promise<KorapayResponse<MobileMoneyCharge>> {
    return this.client.call(
      "/merchant/api/v1/charges/mobile-money/authorize",
      HTTPMethod.POST,
      { reference, token },
    );
  }

  /**
   * Resend one time password/pin for a pending mobile money transaction.
   *
   * @param transactionReference The reference of the pending transaction.
   * @returns A promise containing a {@link KorapayResponse}
   */
  resendMobileMoneyOtp(
    transactionReference: string,
  ): Promise<KorapayResponse<null>> {
    return this.client.call(
      "/merchant/api/v1/charges/mobile-money/resend-otp",
      HTTPMethod.POST,
      { transactionReference },
    );
  }

  /**
   * Resend SKT prompt.
   *
   * @param transactionReference The reference of the pending transaction.
   * @returns A promise containing a {@link KorapayResponse}
   */
  resendSkt(transactionReference: string): Promise<KorapayResponse<null>> {
    return this.client.call(
      "/merchant/api/v1/charges/mobile-money/resend-stk",
      HTTPMethod.POST,
      { transactionReference },
    );
  }

  /**
   * Authorize SKT prompts in testing/development
   *
   * @param reference The reference of the pending transaction.
   * @param pin The simulated customer's pin
   * @returns A promise containing a {@link KorapayResponse}
   */
  authorizeSkt(
    reference: string,
    pin: string,
  ): Promise<KorapayResponse<MobileMoneyCharge>> {
    return this.client.call(
      "/merchant/api/v1/charges/mobile-money/sandbox/authorize-stk",
      HTTPMethod.POST,
      { reference, pin },
    );
  }

  /**
   * Initiate a charge on your customer supporting multiple payment channels
   *
   * @param payload {@link InitiateChargePayload} is the data sent to korapay to
   * initiate a charge.
   * @returns A promise containing a {@link KorapayResponse}
   */
  initiateCharge(
    payload: InitiateChargePayload,
  ): Promise<KorapayResponse<InitiateChargeData>> {
    return this.client.call(
      "/merchant/api/v1/charges/initialize",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   *  Initiate a Pay With Bank for direct debit collections for your customers.
   *
   * @param payload {@link ChargeViaDirectBankDebit} is the data sent to korapay
   * @returns A promise containing a {@link KorapayResponse}
   */
  chargeViaDirectBankDebit(
    payload: ChargeViaDirectBankDebit,
  ): Promise<KorapayResponse<BankCharge>> {
    return this.client.call(
      "/merchant/api/v1/charge/pay-with-bank",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Retrieve a charge.
   *
   * @param reference The reference of the charge.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getCharge(reference: string): Promise<KorapayResponse<UnifiedCharge>> {
    return this.client.call(
      `/merchant/api/v1/charges/${reference}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Retrieve a history of payins made to your account
   *
   * @param queryParams {@link GetPayinsQueryParams} lets you filter the returned result
   * @returns A promise containing a {@link KorapayResponse}
   */
  getPayins(
    queryParams?: GetPayinsQueryParams,
  ): Promise<KorapayResponse<GetPayinsData>> {
    const endpoint = this.addQueryParams(
      "/merchant/api/v1/pay-ins",
      queryParams,
    );
    return this.client.call(
      endpoint,
      HTTPMethod.GET,
    );
  }

  /**
   *  Initiate a refund for a payment.
   *
   * @param payload {@link InitiateRefundPayload} is the data sent to korapay to initiate a refund
   * @returns A promise containing a {@link KorapayResponse}
   */
  initiateRefund(
    payload: InitiateRefundPayload,
  ): Promise<KorapayResponse<Refund>> {
    return this.client.call(
      "/merchant/api/v1/refunds/initiate",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   *  Retrieve a refund.
   *
   * @param reference The reference of the refund
   * @returns A promise containing a {@link KorapayResponse}
   */
  getRefund(reference: string): Promise<KorapayResponse<RefundDetail>> {
    return this.client.call(
      `/merchant/api/v1/refunds/${reference}`,
      HTTPMethod.GET,
    );
  }
  /**
   *  Retrieve the refund history on your integration.
   *
   * @param queryParams {@link GetRefundHistoryQueryParams} Lets you filter the refund history to be retrieved.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getRefundHistory(
    queryParams?: GetRefundHistoryQueryParams,
  ): Promise<KorapayResponse<GetRefundHistoryData>> {
    const endpoint = this.addQueryParams(
      "/merchant/api/v1/refunds",
      queryParams,
    );
    return this.client.call(
      endpoint,
      HTTPMethod.GET,
    );
  }

  /**
   * Initiate a single disbursement to a bank account.
   *
   * @param payload {@link PayoutToBankAccountPayload} is the data sent to korapay to
   * initiate a payout to bank account
   * @returns A promise containing a {@link KorapayResponse}
   */
  payoutToBankAccount(
    payload: PayoutToBankAccountPayload,
  ): Promise<KorapayResponse<Payout>> {
    return this.client.call(
      "/merchant/api/v1/transactions/disburse",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Initiate a single disbursement to a mobile money account.
   *
   * @param payload {@link PayoutToMobileMoneyPayload} is the data sent to korapay
   * to initiate a payout to mobile money
   * @returns A promise containing a {@link KorapayResponse}
   */
  payoutToMobileMoney(
    payload: PayoutToMobileMoneyPayload,
  ): Promise<KorapayResponse<Payout>> {
    return this.client.call(
      "/merchant/api/v1/transactions/disburse",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Remit to a bank account.
   *
   * @param payload {@link RemitToBankAccountPayload} is the data sent to korapay
   * to remit to recipient's bank account.
   * @returns A promise containing a {@link KorapayResponse}
   */
  remitToBankAccount(
    payload: RemitToBankAccountPayload,
  ): Promise<KorapayResponse<Payout>> {
    return this.client.call(
      "/merchant/api/v1/transactions/disburse/remittance",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Remit to mobile money.
   *
   * @param payload {@link RemitToMobileMoneyPayload} is the data sent to korapay
   * to remit to recipient's mobile money.
   * @returns A promise containing a {@link KorapayResponse}
   */
  remitToMobileMoney(
    payload: RemitToMobileMoneyPayload,
  ): Promise<KorapayResponse<Payout>> {
    return this.client.call(
      "/merchant/api/v1/transactions/disburse/remittance",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Initiate a bulk payout to bank accounts.
   *
   * @param payload {@link BulkPayoutToBankAccountPayload} is the data sent to korapay
   * to initiate a bulk payout to bank accounts
   * @returns A promise containing a {@link KorapayResponse}
   */
  bulkPayoutToBankAccount(
    payload: BulkPayoutToBankAccountPayload,
  ): Promise<KorapayResponse<BulkPayout>> {
    return this.client.call(
      "/api/v1/transactions/disburse/bulk",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Retrieve payouts in a bulk payout.
   *
   * @param bulkReference - The reference of the bulk payout to retrieve.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getPayoutsInBulkPayoutToBankAccount(
    bulkReference: string,
  ): Promise<KorapayResponse<GetPayoutsInBulkPayoutToBankAccountData>> {
    return this.client.call(
      `/api/v1/transactions/bulk/${bulkReference}/payouts`,
      HTTPMethod.GET,
    );
  }

  /**
   * Retrieve the transactions in a bulk payout.
   *
   * @param bulkReference - The reference of the bulk payout whose transactions you to retrieve.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getBulkPayoutToBankAccount(
    bulkReference: string,
  ): Promise<KorapayResponse<BulkPayoutTransaction>> {
    return this.client.call(
      `/api/v1/transactions/bulk/${bulkReference}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Retrieve the status and details of a disbursement through the reference.
   *
   * @param transactionReference - The transaction reference of the payout.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getPayoutTransaction(
    transactionReference: string,
  ): Promise<KorapayResponse<Payout>> {
    return this.client.call(
      `/merchant/api/v1/transactions/${transactionReference}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Retrieve payouts on your integration.
   *
   * @param queryParams - {@link GetPayoutsQueryParams} Lets you filter the payouts to be retrieved.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getPayouts(
    queryParams?: GetPayoutsQueryParams,
  ): Promise<KorapayResponse<GetPayoutsData>> {
    const endpoint = this.addQueryParams(
      "/merchant/api/v1/payouts",
      queryParams,
    );
    return this.client.call(
      endpoint,
      HTTPMethod.GET,
    );
  }

  /**
   * Resolves a bank account.
   *
   * @param bankCode The code for the bank the account number belongs to.
   * @param accountNumber The account number to be resolved.
   * @returns A promise containing a {@link KorapayResponse}
   */
  resolveBankAccount(
    bankCode: string,
    accountNumber: string,
  ): Promise<KorapayResponse<BankAccount>> {
    return this.client.call(
      "/merchant/api/v1/misc/banks/resolve",
      HTTPMethod.POST,
      { bank: bankCode, account: accountNumber },
    );
  }
  /**
   * Retrieve all your pending and available balances
   *
   * @returns A promise containing a {@link KorapayResponse}
   */
  getBalances(): Promise<KorapayResponse<Balance>> {
    return this.client.call("/merchant/api/v1/balances", HTTPMethod.GET);
  }

  /**
   * Retrieve the balance history of your integration.
   *
   * @param queryParams - {@link GetBalanceHistoryQueryParams} Lets you filter the payouts to be retrieved.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getBalanceHistory(
    queryParams?: GetBalanceHistoryQueryParams,
  ): Promise<KorapayResponse<GetBalanceHistoryData>> {
    const endpoint = this.addQueryParams(
      "/merchant/api/v1/balances/history",
      queryParams,
    );
    return this.client.call(
      endpoint,
      HTTPMethod.GET,
    );
  }

  /**
   * Initiate rate conversion.
   *
   * @param payload - {@link InitiateRateConversionPayload} The data sent to korapay to initiate rate conversion
   * @returns A promise containing a {@link KorapayResponse}
   */
  initiateRateConversion(
    payload: InitiateRateConversionPayload,
  ): Promise<KorapayResponse<InitiateCurrencyConversionData>> {
    return this.client.call(
      "/merchant/api/v1/conversions/rates",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Complete rate conversion.
   *
   * @param payload - {@link CompleteRateConversionPayload} The data sent to korapay to initiate rate conversion
   * @returns A promise containing a {@link KorapayResponse}
   */
  completeRateConversion(
    payload: CompleteRateConversionPayload,
  ): Promise<KorapayResponse<CompleteCurrencyConversionData>> {
    return this.client.call(
      "/merchant/api/v1/conversions/",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Retrieve rate conversions on your integration.
   *
   * @param queryParams - {@link GetRateConversionsQueryParams} Lets you filter the rate conversions to be retrieved
   * @returns A promise containing a {@link KorapayResponse}
   */
  getRateConversions(
    queryParams?: GetRateConversionsQueryParams,
  ): Promise<KorapayResponse<GetRateConversionsData>> {
    const endpoint = this.addQueryParams(
      "/merchant/api/v1/conversions/",
      queryParams,
    );
    return this.client.call(
      endpoint,
      HTTPMethod.GET,
    );
  }

  /**
   * Retrieve a single rate conversions on your integration by it's reference.
   *
   * @param reference - The reference of the rate conversion.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getRateConversion(reference: string): Promise<KorapayResponse<ExchangeRate>> {
    return this.client.call(
      `/merchant/api/v1/conversions/${reference}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Create a card.
   *
   * @param payload - {@link CreateCardPayload} The data sent to korapay to initiate rate conversion
   * @returns A promise containing a {@link KorapayResponse}
   */
  createCard(
    payload: CreateCardPayload,
  ): Promise<KorapayResponse<CreateCardData>> {
    return this.client.call(
      "/merchant/api/v1/cards",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Retrieve a card.
   *
   * @param reference -  The reference of the card
   * @returns A promise containing a {@link KorapayResponse}
   */
  getCard(reference: string): Promise<KorapayResponse<GetCardData>> {
    return this.client.call(
      `/merchant/api/v1/cards/${reference}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Retrieve a cards.
   *
   * @returns A promise containing a {@link KorapayResponse}
   */
  getCards(): Promise<KorapayResponse<GetCardsData>> {
    return this.client.call(
      "/merchant/api/v1/cards",
      HTTPMethod.GET,
    );
  }

  /**
   * Fund a card.
   *
   * @param reference -  The reference of the card to be funded
   * @param payload - {@link FundCardPayload} The data sent to korapay to fund the card
   * @returns A promise containing a {@link KorapayResponse}
   */
  fundCard(
    reference: string,
    payload: FundCardPayload,
  ): Promise<KorapayResponse<CardFund>> {
    return this.client.call(
      `/merchant/api/v1/cards/${reference}/fund`,
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Withdraw from a card.
   *
   * @param reference - The reference of the card to withdraw from.
   * @param payload - {@link WithdrawFromCardPayload} The data sent to korapay to withdraw from the card.
   * @returns A promise containing a {@link KorapayResponse}
   */
  withdrawFromCard(
    reference: string,
    payload: WithdrawFromCardPayload,
  ): Promise<KorapayResponse<CardWithdrawal>> {
    return this.client.call(
      `/merchant/api/v1/cards/${reference}/withdraw`,
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Activate or suspend a card.
   *
   * @param reference - The reference of the card to activate or suspend.
   * @param payload - {@link UpdateCardStatusPayload} The data sent to korapay.
   * @returns A promise containing a {@link KorapayResponse}
   */
  updateCardStatus(
    reference: string,
    payload: UpdateCardStatusPayload,
  ): Promise<
    KorapayResponse<{
      readonly status: "active" | "suspended";
    }>
  > {
    return this.client.call(
      `/merchant/api/v1/cards/${reference}/status`,
      HTTPMethod.PATCH,
      payload,
    );
  }

  /**
   * Create card holer.
   *
   * @param payload - {@link CreateCardHolderPayload} The data sent to korapay.
   * @returns A promise containing a {@link KorapayResponse}
   */
  createCardHolder(
    payload: CreateCardHolderPayload,
  ): Promise<KorapayResponse<CardHolder>> {
    return this.client.call(
      "/merchant/api/v1/cardholders",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Retrieve transactions made on a card.
   *
   * @param cardReference - The reference of the card whose transactions you want to retrieve.
   * @param queryParams - {@link UpdateCardStatusPayload} The data sent to korapay.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getCardTransactions(
    cardReference: string,
    queryParams?: GetCardTransactionsQueryParams,
  ): Promise<KorapayResponse<GetCardTransactionsData>> {
    const endpoint = this.addQueryParams(
      `/merchant/api/v1/cards/${cardReference}/transactions`,
      queryParams,
    );
    return this.client.call(
      endpoint,
      HTTPMethod.GET,
    );
  }

  /**
   * Retrieve a list of all banks supported by Korapay and their properties.
   *
   * @param country An enum representing the country to retrieve the banks from.
   * E.g., `Country.NIGERIA`.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getBanks(country: Country): Promise<KorapayResponse<Bank[]>> {
    return this.client.call(
      `/merchant/api/v1/misc/banks?countryCode=${country}`,
      HTTPMethod.GET,
      undefined,
      true,
    );
  }

  /**
   * Retrieve a list of all mobile money operators supported by Korapay and their properties.
   *
   * @param country An enum representing the country to retrieve the MMOs from. E.g., `Country.GHANA`.
   * @returns A promise containing a {@link KorapayResponse}
   */
  getMmo(country: Country): Promise<KorapayResponse<MMO[]>> {
    return this.client.call(
      `/merchant/api/v1/misc/mobile-money?countryCode=${country}`,
      HTTPMethod.GET,
      undefined,
      true,
    );
  }

  private addQueryParams(
    endpoint: string,
    queryParams?: Record<string, any>,
  ): string {
    if (!queryParams) return endpoint;
    const url = new URL(endpoint, "https://_");
    const transformedQueryParams = RestClient.camelToSnakeCaseTransformer(
      queryParams,
    );
    for (let [key, value] of Object.entries(transformedQueryParams)) {
      url.searchParams.append(key, value);
    }
    return url.pathname + url.search;
  }

  private showPackageMessage(
    disablePackageMessage: boolean,
    secretKey?: string,
  ) {
    if (!this.isUsingTestSecretKey(secretKey) || disablePackageMessage) return;
    console.log(PACKAGE_DEV_MODE_MESSAGE);
  }

  private isUsingTestSecretKey(secretKey?: string) {
    if (secretKey) return secretKey.startsWith(SECRET_KEY_PREFIX);
    return Deno.env.get(RestClient.ENV_SECRET_KEY_NAME)?.startsWith(
      SECRET_KEY_PREFIX,
    ) || false;
  }
}
