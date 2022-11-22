export enum FeatureType {
  NETWORK_COMPATIBILITY_WARNING = 'NETWORK_COMPATIBILITY_WARNING',
}

export type Features = Record<FeatureType, boolean>

export const FeatureMap: Record<FeatureType, FeatureType> = {
  [FeatureType.NETWORK_COMPATIBILITY_WARNING]:
    FeatureType.NETWORK_COMPATIBILITY_WARNING,
}
