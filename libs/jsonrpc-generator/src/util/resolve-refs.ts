import RefParser from '@apidevtools/json-schema-ref-parser'
import type { DocumentType, SchemaType } from './schemas'

const getChunk = async (doc: DocumentType, schema: SchemaType): Promise<SchemaType> => {
  if (typeof schema !== 'boolean') {
    const resolvedSchema = await RefParser.dereference({
      type: 'object',
      properties: {
        schema
      },
      components: doc.components,
    })
    return resolvedSchema?.properties?.schema ?? {}
  }
  return {
    type: null
  }
}

export const resolveRefs = async (doc: DocumentType) => {
  const methods = await Promise.all(doc.methods.map(async method => {
    const params = await Promise.all(method.params.map(async p => ({
      ...p,
      schema: await getChunk(doc, p.schema),
    })))

    return {
      ...method,
      params,
      result: {
        ...method.result,
        schema: await getChunk(doc, method.result.schema)
      },
    }
  }))

  return {
    ...doc,
    methods,
  }
}
