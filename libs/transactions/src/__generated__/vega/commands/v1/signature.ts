/* eslint-disable */

export const protobufPackage = 'vega.commands.v1'

/**
 * A signature to authenticate a transaction and to be verified by the Vega
 * network.
 */
export interface Signature {
  /** The bytes of the signature (hex-encoded). */
  value: string
  /** The algorithm used to create the signature. */
  algo: string
  /** The version of the signature used to create the signature. */
  version: number
}
