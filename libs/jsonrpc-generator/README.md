# @vegaprotocol/jsonrpc-generator

A generic implementation of a JSON RPC to typescript generator.

## Configuration

The generator takes the following parameters:

- document (as a flag: `-d, --document <file>`): the openrpc document to use as the source of the generation (url or local file path) - accepts also underscore template variables which can be pointed to environment variables, like: `"document": "<%= ENV_VAR %>"`
- outDir (as a flag: `-o, --outDir <dir>`): the target directory to generate the files to
- templateDir (as a flag: `-t, --templateDir <dir>`): the source directory for the template files
- methods (as a flag: `--methods <comma separated list>`): a list of method names to use for the generation (ignores the rest from the source document if provided)
- config (flag-only: `-c, --config <file>`): the path to the configuration file

All parameters can be provided as a flag when running the command directly, or can be sourced from a configuration file, which then can be provided in the `--config` flag.

## Usage

You can run the generator by using the following command: `yarn nx run jsonrpc-generator:run`.

The following variables are exposed in the templates:

- `types`: a compiled string for all the typescript definitions
- `version`: the version of the generator
- `openrpcDocument`: the openrpc source document
- `methods`: the methods selected to generate
- `getMethodName`: takes a method object, and returns a `pascalCase` string to use as the method name
- `getMethodExample`: takes a method object, and returns the result example on it if there's one
- `getMethodParamsType`: takes a method object, and returns a `pascalCase` string to use as the method params typing
- `getMethodResultType`: takes a method object, and returns a `pascalCase` string to use as the method result typing
- `getMethodParams`: takes a method object, and returns either `params` (if the method paramStructure is 'by-name') or `...params` (if the method paramStructure is 'by-order')

By default, the templates use underscore syntax, so this is how you'd use one of the above variables:

```
<%= version %>
```

## Running unit tests

Run `yarn nx run jsonrpc-generator:test` to execute the unit tests via [Jest](https://jestjs.io).
