import path from 'path'
import { readFile, readdir, writeFile, ensureDir, stat, copy } from 'fs-extra'
import { template } from 'underscore'
import { matcher } from 'matcher'

// @ts-ignore Typescript refuses to import this file
import packageJson from '../package.json'
import type { ConfigProps } from './util/config'
import { getConfig } from './util/config'
import { logger } from './util/logger'
import { requestJson } from './util/request-json'
import {
  DocumentSchema,
  compileTs,
  getMethodName,
  getMethodExample,
  getMethodParams,
  getMethodParamsType,
  getMethodResultType,
} from './util/compile-ts'

type PipeProps = {
  dest: string
  process: (content: string) => string
}

const pipeFiles = async ({ dest, process }: PipeProps) => {
  const files = await readdir(dest)
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dest, file)
      const stats = await stat(filePath)

      if (stats.isFile()) {
        const content = await readFile(path.join(dest, file))
        await writeFile(path.join(dest, file), process(content.toString()))
      }

      if (stats.isDirectory()) {
        await pipeFiles({ dest: filePath, process })
      }
    })
  )
}

const generate = async (props: ConfigProps) => {
  try {
    const { document, outDir, templateDir, methods } = getConfig(props)

    await Promise.all([ensureDir(outDir), ensureDir(templateDir)])

    const json = await requestJson(logger, document)
    const openrpcDocument = DocumentSchema.parse(json)
    const methodPatterns = methods.length ? methods : ['*']
    const selectedMethods = matcher(
      openrpcDocument.methods.map((m) => m.name),
      methodPatterns
    )

    const documentWithSelectedMethods = {
      ...openrpcDocument,
      methods: openrpcDocument.methods.filter((m) =>
        selectedMethods.includes(m.name)
      ),
    }

    const types = await compileTs(documentWithSelectedMethods)
    await copy(templateDir, outDir)

    await pipeFiles({
      dest: outDir,
      process: (content: string) =>
        template(content)({
          types,
          version: packageJson.version,
          openrpcDocument,
          methods: documentWithSelectedMethods.methods,
          getMethodName,
          getMethodExample,
          getMethodParamsType,
          getMethodResultType,
          getMethodParams,
        }),
    })

    logger.info(`Generated client to ${outDir}`)
  } catch (err) {
    logger.error(err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

export default generate
