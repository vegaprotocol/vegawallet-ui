import fetch from 'node-fetch'
import type { Logger } from 'loglevel'
import { isUrl } from './is-url'

async function getRemoteFile(filePath: string) {
  const res = await fetch(filePath)
  const json = await res.json()
  return json
}

export async function requestJson(logger: Logger, filePath: string) {
  if (isUrl(filePath)) {
    logger.info(`Fetching remote openrpc specs...`)
    return getRemoteFile(filePath)
  } else {
    logger.info(`Reading specs file content...`)
    return require(filePath)
  }
}
