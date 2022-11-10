import path from 'path'
import { readFile, writeFile } from 'fs-extra'
import { template } from 'underscore'

import packageJson from '../package.json'
import type { ConfigProps } from './util/config';
import { getConfig } from './util/config'
import { logger } from './util/logger'
import { requestJson } from './util/request-json'
import {
  DocumentSchema,
  compileTs,
  getMethodName,
  getMethodParams,
  getMethodParamsType,
  getMethodResultType,
} from './util/compile-ts'

const generate = async (props: ConfigProps) => {
  try {
    const { document, outFile, templateFile, methods } = getConfig(props)

    const [json, templateContent] = await Promise.all([
      requestJson(logger, document),
      readFile(templateFile).then((buff) => buff.toString()),
    ])

    const openrpcDocument = DocumentSchema.parse(json)

    const documentWithSelectedMethods = {
      ...openrpcDocument,
      methods: methods
        ? openrpcDocument.methods.filter((m) => methods.includes(m.name))
        : openrpcDocument.methods,
    }

    const types = await compileTs(documentWithSelectedMethods)

    const content = template(templateContent)({
      types,
      version: packageJson.version,
      openrpcDocument,
      methods: documentWithSelectedMethods.methods,
      getMethodName,
      getMethodParamsType,
      getMethodResultType,
      getMethodParams,
    })

    await writeFile(path.join(process.cwd(), outFile), content)
    logger.info(`Generated client to ${path.join(process.cwd(), outFile)}`)
  } catch (err) {
    logger.error(err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

export default generate
