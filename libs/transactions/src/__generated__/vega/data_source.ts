/* eslint-disable */
import type { Signer } from './data/v1/data'
import type { Condition, Filter, InternalTimeTrigger } from './data/v1/spec'

export const protobufPackage = 'vega'

/**
 * Represents the top level object that handles data sources.
 * Data source definition can be external or internal, with whatever
 * number of data sources are defined for each type in the child objects below.
 */
export interface DataSourceDefinition {
  internal?: DataSourceDefinitionInternal | undefined
  external?: DataSourceDefinitionExternal | undefined
}

/** Internal data source used for emitting timestamps. */
export interface DataSourceSpecConfigurationTime {
  /** Conditions that the timestamps should meet in order to be considered. */
  conditions: Condition[]
}

/** Internal data source used for emitting timestamps automatically using predefined intervals and conditions. */
export interface DataSourceSpecConfigurationTimeTrigger {
  /** Conditions that the timestamps need to meet in order to be considered. */
  conditions: Condition[]
  /** An internal time trigger */
  triggers: InternalTimeTrigger[]
}

/**
 * Top level object used for all internal data sources.
 * It contains one of any of the defined source type variants.
 */
export interface DataSourceDefinitionInternal {
  time?: DataSourceSpecConfigurationTime | undefined
  timeTrigger?: DataSourceSpecConfigurationTimeTrigger | undefined
}

/**
 * DataSourceDefinitionExternal is the top level object used for all external
 * data sources. It contains one of any of the defined `SourceType` variants.
 */
export interface DataSourceDefinitionExternal {
  oracle?: DataSourceSpecConfiguration | undefined
  /** Contains the data specification that is received from Ethereum sources. */
  ethOracle?: EthCallSpec | undefined
}

/**
 * All types of external data sources use the same configuration set for meeting
 * requirements in order for the data to be useful for Vega - valid signatures
 * and matching filters.
 */
export interface DataSourceSpecConfiguration {
  /**
   * Signers is the list of authorized signatures that signed the data for this
   * source. All the signatures in the data source data should be contained in
   * this external source. All the signatures in the data should be contained in
   * this list.
   */
  signers: Signer[]
  /**
   * Filters describes which source data are considered of interest or not for
   * the product (or the risk model).
   */
  filters: Filter[]
}

/**
 * Specifies a data source that derives its content from calling a read method
 * on an Ethereum contract.
 */
export interface EthCallSpec {
  /** Ethereum address of the contract to call. */
  address: string
  /** The ABI of that contract. */
  abi: string
  /** Name of the method on the contract to call. */
  method: string
  /**
   * List of arguments to pass to method call.
   * Protobuf 'Value' wraps an arbitrary JSON type that is mapped to an Ethereum
   * type according to the ABI.
   */
  args: any[]
  /** Conditions for determining when to call the contract method. */
  trigger: EthCallTrigger | undefined
  /** Number of confirmations required before the query is considered verified */
  requiredConfirmations: number
  /** Filters the data returned from the contract method */
  filters: Filter[]
  /**
   * Normalisers are used to convert the data returned from the contract method
   * into a standard format. The key of the map is the name of the property,
   * which identifies the specific piece of data to other parts of the data
   * sourcing framework, for example filters. The value is a JSONPath expression
   * for expressing where in the contract call result the required data is
   * located, for example $[0] indicates the first result. $[1].price would look
   * in the second result returned from the contract for a structure with a key
   * called 'price' and use that if it exists.
   */
  normalisers: Normaliser[]
}

export interface Normaliser {
  name: string
  expression: string
}

/** Determines when the contract method should be called. */
export interface EthCallTrigger {
  timeTrigger?: EthTimeTrigger | undefined
}

/**
 * Trigger for an Ethereum call based on the Ethereum block timestamp. Can be
 * one-off or repeating.
 */
export interface EthTimeTrigger {
  /**
   * Trigger when the Ethereum time is greater or equal to this time, in Unix
   * seconds.
   */
  initial?: number | undefined
  /**
   * Repeat the call every n seconds after the initial call. If no time for
   * initial call was specified, begin repeating immediately.
   */
  every?: number | undefined
  /**
   * If repeating, stop once Ethereum time is greater than this time, in Unix
   * seconds. If not set, then repeat indefinitely.
   */
  until?: number | undefined
}

/**
 * Data source spec describes the data source base that a product or a risk
 * model wants to get from the data source engine. This message contains
 * additional information used by the API.
 */
export interface DataSourceSpec {
  /** Hash generated from the DataSpec data. */
  id: string
  /** Creation date and time */
  createdAt: number
  /** Last Updated timestamp */
  updatedAt: number
  data: DataSourceDefinition | undefined
  /** Status describes the status of the data source spec */
  status: DataSourceSpec_Status
}

/** Status describe the status of the data source spec */
export enum DataSourceSpec_Status {
  /** STATUS_UNSPECIFIED - Default value. */
  STATUS_UNSPECIFIED = 0,
  /** STATUS_ACTIVE - STATUS_ACTIVE describes an active data source spec. */
  STATUS_ACTIVE = 1,
  /**
   * STATUS_DEACTIVATED - STATUS_DEACTIVATED describes a data source spec that is not listening to
   * data anymore.
   */
  STATUS_DEACTIVATED = 2,
  UNRECOGNIZED = -1,
}

export interface ExternalDataSourceSpec {
  spec: DataSourceSpec | undefined
}
