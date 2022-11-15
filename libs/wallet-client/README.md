# @vegaprotocol/wallet-client

The wallet client contains generated code based on the [Vega wallet API specs](https://github.com/vegaprotocol/vega/blob/develop/wallet/api/openrpc.json).

## Usage

You can import and use the client in the following way:

```
import { WalletClient } from '@vegaprotocol/wallet-client'

const client = new WalletClient(executor)
```

It takes an executor as an argument, which is an async function, expected to return the correct response shape for each method defined in the openrpc definitions.

## Generating the client

Run `yarn nx run wallet-client:generate` to regenerate the client from the API specs.

## Running unit tests

Run `yarn nx run wallet-client:test` to execute the unit tests via [Jest](https://jestjs.io).
