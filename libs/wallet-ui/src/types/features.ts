export enum FeatureType {
  TELEMETRY_CHECK = 'TELEMETRY_CHECK',
  NETWORK_COMPATIBILITY_WARNING = 'NETWORK_COMPATIBILITY_WARNING',
  NETWORK_MODE = 'NETWORK_MODE',
}

export type Features = {
  TELEMETRY_CHECK: boolean
  NETWORK_COMPATIBILITY_WARNING: boolean
  NETWORK_MODE?: 'fairground' | 'mainnet' | 'dev'
}

export const FeatureMap: Record<FeatureType, FeatureType> = {
  [FeatureType.NETWORK_MODE]: FeatureType.NETWORK_MODE,
  [FeatureType.TELEMETRY_CHECK]: FeatureType.TELEMETRY_CHECK,
  [FeatureType.NETWORK_COMPATIBILITY_WARNING]:
    FeatureType.NETWORK_COMPATIBILITY_WARNING,
}
