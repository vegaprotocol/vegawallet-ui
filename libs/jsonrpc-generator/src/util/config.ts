import path from 'path'
import { z, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

import { isUrl } from './is-url'

const buildPath = (rootPath: string, pathStr: string) => {
  if (pathStr.startsWith('.')) {
    return path.join(rootPath, pathStr)
  }
  return pathStr
}

const ConfigSchema = z.object({
  document: z.string({
    required_error:
      'Required property, make sure you define this in your codegen config or pass it in as a flag',
  }),
  outDir: z.string({
    required_error:
      'Required property, make sure you define this in your codegen config or pass it in as a flag',
  }),
  templateDir: z.string({
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

  const fullConfigPath = buildPath(process.cwd(), configPath)
  // allow dynamic require of json files
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = ConfigSchema.partial().parse(require(fullConfigPath))
  const rootPath = configPath.split('/').slice(0, -1).join(path.sep)

  return {
    document:
      config.document && !isUrl(config.document)
        ? buildPath(rootPath, config.document)
        : config.document,
    outDir: config.outDir ? buildPath(rootPath, config.outDir) : undefined,
    templateDir: config.templateDir
      ? buildPath(rootPath, config.templateDir)
      : undefined,
    methods: config.methods,
  }
}

export type ConfigProps = Partial<ConfigType> & {
  config: string
  methods: string
}

export const getConfig = ({ config, ...rest }: ConfigProps): ConfigType => {
  try {
    const fileConfig = getConfigFromFile(config)
    const inputConfig = (
      Object.keys(ConfigSchema) as Array<keyof ConfigType>
    ).reduce<Partial<ConfigType>>((acc, key) => {
      if (rest[key]) {
        switch (key) {
          case 'document': {
            acc.document = buildPath(process.cwd(), rest.document ?? '')
            break
          }
          case 'outDir': {
            acc.outDir = buildPath(process.cwd(), rest.outDir ?? '')
            break
          }
          case 'templateDir': {
            acc.templateDir = buildPath(process.cwd(), rest.templateDir ?? '')
            break
          }
          case 'methods': {
            acc.methods = rest.methods.split(',') ?? undefined
            break
          }
        }
        return acc
      }
      return acc
    }, {})

    return ConfigSchema.parse({
      ...fileConfig,
      ...inputConfig,
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
