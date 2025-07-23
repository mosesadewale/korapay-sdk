import { beforeAll, describe, it } from "@std/testing/bdd";
import KorapayClient from "../src/korapay.ts";
import { Country } from "../src/enums.ts";
import { load } from "@std/dotenv";

describe("KorapayClient", () => {
  let client: KorapayClient;

  beforeAll(async () => {
    await load({ envPath: ".env", export: true });
    client = new KorapayClient();
  });

  it.skip("chargeViaCard", () => {});

  it.skip("authorizeCardCharge", () => {});

  it.skip("resendCardOtp", () => {});

  it.skip("chargeViaBankTransfer", () => {});

  it.skip("createVirtualBankAccount", () => {});

  it.skip("getVirtualBankAccount", () => {});

  it.skip("getVirtualBankAccountTransactions", () => {});

  it.skip("creditSandboxVirtualBankAccount", () => {});

  it.skip("chargeViaMobileMoney", () => {});

  it.skip("authorizeMobileMoneyCharge", () => {});

  it.skip("resendMobileMoneyOtp", () => {});

  it.skip("resendSkt", () => {});

  it.skip("authorizeSkt", () => {});

  it.skip("initiateCharge", () => {});

  it.skip("chargeViaDirectBankDebit", () => {});

  it.skip("getCharge", () => {});

  it.skip("getPayins", () => {});

  it.skip("initiateRefund", () => {});

  it.skip("getRefund", () => {});

  it.skip("getRefundHistory", () => {});

  it.skip("payoutToBankAccount", () => {});

  it.skip("payoutToMobileMoney", () => {});

  it.skip("remitToBankAccount", () => {});

  it.skip("remitToMobileMoney", () => {});

  it.skip("bulkPayoutToBankAccount", () => {});

  it.skip("getPayoutsInBulkPayoutToBankAccount", () => {});

  it.skip("getBulkPayoutToBankAccount", () => {});

  it.skip("getPayoutTransaction", () => {});

  it.skip("getPayouts", () => {});

  it.skip("resolveBankAccount", () => {});

  it("getBalances", async () => {
    const response = await client.getBalances();
    console.log(response);
  });

  it.skip("getBalanceHistory", () => {});

  it.skip("initiateRateConversion", () => {});

  it.skip("completeRateConversion", () => {});

  it.skip("getRateConversions", () => {});

  it.skip("getRateConversion", () => {});

  it.skip("createCard", () => {});

  it.skip("getCard", () => {});

  it.skip("getCards", () => {});

  it.skip("fundCard", () => {});

  it.skip("withdrawFromCard", () => {});

  it.skip("updateCardStatus", () => {});

  it.skip("createCardHolder", () => {});

  it.skip("getCardTransactions", () => {});

  it("getBanks", async () => {
    const response = await client.getBanks(Country.NIGERIA);
    console.log(response);
  });

  it.skip("getMmo", async () => {
  });
});
