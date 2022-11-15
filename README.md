# Vega wallet ui

The monorepo provides a toolkit for building apps that interact with Vega, as well as the apps themselves.

This repository is managed using [Nx](https://nx.dev).

# 🔎 Applications in this repo

### [JSONRPC Generator](./libs/jsonrpc-generator)

The generator consumes an openrpc definition, and provided a template, produces a typescript client.

### [Wallet Client](./libs/wallet-client)

A generated typescript client based on the [openrpc definition](https://github.com/vegaprotocol/vega/blob/develop/wallet/api/openrpc.json) of the wallet API.

### [Wallet UI](./libs/wallet-ui)

The wallet user interface.

# 💻 Development

### Dependencies

To run the code in this repository, you will need the following:

- nodejs > `18.12`
- yarn > `1.22.19`

### Set up

Check you have the correct version of Node. You can [install NVM to switch between node versions](https://github.com/nvm-sh/nvm#installing-and-updating). Then `NVM install`.
Before you build you will need to `yarn install` in the root directory.

### Build

Run `yarn nx run <my-app>:build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running tests

Run `yarn nx run <my-app>:test` to execute the unit tests with [Jest](https://jestjs.io), or `nx affected:test` to execute just unit tests affected by a change. You can also use `--watch` with these test to run jest in watch mode, see [Jest executor](https://nx.dev/packages/jest/executors/jest) for all CLI flags.

### Formatting

In CI linting, formatting and also run. These checks can be seen in the [CI workflow file](.github/workflows//test.yml).

- To fix linting errors locally run `yarn nx lint --fix`
- To fix formatting errors local run `yarn nx format:write`
- For either command you may use `--all` to run across the entire repository

### Further help with Nx

Visit the [Nx Documentation](https://nx.dev/getting-started/intro) to learn more.

# 📑 License

[MIT](./LICENSE)
