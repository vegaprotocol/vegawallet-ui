# @vegaprotocol/transactions

Typescript library for vega transaction types, generated from the [vega proto](https://github.com/vegaprotocol/vega/blob/develop/protos/sources/vega/commands/v1/commands.proto) source where these transactions are defined.

## Dependencies

You will need protobuf installed locally in order to be able to run the generator. You can find the [installation guide here](https://grpc.io/docs/protoc-installation/).

## Usage

You can import the generated types from this libray as:

```
import { TransactionModel } from '@vegaprotocol/transactions'

type SendBatchMarketInstructions = {
  transaction: TransactionModel.BatchMarketInstructions
  ...
}
```

## Generating the types

Run `yarn nx run transactions:generate` to regenerate the transaction types from the source proto file.
The type generator uses [ts-proto](https://github.com/stephenh/ts-proto) under the hood, and it will need two environment variables pointing to the proto context and to the actual input file.

In the context of vega, the easiest is to clone the [vega repository](https://github.com/vegaprotocol/vega) locally, and point the environment variables to the respective paths, where `LOCAL_VEGA_ROOT` is the absolute path to the cloned repository's root folder:

```
WALLET_TRANSACTIONS_ROOT=<LOCAL_VEGA_ROOT>/protos/sources
WALLET_TRANSACTIONS_SOURCE=<LOCAL_VEGA_ROOT>/sources/vega/commands/v1/commands.proto
```

## Notes

For more information, check out the [documentation](https://docs.vega.xyz/testnet/api/grpc/vega/commands/v1/commands.proto) on these transaction types.
