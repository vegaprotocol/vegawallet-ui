# @vegaprotocol/wallet-admin

Wallet client for the `admin` namespace of the [Vega wallet API v0.67.0](https://github.com/vegaprotocol/vega/tree/develop/wallet/api) based on its [openrpc specs](https://github.com/vegaprotocol/vega/blob/develop/wallet/api/openrpc.json).

## Usage

You can import and use the client in the following way:

```
import { WalletClient } from '@vegaprotocol/wallet-admin'

const client = new WalletClient(executor)
```

It takes an executor as an argument, which is an async function, expected to return the correct response shape for each method defined in the openrpc definitions.

## Generating the client

Run `yarn nx run wallet-admin:generate` to regenerate the client from the API specs. If you run this locally, the generator will need an environment variable pointing to an openrpc specs file (remote through http or a local file path) to use that as the source of for the wallet client.

```
WALLET_ADMIN_SPECS=https://...
```
