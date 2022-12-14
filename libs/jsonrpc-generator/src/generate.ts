import path from 'path'
import { readFile, readdir, writeFile, ensureDir, stat, copy } from 'fs-extra'
import { template } from 'underscore'
import matcher from 'matcher'

// @ts-ignore Typescript refuses to import this file
import packageJson from '../package.json'
import type { ConfigProps } from './util/config'
import { getConfig } from './util/config'
import { logger } from './util/logger'
import { requestJson } from './util/request-json'
import { resolveRefs } from './util/resolve-refs'
import {
  compileTs,
  getMethodName,
  getMethodResultExample,
  getMethodParamsExample,
  getMethodParams,
  getMethodParamsType,
  getMethodResultType,
} from './util/compile-ts'
import { DocumentSchema } from './util/schemas'

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

    const parsedDocument = template(document)(process.env)
    const json = await requestJson(logger, parsedDocument)
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

    const resolvedDocument = await resolveRefs(documentWithSelectedMethods)

    const types = await compileTs(resolvedDocument)
    await copy(templateDir, outDir)

    await pipeFiles({
      dest: outDir,
      process: (content: string) =>
        template(content)({
          types,
          version: packageJson.version,
          openrpcDocument,
          methods: resolvedDocument.methods,
          getMethodName,
          getMethodResultExample,
          getMethodParamsExample,
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
