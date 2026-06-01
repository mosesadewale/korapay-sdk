# @gray-adeyi/korapay-sdk

A korapay client SDK for the javascript runtime.

## Features

- Typescript support
- Implements methods matching all of korapay's public API.
- Automatic case transformation of payload and response data keys for a more
  optimal JS/TS experience

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

## Usage

You may choose to set these environment variables before instantiating the client like:

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

Passing the public key, secret key and encryption key directly to the client on instantiation overrides the environmental variables:

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


## Limitations

- Currently, @gray-adeyi/korapay-sdk does not perform any form of validation on
  the data passed in as method parameters are used to call Korapay's endpoints as it, and the methods may throw exceptions depending on how the
  underlying endpoint handles it
- Limited documentation

## Sponsorship

Every little donation goes a long way. You can also give this project a star in
its Github repository it helps ♥️

- [Star on Github](https://www.github.com/gray-adeyi/korapay-sdk)
- [Buy me a coffee](https://www.buymeacoffee.com/jigani)

## Contributing

You might encounter bugs while using this project or have feature enhancements
you'd like to share with the project. Create an issue on the project's
[github](https://www.github.com/gray-adeyi/korapay-sdk) page.
