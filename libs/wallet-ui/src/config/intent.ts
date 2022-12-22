export const Intent = {
  NONE: 'neutral' as const,
  PRIMARY: 'primary' as const,
  SUCCESS: 'success' as const,
  WARNING: 'warning' as const,
  DANGER: 'danger' as const,
}

// eslint-disable-next-line
export type Intent = typeof Intent[keyof typeof Intent]
