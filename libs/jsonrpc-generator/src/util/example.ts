import { mock } from 'mock-json-schema'

import type { MethodType } from './schemas'

export const createExample = (method: MethodType) => {
  if (method.examples?.length) {
    return method.examples?.[0] as {
      params: Array<{ name?: string; value: unknown }>
      result: { name?: string; value: unknown }
    }
  }

  return {
    params: method.params.map((p) => ({
      name: p.name,
      value: typeof p === 'boolean' ? null : mock(p.schema),
    })),
    result: {
      name: 'Success',
      value:
        typeof method.result === 'boolean' ? null : mock(method.result.schema),
    },
  }
}
