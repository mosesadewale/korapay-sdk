# Korapay SDK

This documentation covers installation, setup, and the main client flows for
`@gray-adeyi/korapay-sdk`.

## What To Read First

- [Getting started](getting-started.md)

## What This SDK Does

- Wraps Korapay API endpoints in a typed client.
- Transforms payload keys to snake_case before sending requests.
- Transforms response keys back to camelCase after responses are received.

## Current Limitations

- The SDK does not validate payloads before sending them.
- The test suite still needs mocked coverage for most client methods.
- Webhook support is not implemented yet.
