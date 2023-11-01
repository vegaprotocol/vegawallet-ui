/* eslint-disable */

export const protobufPackage = 'vega.commands.v1'

/** Signature definition that allows the network to authenticate external data. */
export interface Signature {
  /** Hex encoded bytes of the signature. */
  value: string
  /** Algorithm used to create the signature. */
  algo: string
  /** Version of the algorithm used to create the signature. */
  version: number
}
