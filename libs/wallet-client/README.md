# @vegaprotocol/wallet-client

Wallet client for the `client` namespace of the [Vega wallet API v0.65.1](https://github.com/vegaprotocol/vega/tree/develop/wallet/api) based on its [openrpc specs](https://github.com/vegaprotocol/vega/blob/develop/wallet/api/openrpc.json).

## Usage

You can import and use the client in the following way:

```
import { WalletClient } from '@vegaprotocol/wallet-client'

const client = new WalletClient({ hostname: 'http://localhost:1789' })
```

The client takes two optional arguments, too, beside the hostname:

- `token`: if you have a previously saved token string, you can pass that in to the constructor
- `origin`: defaults to the value of `window.location.origin`

To sum it up:

```
const client = new WalletClient({
  hostname: 'http://localhost:1789',
  token: <YOUR_TOKEN>,
  origin: 'https://vega.zyz'
})
```

## Error handling

1. The client will check if there is an error property on the response body and will throw an `WalletClientError` instance wrapping the error info, and expose a code property with the jsonrpc code, and a message based on the jsonrpc message and data properties, as defined in [specification](https://www.jsonrpc.org/specification).
2. If there is a network error / any sort of server error, the client will wrap it into a `WalletHttpError`, which will have a code property with the relevant http error code, and the message will the the http response status text.

## Generating the client

Run `yarn nx run wallet-client:generate` to regenerate the client from the API specs. If you run this locally, the generator will need an environment variable pointing to an openrpc specs file (remote through http or a local file path) to use that as the source of for the wallet client.

```
WALLET_CLIENT_SPECS=https://...
```

NOTE: by default, the code generator should be pointed to [wallet API openrpc definition](https://raw.githubusercontent.com/vegaprotocol/vega/develop/wallet/api/openrpc.json)

## Mocks

The wallet client exposes a mock service which you can import and run anywhere:

```
import { MockWalletService } from '@vegaprotocol/wallet-client/mocks'

const service = new MockWalletService({ port: 1789 })

service.start()
...
service.stop()
```

Alternatively, you can run the `yarn nx run wallet-client:start-mock` from the vegawallet-ui monorepo to start a mock service.
