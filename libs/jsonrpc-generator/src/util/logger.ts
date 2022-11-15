import chalk from 'chalk'
import log from 'loglevel'
import prefixer from 'loglevel-plugin-prefix'

const getColor = (logLevel: string) => {
  switch (logLevel) {
    case 'trace': {
      return chalk.grey
    }
    case 'debug': {
      return chalk.cyan
    }
    case 'info': {
      return chalk.grey
    }
    case 'warn': {
      return chalk.yellow
    }
    case 'error': {
      return chalk.red
    }
    default: {
      return chalk.white
    }
  }
}

log.setLevel('trace')
prefixer.reg(log)
prefixer.apply(log, {
  format(level, _name, timestamp) {
    return `${chalk.grey(`[${timestamp}]`)} ${getColor(level.toLowerCase())(
      level
    )}:`
  },
})

export const logger = log.getLogger('JSON-RPC-Generator')
