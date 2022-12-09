# @vegaprotocol/wallet-client

The wallet client contains generated code based on the [Vega wallet API specs](https://github.com/vegaprotocol/vega/blob/develop/wallet/api/openrpc.json).

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

## Generating the client

Run `yarn nx run wallet-client:generate` to regenerate the client from the API specs. If you run this locally, the generator will need an environment variable pointing to an openrpc specs file (remote through http or a local file path) to use that as the source of for the wallet client.

```
WALLET_CLIENT_SPECS=https://...
```

NOTE: by default, the code generator should be pointed to ()[https://raw.githubusercontent.com/vegaprotocol/vega/develop/wallet/api/openrpc.json]
