import path from 'path'
import { z, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

import { isUrl } from './is-url'

const ConfigSchema = z.object({
  document: z.string({
    required_error:
      'Required property, make sure you define this in your codegen config or pass it in as a flag',
  }),
  outFile: z.string({
    required_error:
      'Required property, make sure you define this in your codegen config or pass it in as a flag',
  }),
  templateFile: z.string({
    required_error:
      'Required property, make sure you define this in your codegen config or pass it in as a flag',
  }),
  methods: z.array(z.string()),
})

export type ConfigType = z.infer<typeof ConfigSchema>

const getConfigFromFile = (configPath?: string) => {
  if (!configPath) {
    return {}
  }

  const fullConfigPath = path.join(process.cwd(), configPath)
  // allow dynamic require of json files
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = ConfigSchema.partial().parse(require(fullConfigPath))
  const rootPath = configPath.split('/').slice(0, -1).join(path.sep)

  return {
    document:
      config.document && !isUrl(config.document)
        ? path.join(rootPath, config.document)
        : config.document,
    outFile: config.outFile ? path.join(rootPath, config.outFile) : undefined,
    templateFile: config.templateFile
      ? path.join(rootPath, config.templateFile)
      : undefined,
    methods: config.methods,
  }
}

export type ConfigProps = ConfigType & {
  config: string
  methods: string
}

export const getConfig = ({
  config,
  methods,
  ...rest
}: ConfigProps): ConfigType => {
  try {
    const configContent = getConfigFromFile(config)
    return ConfigSchema.parse({
      ...configContent,
      ...rest,
      methods: methods ? methods.split(',') : configContent.methods,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      throw fromZodError(err, {
        maxIssuesInMessage: 1,
      })
    }
    throw err
  }
}
