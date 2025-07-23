export enum Currency {
  NGN = "NGN",
  KES = "KES",
  GHS = "GHS",
  USD = "USD",
}

export enum PaymentChannel {
  CARD = "card",
  BANK_TRANSFER = "bank_transfer",
  MOBILE_MONEY = "mobile_money",
  MODAL = "modal",
}

export enum Country {
  NIGERIA = "NG",
  KENYA = "KE",
  GHANA = "GH",
}

export enum MobileMoneyOperator {
  SAFARICOM_KENYA = "safaricom-ke",
  AIRTEL_KENYA = "airtel-ke",
  AIRTEL_GHANA = "airtel-gh",
  MTN_GHANA = "mtn-gh",
}

export enum AuthModel {
  OTP = "OTP",
  THREE_DS = "3DS",
  AVS = "AVS",
  PIN = "PIN",
}

export enum TransactionStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SUCCESS = "success",
  FAILED = "failed",
  EXPIRED = "expired",
}

export enum CardStatus {
  PENDING = "pending",
  ACTIVE = "active",
  SUSPENDED = "suspended",
  TERMINATED = "terminated",
  EXPIRED = "expired",
  FAILED = "failed",
}

export enum CardType {
  MASTERCARD = "mastercard",
  VISA = "visa",
  VERVE = "verve",
}

export enum CardAction {
  ACTIVATE = "activate",
  SUSPEND = "suspend",
}

export enum IdentityType {
  NIN = "nin",
  PASSPORT = "passport",
  DRIVERS_LICENSE = "drivers_licence",
  VOTERS_CARD = "voters_card",
}

export enum HTTPMethod {
  GET,
  POST,
  PATCH,
  PUT,
  DELETE,
}
