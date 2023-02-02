/* eslint-disable */
import type { Signer } from './data/v1/data'
import type { Condition, Filter } from './data/v1/spec'

export const protobufPackage = 'vega'

/**
 * DataSourceDefinition represents the top level object that deals with data sources.
 * DataSourceDefinition can be external or internal, with whatever number of data sources are defined
 * for each type in the child objects below.
 */
export interface DataSourceDefinition {
  internal?: DataSourceDefinitionInternal | undefined
  external?: DataSourceDefinitionExternal | undefined
}

/** DataSourceSpecConfigurationTime is the internal data source used for emitting timestamps. */
export interface DataSourceSpecConfigurationTime {
  /** Conditions that the timestamps should meet in order to be considered. */
  conditions: Condition[]
}

/**
 * DataSourceDefinitionInternal is the top level object used for all internal data sources.
 * It contains one of any of the defined `SourceType` variants.
 */
export interface DataSourceDefinitionInternal {
  time?: DataSourceSpecConfigurationTime | undefined
}

/**
 * DataSourceDefinitionExternal is the top level object used for all external data sources.
 * It contains one of any of the defined `SourceType` variants.
 */
export interface DataSourceDefinitionExternal {
  oracle?: DataSourceSpecConfiguration | undefined
}

/**
 * All types of external data sources use the same configuration set for meeting requirements
 * in order for the data to be useful for Vega - valid signatures and matching filters.
 */
export interface DataSourceSpecConfiguration {
  /**
   * signers is the list of authorized signatures that signed the data for this
   * source. All the signatures in the data source data should be contained in this
   * external source. All the signatures in the data should be contained in this list.
   */
  signers: Signer[]
  /**
   * filters describes which source data are considered of interest or not for
   * the product (or the risk model).
   */
  filters: Filter[]
}

/**
 * A data source spec describes the data source base that a product (or a risk model)
 * wants to get from the data source engine.
 * This message contains additional information used by the API.
 */
export interface DataSourceSpec {
  /** id is a hash generated from the DataSpec data. */
  id: string
  /** Creation Date time */
  createdAt: number
  /** Last Updated timestamp */
  updatedAt: number
  data: DataSourceDefinition | undefined
  /** status describes the status of the data source spec */
  status: DataSourceSpec_Status
}

/** Status describe the status of the data source spec */
export enum DataSourceSpec_Status {
  /** STATUS_UNSPECIFIED - The default value. */
  STATUS_UNSPECIFIED = 0,
  /** STATUS_ACTIVE - STATUS_ACTIVE describes an active data source spec. */
  STATUS_ACTIVE = 1,
  /**
   * STATUS_DEACTIVATED - STATUS_DEACTIVATED describes an data source spec that is not listening to data
   * anymore.
   */
  STATUS_DEACTIVATED = 2,
  UNRECOGNIZED = -1,
}

export interface ExternalDataSourceSpec {
  spec: DataSourceSpec | undefined
}
