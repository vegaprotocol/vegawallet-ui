import type { z } from 'zod'
import type { JsonSchema } from '../util/compile-ts'

declare module 'json-schema-mock' {
  export default function (param: z.infer<typeof JsonSchema>): any
}
