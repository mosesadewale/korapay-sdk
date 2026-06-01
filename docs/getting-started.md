# Getting started

<!-- tabs:start -->

#### **Npm**

```bash
npm i @gray-adeyi/korapay-sdk
```

#### **Bun**

```bash
bun add @gray-adeyi/korapay-sdk
```

#### **Deno**

```bash
deno add @gray-adeyi/korapay-sdk
```

<!-- tabs:end -->

## Configure Your Keys

Set the Korapay keys before creating the client:

```bash
KORAPAY_PUBLIC_KEY=pk_test_...
KORAPAY_SECRET_KEY=sk_test_...
KORAPAY_ENCRYPTION_KEY=...
```

## Create A Client

```ts
import { KorapayClient } from "@gray-adeyi/korapay-sdk";

const client = new KorapayClient();

const balances = await client.getBalances();
console.log(balances.data);
```

## First Request

If your keys are set correctly, `getBalances()` is a simple first call to verify
that the client is working.

```ts
const response = await client.getBalances();
console.log(response.statusCode);
console.log(response.message);
```

## Notes

- Pass keys explicitly to `new KorapayClient(publicKey, secretKey, encryptionKey)`
  if you do not want to rely on environment variables.
- `getBanks()` is a public endpoint and uses the public key.
- `chargeViaCard()` requires an encryption key because the card payload is
  encrypted before it is sent.
