# @gray-adeyi/korapay-sdk

TypeScript SDK for the Korapay API.

## What It Does

- Wraps Korapay HTTP endpoints in a typed client.
- Converts request payloads from camelCase to snake_case automatically.
- Converts response payloads back to camelCase for JS/TS ergonomics.
- Supports both secure and public requests through the same client instance.

## Installation

### npm

```bash
npm i @gray-adeyi/korapay-sdk
```

### yarn

```bash
yarn add @gray-adeyi/korapay-sdk
```

### pnpm

```bash
pnpm i @gray-adeyi/korapay-sdk
```

### bun

```bash
bun add @gray-adeyi/korapay-sdk
```

### deno

```bash
deno add @gray-adeyi/korapay-sdk
```

## Quick Start

Set these environment variables before you instantiate the client:

```bash
KORAPAY_PUBLIC_KEY=pk_test_...
KORAPAY_SECRET_KEY=sk_test_...
KORAPAY_ENCRYPTION_KEY=...
```

Then create the client:

```ts
import { Country, KorapayClient } from "@gray-adeyi/korapay-sdk";

const client = new KorapayClient();

const balances = await client.getBalances();
console.log(balances.data);

const banks = await client.getBanks(Country.NIGERIA);
console.log(banks.data);
```

If you want to pass keys explicitly, the constructor accepts them in the same
order:

```ts
const client = new KorapayClient(
  "pk_test_...",
  "sk_test_...",
  "encryption_key_here",
);
```

## Common Use Cases

### Bank transfer charge

```ts
import { Currency, KorapayClient } from "@gray-adeyi/korapay-sdk";

const client = new KorapayClient();

const charge = await client.chargeViaBankTransfer({
  reference: "ref_001",
  customer: { email: "johndoe@example.com" },
  amount: 1_000_000,
  currency: Currency.NGN,
  narration: "Test charge",
});
```

### Mobile money charge

```ts
import { Currency, KorapayClient } from "@gray-adeyi/korapay-sdk";

const client = new KorapayClient();

await client.chargeViaMobileMoney({
  reference: "ref_002",
  customer: { email: "johndoe@example.com" },
  amount: 5000,
  mobileMoney: { number: "254700000000" },
  currency: Currency.KES,
  description: "Mobile money charge",
});
```

### Public endpoints

Use `getBanks()` and `getMmo()` for public lookup data. These requests use the
public key.

## Behavior Notes

- The SDK does not validate request payloads before sending them to Korapay.
- Environment variables are used by default when values are not passed to the
  constructor.
- Response keys are normalized to camelCase where possible.

## Documentation

See the docs site for setup and API guidance:

- [Getting started](https://gray-adeyi.github.io/korapay-sdk)
- [Project documentation](https://gray-adeyi.github.io/korapay-sdk)

## Contributing

If you find a bug or want to propose an improvement, open an issue or submit a pull request.
