import { compile } from 'json-schema-to-typescript'
import { pascalCase } from 'change-case'
import { clone } from 'ramda'
import type { DocumentType, MethodType } from './schemas'
import { createExample } from './example'

const COMPILE_OPTS = {
  additionalProperties: false,
  bannerComment: '',
}

export const getMethodName = (method: MethodType) => {
  return pascalCase(method.name).replace('Admin', '').replace('Client', '')
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

export const getMethodResultExample = (method: MethodType) => {
  const example = createExample(method)
  return JSON.stringify(example.result.value, null, 2)
}

export const getMethodParamsExample = (method: MethodType) => {
  const example = createExample(method)

  if (method.paramStructure === 'by-name') {
    const params = example.params.reduce(
      (acc, param, i) => ({
        ...acc,
        [param.name ?? i]: param.value,
      }),
      {}
    )
    return JSON.stringify(params, null, 2)
  }

  const params = example.params?.map((p) => p.value)
  return JSON.stringify(params, null, 2)
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
  const normalizedDocument = normalizeDocument<DocumentType>(
    clone(openrpcDocument)
  )

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

  const types = await compile(schema, '', COMPILE_OPTS)
  return types.replace(new RegExp(': {};', 'g'), ': Record<string, unknown>;')
}
