# @vegaprotocol/wallet-client

Wallet client for the `client` namespace of the [Vega wallet API v0.67.3](https://github.com/vegaprotocol/vega/tree/develop/wallet/api) based on its [openrpc specs](https://github.com/vegaprotocol/vega/blob/develop/wallet/api/openrpc.json).

## Usage

The client supports two types of connections: connecting to an external wallet app (e.g. CLI or desktop-wallet) through http, or connecting to a browser extension wallet.

#### External wallet

To connect to an external wallet, you can initialize the client as below:

```
import { WalletClient } from '@vegaprotocol/wallet-client'

const client = new WalletClient({
  type: 'http',                             // specify that you'd like to connect through HTTP
  address: 'http://localhost:1789',         // the url where the external wallet can be reached
  token: <YOUR_CONNECTION_TOKEN>,           // optional, if you have a saved connection token, pass it in here
  onTokenChange: (token: string) => {...},  // optional, if you'd like to save your connection token, upon receiving one, this callback will provide it
})
```

**_Error handling_**

1. The client will check if there is an error property on the response body and will throw an `WalletClientError` instance wrapping the error info, and expose a code property with the jsonrpc code, and a message based on the jsonrpc message and data properties, as defined in [specification](https://www.jsonrpc.org/specification).
2. If there is a network error / any sort of http error, the client will wrap it into a `WalletHttpError`, which will have a code property with the relevant http error code, and the message will the the http response status text.

#### Browser wallet

To connect to a wallet living in a browser extension, you can initialize the client as below:

```
import { WalletClient } from '@vegaprotocol/wallet-client'

const client = new WalletClient({
  type: 'browser',                     // specify that you'd like to connect to a wallet living in your browser
  chromeId: <CHROME_EXTENSION_ID>      // add the id of the published extension you'd like to connect to
  firefoxId: <FIREFOX_EXTENSION_ID>    // add the id of the published extension you'd like to connect to
})
```

**_Error handling_**

<!-- TODO: specify when implemented -->

## Generating the client

Run `yarn nx run wallet-client:generate` to regenerate the client from the API specs. If you run this locally, the generator will need an environment variable pointing to an openrpc specs file (a remote url or a local file path) to use that as the source of for the wallet client.

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
