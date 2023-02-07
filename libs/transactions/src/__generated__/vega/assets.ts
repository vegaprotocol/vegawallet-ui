/* eslint-disable */

export const protobufPackage = 'vega'

/** The Vega representation of an external asset */
export interface Asset {
  /** Internal identifier of the asset */
  id: string
  /** The definition of the external source for this asset */
  details: AssetDetails | undefined
  /** Status of the asset */
  status: Asset_Status
}

export enum Asset_Status {
  /** STATUS_UNSPECIFIED - Default value, always invalid */
  STATUS_UNSPECIFIED = 0,
  /** STATUS_PROPOSED - Asset is proposed and under vote */
  STATUS_PROPOSED = 1,
  /** STATUS_REJECTED - Asset has been rejected from governance */
  STATUS_REJECTED = 2,
  /** STATUS_PENDING_LISTING - Asset is pending listing from the bridge */
  STATUS_PENDING_LISTING = 3,
  /** STATUS_ENABLED - Asset is fully usable in the network */
  STATUS_ENABLED = 4,
  UNRECOGNIZED = -1,
}

/** The Vega representation of an external asset */
export interface AssetDetails {
  /** Name of the asset (e.g: Great British Pound) */
  name: string
  /** Symbol of the asset (e.g: GBP) */
  symbol: string
  /** Number of decimal / precision handled by this asset */
  decimals: number
  /** The minimum economically meaningful amount in the asset */
  quantum: string
  /** A built-in asset */
  builtinAsset?: BuiltinAsset | undefined
  /** An Ethereum ERC20 asset */
  erc20?: ERC20 | undefined
}

/** A Vega internal asset */
export interface BuiltinAsset {
  /** Maximum amount that can be requested by a party through the built-in asset faucet at a time */
  maxFaucetAmountMint: string
}

/** An ERC20 token based asset, living on the ethereum network */
export interface ERC20 {
  /** The address of the contract for the token, on the ethereum network */
  contractAddress: string
  /**
   * The lifetime limits deposit per address
   * note: this is a temporary measure that can be changed by governance
   */
  lifetimeLimit: string
  /**
   * The maximum you can withdraw instantly. All withdrawals over the threshold will be delayed by the withdrawal delay.
   * There’s no limit on the size of a withdrawal
   * note: this is a temporary measure that can be changed by governance
   */
  withdrawThreshold: string
}

/** The changes to apply on an existing asset. */
export interface AssetDetailsUpdate {
  /** The minimum economically meaningful amount in the asset */
  quantum: string
  /** An Ethereum ERC20 asset */
  erc20?: ERC20Update | undefined
}

export interface ERC20Update {
  /**
   * The lifetime limits deposit per address.
   * This will be interpreted against the asset decimals.
   * note: this is a temporary measure that can be changed by governance
   */
  lifetimeLimit: string
  /**
   * The maximum you can withdraw instantly. All withdrawals over the threshold will be delayed by the withdrawal delay.
   * There’s no limit on the size of a withdrawal
   * note: this is a temporary measure that can be changed by governance
   */
  withdrawThreshold: string
}
