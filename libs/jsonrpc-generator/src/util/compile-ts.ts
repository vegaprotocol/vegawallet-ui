import { compile } from 'json-schema-to-typescript'
import { pascalCase } from 'change-case'
import { z } from 'zod'

enum ParamStructure {
  BY_NAME = 'by-name',
  BY_POSITION = 'by-position',
}

const RefSchema = z.object({
  $ref: z.string(),
})

const MethodSchema = z.object({
  name: z.string(),
  summary: z.string(),
  description: z.string(),
  tags: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .optional(),
  paramStructure: z.nativeEnum(ParamStructure).optional(),
  params: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      required: z.boolean().optional(),
      schema: z.union([z.object({}).passthrough(), RefSchema, z.boolean()]),
    })
  ),
  result: z.object({
    name: z.string(),
    title: z.string().optional(),
    required: z.boolean().optional(),
    schema: z.union([z.object({}).passthrough(), RefSchema, z.boolean()]),
  }),
  errors: z.array(RefSchema).optional(),
})

export const DocumentSchema = z.object({
  openrpc: z.string(),
  info: z.object({
    version: z.string(),
    title: z.string(),
  }),
  methods: z.array(MethodSchema),
  components: z
    .object({
      schemas: z.object({}).passthrough().optional(),
      errors: z.object({}).passthrough(),
    })
    .optional(),
})

export type DocumentType = z.infer<typeof DocumentSchema>
export type MethodType = z.infer<typeof MethodSchema>

const COMPILE_OPTS = {
  additionalProperties: false,
  bannerComment: '',
}

export const getMethodName = (method: MethodType) => {
  return pascalCase(method.name).replace('Admin', '')
}

export const getMethodParamsType = (method: MethodType) => {
  return `${getMethodName(method)}Params`
}

export const getMethodResultType = (method: MethodType) => {
  return `${getMethodName(method)}Result`
}

export const getMethodParams = (method: MethodType) => {
  if (method.paramStructure === 'by-name') {
    return 'params'
  }
  return `...params`
}

// recursive function, skipping strict doc type definition here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeDocument<T>(doc: any): T {
  if (doc && Array.isArray(doc)) {
    const pieces = []
    for (const index in doc) {
      pieces.push(normalizeDocument(doc[index]))
    }
    return pieces as T
  }

  if (doc && typeof doc === 'object') {
    if (doc.title) {
      // remove title props, which is a generated string. since we use it for type generation, we want human readable type names
      delete doc.title
    }

    if (doc.schema) {
      const schema = doc.schema
      // remove schema props, param types are wrapped into this, the json schema parser doesn't recognise it
      delete doc.schema
      Object.assign(doc, schema)
    }

    for (const key in doc) {
      Object.assign(doc, { [key]: normalizeDocument(doc[key]) })
    }
  }
  return doc as T
}

type Params = {
  title: string
  type: 'object'
  required: string[]
  properties: Record<string, object>
}

const getParamsSchemaByName = (method: MethodType) =>
  method.params.reduce<Params>(
    (acc, param) => {
      const { name, required, ...rest } = param
      acc.properties[name] = rest
      if (required) {
        acc.required.push(name)
      }
      return acc
    },
    {
      title: `${getMethodName(method)}Params`,
      type: 'object',
      required: [],
      properties: {},
    }
  )

const getParamsSchemaByPosition = (method: MethodType) => ({
  title: `${getMethodName(method)}Params`,
  type: 'array',
  items: method.params,
})

const getResultSchema = (method: MethodType) => {
  const result = method.result
  const { name, title, ...rest } = result

  return {
    ...rest,
    title: `${getMethodName(method)}Result`,
  }
}

type NormalizedDocument = {
  title: 'Methods'
  type: 'object'
  properties: Record<string, object>
  components?: {
    schemas: Record<string, object>
    errors: Record<string, object>
  }
}

const normalizeComponent = (component: Record<string, object> = {}) => {
  return Object.keys(component).reduce<Record<string, object>>((acc, key) => {
    acc[key] = {
      ...component[key],
      title: pascalCase(key),
    }
    return acc
  }, {})
}

export const compileTs = async (openrpcDocument: DocumentType) => {
  const normalizedDocument = normalizeDocument<DocumentType>(openrpcDocument)

  const schema = normalizedDocument.methods?.reduce<NormalizedDocument>(
    (acc, method) => {
      acc.properties[`${getMethodName(method)}Result`] = getResultSchema(method)
      acc.properties[`${getMethodName(method)}Params`] =
        method.paramStructure === 'by-name'
          ? getParamsSchemaByName(method)
          : getParamsSchemaByPosition(method)
      return acc
    },
    {
      title: 'Methods',
      type: 'object',
      properties: {},
      components: {
        schemas: normalizeComponent(openrpcDocument.components?.schemas),
        errors: normalizeComponent(openrpcDocument.components?.errors),
      },
    }
  )

  return compile(schema, '', COMPILE_OPTS)
}
