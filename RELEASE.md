- regenerate the transactions lib (need the vega repo for it on your local checked out with the new tag -> WALLET_TRANSACTIONS_ROOT=../vega/protos/sources WALLET_TRANSACTIONS_SOURCE=../vega/protos/sources/vega/commands/v1/commands.proto yarn nx run transactions:generate
- regenerate the wallet-admin (WALLET_ADMIN_SPECS=https://raw.githubusercontent.com/vegaprotocol/vega/v0.70.0/wallet/api/openrpc.json yarn nx run wallet-admin:generate)
  not sure if you need to run lint and format, too
  see if there's a diff in the data models, if yes, bump the package.json in the libs/wallet-admin
- regenerate wallet-client (WALLET_CLIENT_SPECS=https://raw.githubusercontent.com/vegaprotocol/vega/v0.70.0/wallet/api/openrpc.json yarn nx run wallet-client:generate)
- lint and format
- see if there's a diff, if so, bump the package.json in the libs/wallet-client
- if there are any changes in the wallet-admin, also bump the libs/wallet-ui/package.json
- pr, merge to master -> things will get published
- adjust the version for the wallet-admin(?) and wallet-ui in the release pr for the desktop wallet
