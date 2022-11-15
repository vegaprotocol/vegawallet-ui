import { Command } from 'commander'
import generate from './generate'
// @ts-ignore Typescript refuses to import this file
import packageJson from '../package.json'

const createClient = () => {
  const program = new Command('jsonrpc')

  program
    .version(packageJson.version, '-v, --version')
    .command('generate')
    .description('Generate JSONRPC client')
    .option('-d, --document <file>', 'The path to openrpc json file.')
    .option(
      '-o, --outDir <dir>',
      'The path to the file where the client gets generated.'
    )
    .option(
      '-t, --templateDir <dir>',
      'The path to the template which is used to generate the client.'
    )
    .option(
      '-c, --config <file>',
      'The path to the codegen configuration file.'
    )
    .option(
      '--methods <list>',
      'A comma separated list of methods to pick from the openrpc specs for the generated client.'
    )
    .action(generate)

  program.parse(process.argv)
}

createClient()
