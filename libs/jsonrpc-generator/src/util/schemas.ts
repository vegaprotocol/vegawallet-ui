import { z } from 'zod'

enum ParamStructure {
  BY_NAME = 'by-name',
  BY_POSITION = 'by-position',
}

export const RefSchema = z.object({
  $ref: z.string(),
})

export const JsonSchema = z.union([
  z.object({}).passthrough(),
  RefSchema,
  z.boolean(),
])

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
      schema: JsonSchema,
    })
  ),
  result: z.object({
    name: z.string(),
    title: z.string().optional(),
    required: z.boolean().optional(),
    schema: JsonSchema,
  }),
  errors: z.array(RefSchema).optional(),
  examples: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        params: z.array(
          z.object({
            name: z.string(),
            value: z.any(),
          })
        ),
        result: z.object({
          name: z.string(),
          value: z.any(),
        }),
      })
    )
    .optional(),
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

export type RefType = z.infer<typeof RefSchema>
export type DocumentType = z.infer<typeof DocumentSchema>
export type MethodType = z.infer<typeof MethodSchema>
export type SchemaType = z.infer<typeof JsonSchema>
