import type { Runtime } from '../types/runtime'

export const runtime: Runtime = {
  WindowReload: () => window.location.reload(),
}
