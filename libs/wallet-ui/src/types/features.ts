export enum FeatureType {
  TELEMETRY_CHECK = 'TELEMETRY_CHECK',
  NETWORK_COMPATIBILITY_WARNING = 'NETWORK_COMPATIBILITY_WARNING',
}

export type Features = Record<FeatureType, boolean>

export const FeatureMap: Record<FeatureType, FeatureType> = {
  [FeatureType.TELEMETRY_CHECK]: FeatureType.TELEMETRY_CHECK,
  [FeatureType.NETWORK_COMPATIBILITY_WARNING]:
    FeatureType.NETWORK_COMPATIBILITY_WARNING,
}
