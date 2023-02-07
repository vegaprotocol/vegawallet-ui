/* eslint-disable */

export const protobufPackage = 'vega.data.v1'

export interface ETHAddress {
  address: string
}

/**
 * PubKey is the public key that signed this data.
 * Different public keys coming from different sources will be further separated.
 */
export interface PubKey {
  key: string
}

export interface Signer {
  /**
   * pubKeys is the list of authorized public keys that signed the data for this
   * source. All the public keys in the data should be contained in these
   * public keys.
   */
  pubKey?: PubKey | undefined
  /** in case of an open oracle - Ethereum address will be submitted */
  ethAddress?: ETHAddress | undefined
}

/** Property describes one property of data spec with a key with its value. */
export interface Property {
  /** name is the name of the property. */
  name: string
  /** value is the value of the property. */
  value: string
  /**
   * An optional decimal place to be be applied on the provided value
   * valid only for PropertyType of type DECIMAL and INTEGER
   */
  numberDecimalPlaces?: number | undefined
}

/**
 * Data describes valid source data that has been received by the node.
 * It represents both matched and unmatched data.
 */
export interface Data {
  signers: Signer[]
  /** data holds all the properties of the data */
  data: Property[]
  /**
   * matched_specs_ids lists all the specs that matched this data.
   * When the array is empty, it means no spec matched this data.
   */
  matchedSpecIds: string[]
  /**
   * broadcast_at is the time at which the data was broadcast to the markets
   * with a matching spec.
   * It has no value when the date did not match any spec.
   * The value is a Unix timestamp in nanoseconds.
   */
  broadcastAt: number
}

export interface ExternalData {
  data: Data | undefined
}
