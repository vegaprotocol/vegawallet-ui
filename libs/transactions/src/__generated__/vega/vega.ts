/* eslint-disable */
import type {
  Market_State,
  Market_TradingMode,
  PriceMonitoringTrigger,
} from './markets'

export const protobufPackage = 'vega'

/** A side relates to the direction of an order, to Buy, or Sell */
export enum Side {
  /** SIDE_UNSPECIFIED - Default value, always invalid */
  SIDE_UNSPECIFIED = 0,
  /** SIDE_BUY - Buy order */
  SIDE_BUY = 1,
  /** SIDE_SELL - Sell order */
  SIDE_SELL = 2,
  UNRECOGNIZED = -1,
}

/** Represents a set of time intervals that are used when querying for candle-stick data */
export enum Interval {
  /** INTERVAL_UNSPECIFIED - Default value, always invalid */
  INTERVAL_UNSPECIFIED = 0,
  /** INTERVAL_I1M - 1 minute. */
  INTERVAL_I1M = 60,
  /** INTERVAL_I5M - 5 minutes. */
  INTERVAL_I5M = 300,
  /** INTERVAL_I15M - 15 minutes. */
  INTERVAL_I15M = 900,
  /** INTERVAL_I1H - 1 hour. */
  INTERVAL_I1H = 3600,
  /** INTERVAL_I6H - 6 hours. */
  INTERVAL_I6H = 21600,
  /** INTERVAL_I1D - 1 day. */
  INTERVAL_I1D = 86400,
  UNRECOGNIZED = -1,
}

/** Auction triggers indicate what condition triggered an auction (if market is in auction mode) */
export enum AuctionTrigger {
  /** AUCTION_TRIGGER_UNSPECIFIED - Default value for AuctionTrigger, no auction triggered */
  AUCTION_TRIGGER_UNSPECIFIED = 0,
  /** AUCTION_TRIGGER_BATCH - Batch auction */
  AUCTION_TRIGGER_BATCH = 1,
  /** AUCTION_TRIGGER_OPENING - Opening auction */
  AUCTION_TRIGGER_OPENING = 2,
  /** AUCTION_TRIGGER_PRICE - Price monitoring trigger */
  AUCTION_TRIGGER_PRICE = 3,
  /** AUCTION_TRIGGER_LIQUIDITY - Liquidity monitoring trigger */
  AUCTION_TRIGGER_LIQUIDITY = 4,
  UNRECOGNIZED = -1,
}

/**
 * A pegged reference defines which price point a pegged order is linked to - meaning
 * the price for a pegged order is calculated from the value of the reference price point
 */
export enum PeggedReference {
  /** PEGGED_REFERENCE_UNSPECIFIED - Default value for PeggedReference, no reference given */
  PEGGED_REFERENCE_UNSPECIFIED = 0,
  /** PEGGED_REFERENCE_MID - Mid price reference */
  PEGGED_REFERENCE_MID = 1,
  /** PEGGED_REFERENCE_BEST_BID - Best bid price reference */
  PEGGED_REFERENCE_BEST_BID = 2,
  /** PEGGED_REFERENCE_BEST_ASK - Best ask price reference */
  PEGGED_REFERENCE_BEST_ASK = 3,
  UNRECOGNIZED = -1,
}

/**
 * OrderError codes are returned in the `[Order](#vega.Order).reason` field - If there is an issue
 * with an order during its life-cycle, it will be marked with `status.ORDER_STATUS_REJECTED`
 */
export enum OrderError {
  /** ORDER_ERROR_UNSPECIFIED - Default value, no error reported */
  ORDER_ERROR_UNSPECIFIED = 0,
  /** ORDER_ERROR_INVALID_MARKET_ID - Order was submitted for a market that does not exist */
  ORDER_ERROR_INVALID_MARKET_ID = 1,
  /** ORDER_ERROR_INVALID_ORDER_ID - Order was submitted with an invalid identifier */
  ORDER_ERROR_INVALID_ORDER_ID = 2,
  /** ORDER_ERROR_OUT_OF_SEQUENCE - Order was amended with a sequence number that was not previous version + 1 */
  ORDER_ERROR_OUT_OF_SEQUENCE = 3,
  /** ORDER_ERROR_INVALID_REMAINING_SIZE - Order was amended with an invalid remaining size (e.g. remaining greater than total size) */
  ORDER_ERROR_INVALID_REMAINING_SIZE = 4,
  /** ORDER_ERROR_TIME_FAILURE - Node was unable to get Vega (blockchain) time */
  ORDER_ERROR_TIME_FAILURE = 5,
  /** ORDER_ERROR_REMOVAL_FAILURE - Failed to remove an order from the book */
  ORDER_ERROR_REMOVAL_FAILURE = 6,
  /**
   * ORDER_ERROR_INVALID_EXPIRATION_DATETIME - An order with `TimeInForce.TIME_IN_FORCE_GTT` was submitted or amended
   * with an expiration that was badly formatted or otherwise invalid
   */
  ORDER_ERROR_INVALID_EXPIRATION_DATETIME = 7,
  /** ORDER_ERROR_INVALID_ORDER_REFERENCE - Order was submitted or amended with an invalid reference field */
  ORDER_ERROR_INVALID_ORDER_REFERENCE = 8,
  /** ORDER_ERROR_EDIT_NOT_ALLOWED - Order amend was submitted for an order field that cannot not be amended (e.g. order identifier) */
  ORDER_ERROR_EDIT_NOT_ALLOWED = 9,
  /** ORDER_ERROR_AMEND_FAILURE - Amend failure because amend details do not match original order */
  ORDER_ERROR_AMEND_FAILURE = 10,
  /** ORDER_ERROR_NOT_FOUND - Order not found in an order book or store */
  ORDER_ERROR_NOT_FOUND = 11,
  /** ORDER_ERROR_INVALID_PARTY_ID - Order was submitted with an invalid or missing party identifier */
  ORDER_ERROR_INVALID_PARTY_ID = 12,
  /** ORDER_ERROR_MARKET_CLOSED - Order was submitted for a market that has closed */
  ORDER_ERROR_MARKET_CLOSED = 13,
  /** ORDER_ERROR_MARGIN_CHECK_FAILED - Order was submitted, but the party did not have enough collateral to cover the order */
  ORDER_ERROR_MARGIN_CHECK_FAILED = 14,
  /** ORDER_ERROR_MISSING_GENERAL_ACCOUNT - Order was submitted, but the party did not have an account for this asset */
  ORDER_ERROR_MISSING_GENERAL_ACCOUNT = 15,
  /** ORDER_ERROR_INTERNAL_ERROR - Unspecified internal error */
  ORDER_ERROR_INTERNAL_ERROR = 16,
  /** ORDER_ERROR_INVALID_SIZE - Order was submitted with an invalid or missing size (e.g. 0) */
  ORDER_ERROR_INVALID_SIZE = 17,
  /** ORDER_ERROR_INVALID_PERSISTENCE - Order was submitted with an invalid persistence for its type */
  ORDER_ERROR_INVALID_PERSISTENCE = 18,
  /** ORDER_ERROR_INVALID_TYPE - Order was submitted with an invalid type field */
  ORDER_ERROR_INVALID_TYPE = 19,
  /** ORDER_ERROR_SELF_TRADING - Order was stopped as it would have traded with another order submitted from the same party */
  ORDER_ERROR_SELF_TRADING = 20,
  /** ORDER_ERROR_INSUFFICIENT_FUNDS_TO_PAY_FEES - Order was submitted, but the party did not have enough collateral to cover the fees for the order */
  ORDER_ERROR_INSUFFICIENT_FUNDS_TO_PAY_FEES = 21,
  /** ORDER_ERROR_INCORRECT_MARKET_TYPE - Order was submitted with an incorrect or invalid market type */
  ORDER_ERROR_INCORRECT_MARKET_TYPE = 22,
  /** ORDER_ERROR_INVALID_TIME_IN_FORCE - Order was submitted with invalid time in force */
  ORDER_ERROR_INVALID_TIME_IN_FORCE = 23,
  /** ORDER_ERROR_CANNOT_SEND_GFN_ORDER_DURING_AN_AUCTION - A GFN order has got to the market when it is in auction mode */
  ORDER_ERROR_CANNOT_SEND_GFN_ORDER_DURING_AN_AUCTION = 24,
  /** ORDER_ERROR_CANNOT_SEND_GFA_ORDER_DURING_CONTINUOUS_TRADING - A GFA order has got to the market when it is in continuous trading mode */
  ORDER_ERROR_CANNOT_SEND_GFA_ORDER_DURING_CONTINUOUS_TRADING = 25,
  /** ORDER_ERROR_CANNOT_AMEND_TO_GTT_WITHOUT_EXPIRYAT - Attempt to amend order to GTT without ExpiryAt */
  ORDER_ERROR_CANNOT_AMEND_TO_GTT_WITHOUT_EXPIRYAT = 26,
  /** ORDER_ERROR_EXPIRYAT_BEFORE_CREATEDAT - Attempt to amend ExpiryAt to a value before CreatedAt */
  ORDER_ERROR_EXPIRYAT_BEFORE_CREATEDAT = 27,
  /** ORDER_ERROR_CANNOT_HAVE_GTC_AND_EXPIRYAT - Attempt to amend to GTC without an ExpiryAt value */
  ORDER_ERROR_CANNOT_HAVE_GTC_AND_EXPIRYAT = 28,
  /** ORDER_ERROR_CANNOT_AMEND_TO_FOK_OR_IOC - Amending to FOK or IOC is invalid */
  ORDER_ERROR_CANNOT_AMEND_TO_FOK_OR_IOC = 29,
  /** ORDER_ERROR_CANNOT_AMEND_TO_GFA_OR_GFN - Amending to GFA or GFN is invalid */
  ORDER_ERROR_CANNOT_AMEND_TO_GFA_OR_GFN = 30,
  /** ORDER_ERROR_CANNOT_AMEND_FROM_GFA_OR_GFN - Amending from GFA or GFN is invalid */
  ORDER_ERROR_CANNOT_AMEND_FROM_GFA_OR_GFN = 31,
  /** ORDER_ERROR_CANNOT_SEND_IOC_ORDER_DURING_AUCTION - IOC orders are not allowed during auction */
  ORDER_ERROR_CANNOT_SEND_IOC_ORDER_DURING_AUCTION = 32,
  /** ORDER_ERROR_CANNOT_SEND_FOK_ORDER_DURING_AUCTION - FOK orders are not allowed during auction */
  ORDER_ERROR_CANNOT_SEND_FOK_ORDER_DURING_AUCTION = 33,
  /** ORDER_ERROR_MUST_BE_LIMIT_ORDER - Pegged orders must be LIMIT orders */
  ORDER_ERROR_MUST_BE_LIMIT_ORDER = 34,
  /** ORDER_ERROR_MUST_BE_GTT_OR_GTC - Pegged orders can only have TIF GTC or GTT */
  ORDER_ERROR_MUST_BE_GTT_OR_GTC = 35,
  /** ORDER_ERROR_WITHOUT_REFERENCE_PRICE - Pegged order must have a reference price */
  ORDER_ERROR_WITHOUT_REFERENCE_PRICE = 36,
  /** ORDER_ERROR_BUY_CANNOT_REFERENCE_BEST_ASK_PRICE - Buy pegged order cannot reference best ask price */
  ORDER_ERROR_BUY_CANNOT_REFERENCE_BEST_ASK_PRICE = 37,
  /** ORDER_ERROR_OFFSET_MUST_BE_GREATER_OR_EQUAL_TO_ZERO - Pegged order offset must be >= 0 */
  ORDER_ERROR_OFFSET_MUST_BE_GREATER_OR_EQUAL_TO_ZERO = 40,
  /** ORDER_ERROR_SELL_CANNOT_REFERENCE_BEST_BID_PRICE - Sell pegged order cannot reference best bid price */
  ORDER_ERROR_SELL_CANNOT_REFERENCE_BEST_BID_PRICE = 41,
  /** ORDER_ERROR_OFFSET_MUST_BE_GREATER_THAN_ZERO - Pegged order offset must be > zero */
  ORDER_ERROR_OFFSET_MUST_BE_GREATER_THAN_ZERO = 42,
  /**
   * ORDER_ERROR_INSUFFICIENT_ASSET_BALANCE - The party has an insufficient balance, or does not have
   * a general account to submit the order (no deposits made
   * for the required asset)
   */
  ORDER_ERROR_INSUFFICIENT_ASSET_BALANCE = 43,
  /** ORDER_ERROR_CANNOT_AMEND_PEGGED_ORDER_DETAILS_ON_NON_PEGGED_ORDER - Cannot amend details of a non pegged details */
  ORDER_ERROR_CANNOT_AMEND_PEGGED_ORDER_DETAILS_ON_NON_PEGGED_ORDER = 44,
  /** ORDER_ERROR_UNABLE_TO_REPRICE_PEGGED_ORDER - Could not re-price a pegged order because a market price is unavailable */
  ORDER_ERROR_UNABLE_TO_REPRICE_PEGGED_ORDER = 45,
  /** ORDER_ERROR_UNABLE_TO_AMEND_PRICE_ON_PEGGED_ORDER - It is not possible to amend the price of an existing pegged order */
  ORDER_ERROR_UNABLE_TO_AMEND_PRICE_ON_PEGGED_ORDER = 46,
  /** ORDER_ERROR_NON_PERSISTENT_ORDER_OUT_OF_PRICE_BOUNDS - An FOK, IOC, or GFN order was rejected because it resulted in trades outside the price bounds */
  ORDER_ERROR_NON_PERSISTENT_ORDER_OUT_OF_PRICE_BOUNDS = 47,
  /** ORDER_ERROR_TOO_MANY_PEGGED_ORDERS - Unable to submit pegged order, temporarily too many pegged orders across all markets */
  ORDER_ERROR_TOO_MANY_PEGGED_ORDERS = 48,
  UNRECOGNIZED = -1,
}

/** The Vega blockchain status as reported by the node the caller is connected to */
export enum ChainStatus {
  /** CHAIN_STATUS_UNSPECIFIED - Default value, always invalid */
  CHAIN_STATUS_UNSPECIFIED = 0,
  /** CHAIN_STATUS_DISCONNECTED - Blockchain is disconnected */
  CHAIN_STATUS_DISCONNECTED = 1,
  /** CHAIN_STATUS_REPLAYING - Blockchain is replaying historic transactions */
  CHAIN_STATUS_REPLAYING = 2,
  /** CHAIN_STATUS_CONNECTED - Blockchain is connected and receiving transactions */
  CHAIN_STATUS_CONNECTED = 3,
  UNRECOGNIZED = -1,
}

/** Various collateral/account types as used by Vega */
export enum AccountType {
  /** ACCOUNT_TYPE_UNSPECIFIED - Default value */
  ACCOUNT_TYPE_UNSPECIFIED = 0,
  /** ACCOUNT_TYPE_INSURANCE - Insurance pool accounts contain insurance pool funds for a market */
  ACCOUNT_TYPE_INSURANCE = 1,
  /** ACCOUNT_TYPE_SETTLEMENT - Settlement accounts exist only during settlement or mark-to-market */
  ACCOUNT_TYPE_SETTLEMENT = 2,
  /**
   * ACCOUNT_TYPE_MARGIN - Margin accounts contain funds set aside for the margin needed to support a party's open positions.
   * Each party will have a margin account for each market they have traded in.
   * The required initial margin is allocated to each market from your general account.
   * Collateral in the margin account can't be withdrawn or used as margin on another market until
   * it is released back to the general account.
   * The Vega protocol uses an internal accounting system to segregate funds held as
   * margin from other funds to ensure they are never lost or 'double spent'
   *
   * Margin account funds will vary as margin requirements on positions change
   */
  ACCOUNT_TYPE_MARGIN = 3,
  /**
   * ACCOUNT_TYPE_GENERAL - General accounts contain the collateral for a party that is not otherwise allocated. A party will
   * have multiple general accounts, one for each asset they want
   * to trade with
   *
   * General accounts are where funds are initially deposited or withdrawn from,
   * it is also the account where funds are taken to fulfil fees and initial margin requirements
   */
  ACCOUNT_TYPE_GENERAL = 4,
  /** ACCOUNT_TYPE_FEES_INFRASTRUCTURE - Infrastructure accounts contain fees earned by providing infrastructure on Vega */
  ACCOUNT_TYPE_FEES_INFRASTRUCTURE = 5,
  /** ACCOUNT_TYPE_FEES_LIQUIDITY - Liquidity accounts contain fees earned by providing liquidity on Vega markets */
  ACCOUNT_TYPE_FEES_LIQUIDITY = 6,
  /**
   * ACCOUNT_TYPE_FEES_MAKER - This account is created to hold fees earned by placing orders that sit on the book
   * and are then matched with an incoming order to create a trade - These fees reward parties
   * who provide the best priced liquidity that actually allows trading to take place
   */
  ACCOUNT_TYPE_FEES_MAKER = 7,
  /** ACCOUNT_TYPE_BOND - This account is created to maintain liquidity providers funds commitments */
  ACCOUNT_TYPE_BOND = 9,
  /** ACCOUNT_TYPE_EXTERNAL - External account represents an external source (deposit/withdrawal) */
  ACCOUNT_TYPE_EXTERNAL = 10,
  /** ACCOUNT_TYPE_GLOBAL_INSURANCE - Global insurance account for the asset */
  ACCOUNT_TYPE_GLOBAL_INSURANCE = 11,
  /** ACCOUNT_TYPE_GLOBAL_REWARD - Global reward account for the asset */
  ACCOUNT_TYPE_GLOBAL_REWARD = 12,
  /** ACCOUNT_TYPE_PENDING_TRANSFERS - Per asset account used to store pending transfers (if any) */
  ACCOUNT_TYPE_PENDING_TRANSFERS = 13,
  /** ACCOUNT_TYPE_REWARD_MAKER_PAID_FEES - Per asset reward account for fees paid to makers */
  ACCOUNT_TYPE_REWARD_MAKER_PAID_FEES = 14,
  /** ACCOUNT_TYPE_REWARD_MAKER_RECEIVED_FEES - Per asset reward account for fees received by makers */
  ACCOUNT_TYPE_REWARD_MAKER_RECEIVED_FEES = 15,
  /** ACCOUNT_TYPE_REWARD_LP_RECEIVED_FEES - Per asset reward account for fees received by liquidity providers */
  ACCOUNT_TYPE_REWARD_LP_RECEIVED_FEES = 16,
  /** ACCOUNT_TYPE_REWARD_MARKET_PROPOSERS - Per asset reward account for market proposers when the market goes above some trading threshold */
  ACCOUNT_TYPE_REWARD_MARKET_PROPOSERS = 17,
  UNRECOGNIZED = -1,
}

/** Transfers can occur between parties on Vega, these are the types that indicate why a transfer took place */
export enum TransferType {
  /** TRANSFER_TYPE_UNSPECIFIED - Default value, always invalid */
  TRANSFER_TYPE_UNSPECIFIED = 0,
  /** TRANSFER_TYPE_LOSS - Funds deducted after final settlement loss */
  TRANSFER_TYPE_LOSS = 1,
  /** TRANSFER_TYPE_WIN - Funds added to general account after final settlement gain */
  TRANSFER_TYPE_WIN = 2,
  /** TRANSFER_TYPE_MTM_LOSS - Funds deducted from margin account after mark to market loss */
  TRANSFER_TYPE_MTM_LOSS = 4,
  /** TRANSFER_TYPE_MTM_WIN - Funds added to margin account after mark to market gain */
  TRANSFER_TYPE_MTM_WIN = 5,
  /** TRANSFER_TYPE_MARGIN_LOW - Funds transferred from general account to meet margin requirement */
  TRANSFER_TYPE_MARGIN_LOW = 6,
  /** TRANSFER_TYPE_MARGIN_HIGH - Excess margin amount returned to general account */
  TRANSFER_TYPE_MARGIN_HIGH = 7,
  /** TRANSFER_TYPE_MARGIN_CONFISCATED - Margin confiscated from margin account to fulfil closeout */
  TRANSFER_TYPE_MARGIN_CONFISCATED = 8,
  /** TRANSFER_TYPE_MAKER_FEE_PAY - Maker fee paid from general account */
  TRANSFER_TYPE_MAKER_FEE_PAY = 9,
  /** TRANSFER_TYPE_MAKER_FEE_RECEIVE - Maker fee received into general account */
  TRANSFER_TYPE_MAKER_FEE_RECEIVE = 10,
  /** TRANSFER_TYPE_INFRASTRUCTURE_FEE_PAY - Infrastructure fee paid from general account */
  TRANSFER_TYPE_INFRASTRUCTURE_FEE_PAY = 11,
  /** TRANSFER_TYPE_INFRASTRUCTURE_FEE_DISTRIBUTE - Infrastructure fee received into general account */
  TRANSFER_TYPE_INFRASTRUCTURE_FEE_DISTRIBUTE = 12,
  /** TRANSFER_TYPE_LIQUIDITY_FEE_PAY - Liquidity fee paid from general account */
  TRANSFER_TYPE_LIQUIDITY_FEE_PAY = 13,
  /** TRANSFER_TYPE_LIQUIDITY_FEE_DISTRIBUTE - Liquidity fee received into general account */
  TRANSFER_TYPE_LIQUIDITY_FEE_DISTRIBUTE = 14,
  /** TRANSFER_TYPE_BOND_LOW - Bond account funded from general account to meet required bond amount */
  TRANSFER_TYPE_BOND_LOW = 15,
  /** TRANSFER_TYPE_BOND_HIGH - Bond returned to general account after liquidity commitment was reduced */
  TRANSFER_TYPE_BOND_HIGH = 16,
  /** TRANSFER_TYPE_WITHDRAW - Funds withdrawn from general account */
  TRANSFER_TYPE_WITHDRAW = 18,
  /** TRANSFER_TYPE_DEPOSIT - Funds deposited to general account */
  TRANSFER_TYPE_DEPOSIT = 19,
  /** TRANSFER_TYPE_BOND_SLASHING - Bond account penalised when liquidity commitment not met */
  TRANSFER_TYPE_BOND_SLASHING = 20,
  /** TRANSFER_TYPE_REWARD_PAYOUT - Reward payout received */
  TRANSFER_TYPE_REWARD_PAYOUT = 21,
  /** TRANSFER_TYPE_TRANSFER_FUNDS_SEND - A network internal instruction for the collateral engine to move funds from a user's general account into the pending transfers pool */
  TRANSFER_TYPE_TRANSFER_FUNDS_SEND = 22,
  /** TRANSFER_TYPE_TRANSFER_FUNDS_DISTRIBUTE - A network internal instruction for the collateral engine to move funds from the pending transfers pool account into the destination account */
  TRANSFER_TYPE_TRANSFER_FUNDS_DISTRIBUTE = 23,
  /** TRANSFER_TYPE_CLEAR_ACCOUNT - Market-related accounts emptied because market has closed */
  TRANSFER_TYPE_CLEAR_ACCOUNT = 24,
  /** TRANSFER_TYPE_CHECKPOINT_BALANCE_RESTORE - Balances restored after network restart */
  TRANSFER_TYPE_CHECKPOINT_BALANCE_RESTORE = 25,
  UNRECOGNIZED = -1,
}

export enum DispatchMetric {
  DISPATCH_METRIC_UNSPECIFIED = 0,
  /** DISPATCH_METRIC_MAKER_FEES_PAID - Dispatch metric that is using the total maker fees paid in the market */
  DISPATCH_METRIC_MAKER_FEES_PAID = 1,
  /** DISPATCH_METRIC_MAKER_FEES_RECEIVED - Dispatch metric that is using the total maker fees received in the market */
  DISPATCH_METRIC_MAKER_FEES_RECEIVED = 2,
  /** DISPATCH_METRIC_LP_FEES_RECEIVED - Dispatch metric that is using the total LP fees received in the market */
  DISPATCH_METRIC_LP_FEES_RECEIVED = 3,
  /** DISPATCH_METRIC_MARKET_VALUE - Dispatch metric that is using total value of the market if above the required threshold and not paid given proposer bonus yet */
  DISPATCH_METRIC_MARKET_VALUE = 4,
  UNRECOGNIZED = -1,
}

/** Node status type */
export enum NodeStatus {
  NODE_STATUS_UNSPECIFIED = 0,
  /** NODE_STATUS_VALIDATOR - The node is validating */
  NODE_STATUS_VALIDATOR = 1,
  /** NODE_STATUS_NON_VALIDATOR - The node is non-validating */
  NODE_STATUS_NON_VALIDATOR = 2,
  UNRECOGNIZED = -1,
}

/** What epoch action has occurred */
export enum EpochAction {
  EPOCH_ACTION_UNSPECIFIED = 0,
  /** EPOCH_ACTION_START - The epoch update is for a new epoch */
  EPOCH_ACTION_START = 1,
  /** EPOCH_ACTION_END - The epoch update is for the end of an epoch */
  EPOCH_ACTION_END = 2,
  UNRECOGNIZED = -1,
}

/** Validation status of the node */
export enum ValidatorNodeStatus {
  VALIDATOR_NODE_STATUS_UNSPECIFIED = 0,
  /** VALIDATOR_NODE_STATUS_TENDERMINT - The node is a tendermint validator */
  VALIDATOR_NODE_STATUS_TENDERMINT = 1,
  /** VALIDATOR_NODE_STATUS_ERSATZ - The node is an ersatz validator */
  VALIDATOR_NODE_STATUS_ERSATZ = 2,
  /** VALIDATOR_NODE_STATUS_PENDING - The node is a pending validator */
  VALIDATOR_NODE_STATUS_PENDING = 3,
  UNRECOGNIZED = -1,
}

/** A party represents an entity who wishes to trade on or query a Vega network */
export interface Party {
  /** A unique identifier for the party, typically represented by a public key */
  id: string
}

/** Risk factors are used to calculate the current risk associated with orders trading on a given market */
export interface RiskFactor {
  /** Market ID that relates to this risk factor */
  market: string
  /** Short Risk factor value */
  short: string
  /** Long Risk factor value */
  long: string
}

/**
 * Pegged orders are limit orders where the price is specified in the form REFERENCE +/- OFFSET
 * They can be used for any limit order that is valid during continuous trading
 */
export interface PeggedOrder {
  /** The price point the order is linked to */
  reference: PeggedReference
  /** Offset from the price reference */
  offset: string
}

/** An order can be submitted, amended and cancelled on Vega in an attempt to make trades with other parties */
export interface Order {
  /** Unique identifier for the order (set by the system after consensus) */
  id: string
  /** Market identifier for the order */
  marketId: string
  /** Party identifier for the order */
  partyId: string
  /** Side for the order, e.g. SIDE_BUY or SIDE_SELL */
  side: Side
  /**
   * Price for the order, the price is an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  price: string
  /** Size for the order, for example, in a futures market the size equals the number of contracts */
  size: number
  /** Size remaining, when this reaches 0 then the order is fully filled and status becomes STATUS_FILLED */
  remaining: number
  /**
   * Time in force indicates how long an order will remain active before it is executed or expires.
   * - See OrderTimeInForce
   */
  timeInForce: Order_TimeInForce
  /** Type for the order - See OrderType */
  type: Order_Type
  /** Timestamp for when the order was created at, in nanoseconds since the epoch */
  createdAt: number
  /**
   * The current status for the order.
   * - For detail on `STATUS_REJECTED` please check the OrderError value given in the `reason` field
   */
  status: Order_Status
  /** Timestamp for when the order will expire, in nanoseconds since the epoch */
  expiresAt: number
  /**
   * Reference given for the order, this is typically used to retrieve an order submitted through consensus
   * - Currently set internally by the node to return a unique reference identifier for the order submission
   */
  reference: string
  /**
   * If the Order `status` is `STATUS_REJECTED` then an OrderError reason will be specified
   * - The default for this field is `ORDER_ERROR_NONE` which signifies that there were no errors
   */
  reason?: OrderError | undefined
  /**
   * Timestamp for when the order was last updated, in nanoseconds since the epoch
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  updatedAt: number
  /** The version for the order, initial value is version 1 and is incremented after each successful amend */
  version: number
  /**
   * Batch identifier for the order, used internally for orders submitted during auctions
   * to keep track of the auction batch this order falls under (required for fees calculation)
   */
  batchId: number
  /** Pegged order details, used only if the order represents a pegged order. */
  peggedOrder: PeggedOrder | undefined
  /** Is this order created as part of a liquidity provision, will be empty if not. */
  liquidityProvisionId: string
}

/** Time In Force for an order */
export enum Order_TimeInForce {
  /** TIME_IN_FORCE_UNSPECIFIED - Default value for TimeInForce, can be valid for an amend */
  TIME_IN_FORCE_UNSPECIFIED = 0,
  /**
   * TIME_IN_FORCE_GTC - Good until cancelled, the order trades any amount and as much as possible
   * and remains on the book until it either trades completely or is cancelled
   */
  TIME_IN_FORCE_GTC = 1,
  /**
   * TIME_IN_FORCE_GTT - Good until specified time, this order type trades any amount and as much as possible
   * and remains on the book until it either trades completely, is cancelled, or expires at a set time
   * NOTE: this may in future be multiple types or have sub types for orders that provide different ways of specifying expiry
   */
  TIME_IN_FORCE_GTT = 2,
  /**
   * TIME_IN_FORCE_IOC - Immediate or cancel, the order trades any amount and as much as possible
   * but does not remain on the book (whether it trades or not)
   */
  TIME_IN_FORCE_IOC = 3,
  /**
   * TIME_IN_FORCE_FOK - Fill or kill, The order either trades completely (remainingSize == 0 after adding)
   * or not at all, does not remain on the book if it doesn't trade
   */
  TIME_IN_FORCE_FOK = 4,
  /** TIME_IN_FORCE_GFA - Good for auction, this order is only accepted during an auction period */
  TIME_IN_FORCE_GFA = 5,
  /** TIME_IN_FORCE_GFN - Good for normal, this order is only accepted during normal trading (that can be continuous trading or frequent batched auctions) */
  TIME_IN_FORCE_GFN = 6,
  UNRECOGNIZED = -1,
}

/** Type values for an order */
export enum Order_Type {
  /** TYPE_UNSPECIFIED - Default value, always invalid */
  TYPE_UNSPECIFIED = 0,
  /** TYPE_LIMIT - Used for Limit orders */
  TYPE_LIMIT = 1,
  /** TYPE_MARKET - Used for Market orders */
  TYPE_MARKET = 2,
  /** TYPE_NETWORK - Used for orders where the initiating party is the network (with distressed parties) */
  TYPE_NETWORK = 3,
  UNRECOGNIZED = -1,
}

/** Status values for an order */
export enum Order_Status {
  /** STATUS_UNSPECIFIED - Default value, always invalid */
  STATUS_UNSPECIFIED = 0,
  /** STATUS_ACTIVE - Used for active unfilled or partially filled orders */
  STATUS_ACTIVE = 1,
  /** STATUS_EXPIRED - Used for expired GTT orders */
  STATUS_EXPIRED = 2,
  /** STATUS_CANCELLED - Used for orders cancelled by the party that created the order */
  STATUS_CANCELLED = 3,
  /** STATUS_STOPPED - Used for unfilled FOK or IOC orders, and for orders that were stopped by the network */
  STATUS_STOPPED = 4,
  /** STATUS_FILLED - Used for closed fully filled orders */
  STATUS_FILLED = 5,
  /** STATUS_REJECTED - Used for orders when not enough collateral was available to fill the margin requirements */
  STATUS_REJECTED = 6,
  /** STATUS_PARTIALLY_FILLED - Used for closed partially filled IOC orders */
  STATUS_PARTIALLY_FILLED = 7,
  /** STATUS_PARKED - Order has been removed from the order book and has been parked, this applies to pegged orders only */
  STATUS_PARKED = 8,
  UNRECOGNIZED = -1,
}

/** Used when cancelling an order */
export interface OrderCancellationConfirmation {
  /** The order that was cancelled */
  order: Order | undefined
}

/** Used when confirming an order */
export interface OrderConfirmation {
  /** The order that was confirmed */
  order: Order | undefined
  /** 0 or more trades that were emitted */
  trades: Trade[]
  /** 0 or more passive orders that were affected */
  passiveOrdersAffected: Order[]
}

/** AuctionIndicativeState is used to emit an event with the indicative price/volume per market during an auction */
export interface AuctionIndicativeState {
  /** The market identifier for which this state relates to */
  marketId: string
  /** The Indicative Uncrossing Price is the price at which all trades would occur if the auction uncrossed now */
  indicativePrice: string
  /** The Indicative Uncrossing Volume is the volume available at the Indicative crossing price if the auction uncrossed now */
  indicativeVolume: number
  /** The timestamp at which the auction started */
  auctionStart: number
  /** The timestamp at which the auction is meant to stop */
  auctionEnd: number
}

/** A trade occurs when an aggressive order crosses one or more passive orders on the order book for a market on Vega */
export interface Trade {
  /** Unique identifier for the trade (generated by Vega) */
  id: string
  /** Market identifier (the market that the trade occurred on) */
  marketId: string
  /**
   * Price for the trade, the price is an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  price: string
  /** Size filled for the trade */
  size: number
  /** Unique party identifier for the buyer */
  buyer: string
  /** Unique party identifier for the seller */
  seller: string
  /** Direction of the aggressive party e.g. SIDE_BUY or SIDE_SELL - See [`Side`](#vega.Side) */
  aggressor: Side
  /** Identifier of the order from the buy side */
  buyOrder: string
  /** Identifier of the order from the sell side */
  sellOrder: string
  /**
   * Timestamp for when the trade occurred, in nanoseconds since the epoch
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  timestamp: number
  /** Type for the trade - See [`Trade.Type`](#vega.Trade.Type) */
  type: Trade_Type
  /** Fee amount charged to the buyer party for the trade */
  buyerFee: Fee | undefined
  /** Fee amount charged to the seller party for the trade */
  sellerFee: Fee | undefined
  /** Auction batch number that the buy side order was placed in */
  buyerAuctionBatch: number
  /** Auction batch number that the sell side order was placed in */
  sellerAuctionBatch: number
}

/** Type values for a trade */
export enum Trade_Type {
  /** TYPE_UNSPECIFIED - Default value, always invalid */
  TYPE_UNSPECIFIED = 0,
  /** TYPE_DEFAULT - Normal trading between two parties */
  TYPE_DEFAULT = 1,
  /**
   * TYPE_NETWORK_CLOSE_OUT_GOOD - Trading initiated by the network with another party on the book,
   * which helps to zero-out the positions of one or more distressed parties
   */
  TYPE_NETWORK_CLOSE_OUT_GOOD = 2,
  /**
   * TYPE_NETWORK_CLOSE_OUT_BAD - Trading initiated by the network with another party off the book,
   * with a distressed party in order to zero-out the position of the party
   */
  TYPE_NETWORK_CLOSE_OUT_BAD = 3,
  UNRECOGNIZED = -1,
}

/** Represents any fees paid by a party, resulting from a trade */
export interface Fee {
  /** Fee amount paid to the non-aggressive party of the trade */
  makerFee: string
  /** Fee amount paid for maintaining the Vega infrastructure */
  infrastructureFee: string
  /** Fee amount paid to market makers */
  liquidityFee: string
}

export interface TradeSet {
  /** A set of one or more trades */
  trades: Trade[]
}

/**
 * Represents the high, low, open, and closing prices for an interval of trading,
 * referred to commonly as a candlestick or candle
 */
export interface Candle {
  /**
   * Timestamp for the point in time when the candle was initially created/opened, in nanoseconds since the epoch
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  timestamp: number
  /** An ISO-8601 datetime with nanosecond precision for when the candle was last updated */
  datetime: string
  /** Highest price for trading during the candle interval */
  high: string
  /** Lowest price for trading during the candle interval */
  low: string
  /** Open trade price */
  open: string
  /** Closing trade price */
  close: string
  /** Total trading volume during the candle interval */
  volume: number
  /** Time interval for the candle - See [`Interval`](#vega.Interval) */
  interval: Interval
}

/** Represents a price level from market depth or order book data */
export interface PriceLevel {
  /**
   * Price for the price level, the price is an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  price: string
  /** Number of orders at the price level */
  numberOfOrders: number
  /** Volume at the price level */
  volume: number
}

/** Represents market depth or order book data for the specified market on Vega */
export interface MarketDepth {
  /** Market identifier */
  marketId: string
  /** Collection of price levels for the buy side of the book */
  buy: PriceLevel[]
  /** Collection of price levels for the sell side of the book */
  sell: PriceLevel[]
  /** Sequence number for the market depth data returned */
  sequenceNumber: number
}

/** Represents the changed market depth since the last update */
export interface MarketDepthUpdate {
  /** Market identifier */
  marketId: string
  /** Collection of updated price levels for the buy side of the book */
  buy: PriceLevel[]
  /** Collection of updated price levels for the sell side of the book */
  sell: PriceLevel[]
  /** Sequence number for the market depth update data returned. It is increasing but not monotonic */
  sequenceNumber: number
  /** Sequence number of the previous market depth update, for checking there are no gaps */
  previousSequenceNumber: number
}

/** Represents position data for a party on the specified market on Vega */
export interface Position {
  /** Market identifier */
  marketId: string
  /** Party identifier */
  partyId: string
  /** Open volume for the position, value is signed +ve for long and -ve for short */
  openVolume: number
  /** Realised profit and loss for the position, value is signed +ve for long and -ve for short */
  realisedPnl: string
  /** Unrealised profit and loss for the position, value is signed +ve for long and -ve for short */
  unrealisedPnl: string
  /**
   * Average entry price for the position, the price is an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  averageEntryPrice: string
  /** Timestamp for the latest time the position was updated */
  updatedAt: number
}

export interface PositionTrade {
  /** Volume for the position trade, value is signed +ve for long and -ve for short */
  volume: number
  /**
   * Price for the position trade, the price is an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  price: string
}

/** A deposit on to the Vega network */
export interface Deposit {
  /** Unique identifier for the deposit */
  id: string
  /** Status of the deposit */
  status: Deposit_Status
  /** Party identifier of the user initiating the deposit */
  partyId: string
  /** The Vega asset targeted by this deposit */
  asset: string
  /** The amount to be deposited */
  amount: string
  /** The hash of the transaction from the foreign chain */
  txHash: string
  /** Timestamp for when the Vega account was updated with the deposit */
  creditedTimestamp: number
  /** Timestamp for when the deposit was created on the Vega network */
  createdTimestamp: number
}

/** The status of the deposit */
export enum Deposit_Status {
  /** STATUS_UNSPECIFIED - Default value, always invalid */
  STATUS_UNSPECIFIED = 0,
  /** STATUS_OPEN - The deposit is being processed by the network */
  STATUS_OPEN = 1,
  /** STATUS_CANCELLED - The deposit has been cancelled by the network */
  STATUS_CANCELLED = 2,
  /** STATUS_FINALIZED - The deposit has been finalised and accounts have been updated */
  STATUS_FINALIZED = 3,
  UNRECOGNIZED = -1,
}

/** A withdrawal from the Vega network */
export interface Withdrawal {
  /** Unique identifier for the withdrawal */
  id: string
  /** Unique party identifier of the user initiating the withdrawal */
  partyId: string
  /** The amount to be withdrawn */
  amount: string
  /** The asset to withdraw funds from */
  asset: string
  /** The status of the withdrawal */
  status: Withdrawal_Status
  /**
   * The reference which is used by the foreign chain
   * to refer to this withdrawal
   */
  ref: string
  /** The hash of the foreign chain for this transaction */
  txHash: string
  /** Timestamp for when the network started to process this withdrawal */
  createdTimestamp: number
  /** Timestamp for when the withdrawal was finalised by the network */
  withdrawnTimestamp: number
  /** Foreign chain specifics */
  ext: WithdrawExt | undefined
}

/** The status of the withdrawal */
export enum Withdrawal_Status {
  /** STATUS_UNSPECIFIED - Default value, always invalid */
  STATUS_UNSPECIFIED = 0,
  /** STATUS_OPEN - The withdrawal is open and being processed by the network */
  STATUS_OPEN = 1,
  /** STATUS_REJECTED - The withdrawal have been cancelled */
  STATUS_REJECTED = 2,
  /**
   * STATUS_FINALIZED - The withdrawal went through and is fully finalised, the funds are removed from the
   * Vega network and are unlocked on the foreign chain bridge, for example, on the Ethereum network
   */
  STATUS_FINALIZED = 3,
  UNRECOGNIZED = -1,
}

/** Withdrawal external details */
export interface WithdrawExt {
  /** ERC20 withdrawal details */
  erc20?: Erc20WithdrawExt | undefined
}

/** An extension of data required for the withdraw submissions */
export interface Erc20WithdrawExt {
  /** The address into which the bridge will release the funds */
  receiverAddress: string
}

/** Represents an account for an asset on Vega for a particular owner or party */
export interface Account {
  /** Unique account identifier (used internally by Vega) */
  id: string
  /**
   * The party that the account belongs to, special values include `network`, which represents the Vega network and is
   * most commonly seen during liquidation of distressed trading positions
   */
  owner: string
  /**
   * Balance of the asset, the balance is an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   * and importantly balances cannot be negative
   */
  balance: string
  /** Asset identifier for the account */
  asset: string
  /** Market identifier for the account, if [`AccountType`](#vega.AccountType).`ACCOUNT_TYPE_GENERAL` this will be empty */
  marketId: string
  /** The account type related to this account */
  type: AccountType
}

/** Asset value information used within a transfer */
export interface FinancialAmount {
  /** A signed integer amount of asset */
  amount: string
  /** Asset identifier */
  asset: string
}

/** Represents a financial transfer within Vega */
export interface Transfer {
  /** Party identifier for the owner of the transfer */
  owner: string
  /** A financial amount (of an asset) to transfer */
  amount: FinancialAmount | undefined
  /** The type of transfer, gives the reason for the transfer */
  type: TransferType
  /** A minimum amount */
  minAmount: string
  /** optional dispatch strategy */
  marketId: string
}

export interface DispatchStrategy {
  /** The asset to use for metric */
  assetForMetric: string
  /** The metric to apply */
  metric: DispatchMetric
  /** Optional markets in scope */
  markets: string[]
}

/** Represents a request to transfer from one set of accounts to another */
export interface TransferRequest {
  /** One or more accounts to transfer from */
  fromAccount: Account[]
  /** One or more accounts to transfer to */
  toAccount: Account[]
  /** An amount to transfer for the asset */
  amount: string
  /** A minimum amount */
  minAmount: string
  /** Asset identifier */
  asset: string
  /** The type of the request for transfer */
  type: TransferType
}

export interface AccountDetails {
  assetId: string
  type: AccountType
  /** not specified if network account */
  owner?: string | undefined
  /** not specified is account is not related to a market */
  marketId?: string | undefined
}

/** Represents a ledger entry on Vega */
export interface LedgerEntry {
  /** One or more accounts to transfer from */
  fromAccount: AccountDetails | undefined
  /** One or more accounts to transfer to */
  toAccount: AccountDetails | undefined
  /** An amount to transfer */
  amount: string
  /** Transfer type for this entry */
  type: TransferType
  /** Timestamps */
  timestamp: number
  /** Sender account balance after the transfer */
  fromAccountBalance: string
  /** Receiver account balance after the transfer */
  toAccountBalance: string
}

/** Represents the balance for an account during a transfer */
export interface PostTransferBalance {
  /** The account relating to the transfer */
  account: AccountDetails | undefined
  /** The balance relating to the transfer */
  balance: string
}

export interface LedgerMovement {
  entries: LedgerEntry[]
  balances: PostTransferBalance[]
}

/** Represents the margin levels for a party on a market at a given time */
export interface MarginLevels {
  /** Maintenance margin value */
  maintenanceMargin: string
  /** Search level value */
  searchLevel: string
  /** Initial margin value */
  initialMargin: string
  /** Collateral release level value */
  collateralReleaseLevel: string
  /** Party identifier */
  partyId: string
  /** Market identifier */
  marketId: string
  /** Asset identifier */
  asset: string
  /**
   * Timestamp for the time the ledger entry was created, in nanoseconds since the epoch
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  timestamp: number
}

/** Represents data generated by a market when open */
export interface MarketData {
  /**
   * Mark price, as an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  markPrice: string
  /**
   * Highest price level on an order book for buy orders, as an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  bestBidPrice: string
  /** Aggregated volume being bid at the best bid price */
  bestBidVolume: number
  /** Lowest price level on an order book for offer orders */
  bestOfferPrice: string
  /**
   * Aggregated volume being offered at the best offer price, as an integer, for example `123456` is a correctly
   *  // formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  bestOfferVolume: number
  /** Highest price on the order book for buy orders not including pegged orders */
  bestStaticBidPrice: string
  /** Total volume at the best static bid price excluding pegged orders */
  bestStaticBidVolume: number
  /** Lowest price on the order book for sell orders not including pegged orders */
  bestStaticOfferPrice: string
  /** Total volume at the best static offer price excluding pegged orders */
  bestStaticOfferVolume: number
  /**
   * Arithmetic average of the best bid price and best offer price, as an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places
   */
  midPrice: string
  /** Arithmetic average of the best static bid price and best static offer price */
  staticMidPrice: string
  /** Market identifier for the data */
  market: string
  /**
   * Timestamp at which this mark price was relevant, in nanoseconds since the epoch
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  timestamp: number
  /** The sum of the size of all positions greater than 0 on the market */
  openInterest: number
  /** Time in seconds until the end of the auction (0 if currently not in auction period) */
  auctionEnd: number
  /** Time until next auction, or start time of the current auction if market is in auction period */
  auctionStart: number
  /** Indicative price (zero if not in auction) */
  indicativePrice: string
  /** Indicative volume (zero if not in auction) */
  indicativeVolume: number
  /** The current trading mode for the market */
  marketTradingMode: Market_TradingMode
  /** When a market is in an auction trading mode, this field indicates what triggered the auction */
  trigger: AuctionTrigger
  /** When a market auction is extended, this field indicates what caused the extension */
  extensionTrigger: AuctionTrigger
  /** Targeted stake for the given market */
  targetStake: string
  /** Available stake for the given market */
  suppliedStake: string
  /** One or more price monitoring bounds for the current timestamp */
  priceMonitoringBounds: PriceMonitoringBounds[]
  /** the market value proxy */
  marketValueProxy: string
  /** the equity like share of liquidity fee for each liquidity provider */
  liquidityProviderFeeShare: LiquidityProviderFeeShare[]
  /** The current state of the market */
  marketState: Market_State
  /** next MTM timestamp */
  nextMarkToMarket: number
  /** last traded price of the market */
  lastTradedPrice: string
}

/** The equity like share of liquidity fee for each liquidity provider */
export interface LiquidityProviderFeeShare {
  /** The liquidity provider party id */
  party: string
  /** The share own by this liquidity provider (float) */
  equityLikeShare: string
  /** The average entry valuation of the liquidity provider for the market */
  averageEntryValuation: string
  /** The average liquidity score */
  averageScore: string
}

/** Represents a list of valid (at the current timestamp) price ranges per associated trigger */
export interface PriceMonitoringBounds {
  /** Minimum price that isn't currently breaching the specified price monitoring trigger */
  minValidPrice: string
  /** Maximum price that isn't currently breaching the specified price monitoring trigger */
  maxValidPrice: string
  /** Price monitoring trigger associated with the bounds */
  trigger: PriceMonitoringTrigger | undefined
  /** Reference price used to calculate the valid price range */
  referencePrice: string
}

/** Represents Vega domain specific error information over gRPC/Protobuf */
export interface ErrorDetail {
  /** A Vega API domain specific unique error code, useful for client side mappings, e.g. 10004 */
  code: number
  /** A message that describes the error in more detail, should describe the problem encountered */
  message: string
  /** Any inner error information that could add more context, or be helpful for error reporting */
  inner: string
}

/** Represents a network parameter on Vega */
export interface NetworkParameter {
  /** The unique key */
  key: string
  /** The value for the network parameter */
  value: string
}

/** Network limits, defined in the genesis file */
export interface NetworkLimits {
  /** Are market proposals allowed at this point in time */
  canProposeMarket: boolean
  /** Are asset proposals allowed at this point in time */
  canProposeAsset: boolean
  /** Are market proposals enabled on this chain */
  proposeMarketEnabled: boolean
  /** Are asset proposals enabled on this chain */
  proposeAssetEnabled: boolean
  /** True once the genesis file is loaded */
  genesisLoaded: boolean
  /** The date/timestamp in unix nanoseconds at which market proposals will be enabled (0 indicates not set) */
  proposeMarketEnabledFrom: number
  /** The date/timestamp in unix nanoseconds at which asset proposals will be enabled (0 indicates not set) */
  proposeAssetEnabledFrom: number
}

/** Represents a liquidity order */
export interface LiquidityOrder {
  /** The pegged reference point for the order */
  reference: PeggedReference
  /** The relative proportion of the commitment to be allocated at a price level */
  proportion: number
  /** The offset/amount of units away for the order */
  offset: string
}

/** A pair of a liquidity order and the ID of the generated order by the core */
export interface LiquidityOrderReference {
  /** Unique identifier of the pegged order generated by the core to fulfil this liquidity order */
  orderId: string
  /** The liquidity order from the original submission */
  liquidityOrder: LiquidityOrder | undefined
}

/** An Liquidity provider commitment */
export interface LiquidityProvision {
  /** Unique identifier */
  id: string
  /** Unique party identifier for the creator of the provision */
  partyId: string
  /**
   * Timestamp for when the order was created at, in nanoseconds since the epoch
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  createdAt: number
  /**
   * Timestamp for when the order was updated at, in nanoseconds since the epoch
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  updatedAt: number
  /** Market identifier for the order, required field */
  marketId: string
  /** Specified as a unitless number that represents the amount of settlement asset of the market */
  commitmentAmount: string
  /** Nominated liquidity fee factor, which is an input to the calculation of taker fees on the market, as per setting fees and rewarding liquidity providers */
  fee: string
  /** A set of liquidity sell orders to meet the liquidity provision obligation */
  sells: LiquidityOrderReference[]
  /** A set of liquidity buy orders to meet the liquidity provision obligation */
  buys: LiquidityOrderReference[]
  /** Version of this liquidity provision order */
  version: number
  /** Status of this liquidity provision order */
  status: LiquidityProvision_Status
  /** A reference shared between this liquidity provision and all its orders */
  reference: string
}

/** Status of a liquidity provision order */
export enum LiquidityProvision_Status {
  /** STATUS_UNSPECIFIED - The default value */
  STATUS_UNSPECIFIED = 0,
  /** STATUS_ACTIVE - The liquidity provision is active */
  STATUS_ACTIVE = 1,
  /** STATUS_STOPPED - The liquidity provision was stopped by the network */
  STATUS_STOPPED = 2,
  /** STATUS_CANCELLED - The liquidity provision was cancelled by the liquidity provider */
  STATUS_CANCELLED = 3,
  /** STATUS_REJECTED - The liquidity provision was invalid and got rejected */
  STATUS_REJECTED = 4,
  /** STATUS_UNDEPLOYED - The liquidity provision is valid and accepted by network, but orders aren't deployed */
  STATUS_UNDEPLOYED = 5,
  /**
   * STATUS_PENDING - The liquidity provision is valid and accepted by network
   * but has never been deployed. If when it's possible to deploy the orders for the first time
   * margin check fails, then they will be cancelled without any penalties.
   */
  STATUS_PENDING = 6,
  UNRECOGNIZED = -1,
}

/** Ethereum configuration details. */
export interface EthereumConfig {
  /** Network identifier of this Ethereum network. */
  networkId: string
  /** Chain identifier of this Ethereum network. */
  chainId: string
  /** // Contract configuration of the collateral bridge contract for this Ethereum network. */
  collateralBridgeContract: EthereumContractConfig | undefined
  /**
   * Number of block confirmations to wait to consider an Ethereum transaction trusted.
   * An Ethereum block is trusted when there are at least "n" blocks confirmed by the
   * network, "n" being the number of `confirmations` required. If `confirmations` was set to `3`,
   * and the current block to be forged (or mined) on Ethereum is block 14, block
   * 10 would be considered as trusted, but not block 11.
   */
  confirmations: number
  /** Contract configuration of the stacking bridge contract for this Ethereum network. */
  stakingBridgeContract: EthereumContractConfig | undefined
  /** Contract configuration of the token vesting contract for this Ethereum network. */
  tokenVestingContract: EthereumContractConfig | undefined
  /** Contract configuration of the multisig control contract for this Ethereum network. */
  multisigControlContract: EthereumContractConfig | undefined
}

export interface EthereumContractConfig {
  /** Address of the contract for this Ethereum network. The address should start with "0x". */
  address: string
  /** Block height at which the stacking contract has been deployed for this Ethereum network. */
  deploymentBlockHeight: number
}

/** Describes in both human readable and block time when an epoch spans */
export interface EpochTimestamps {
  /**
   * Timestamp of epoch start in nanoseconds
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  startTime: number
  /**
   * Timestamp of epoch expiry in nanoseconds
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  expiryTime: number
  /**
   * Timestamp of epoch end in nanoseconds, empty if not started
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  endTime: number
  /** Height of first block in the epoch */
  firstBlock: number
  /** Height of last block in the epoch, empty if not ended */
  lastBlock: number
}

export interface Epoch {
  /** Sequence is used as epoch identifier */
  seq: number
  /** Timestamps for start/end etc */
  timestamps: EpochTimestamps | undefined
  /** Validators that participated in this epoch */
  validators: Node[]
  /** List of all delegations in epoch */
  delegations: Delegation[]
}

export interface EpochParticipation {
  epoch: Epoch | undefined
  offline: number
  online: number
  totalRewards: number
}

export interface EpochData {
  /** Total number of epochs since node was created */
  total: number
  /** Total number of offline epochs since node was created */
  offline: number
  /** Total number of online epochs since node was created */
  online: number
}

export interface RankingScore {
  /** stake based score - no anti-whaling */
  stakeScore: string
  /** performance based score */
  performanceScore: string
  /** the status of the validator in the previous epoch */
  previousStatus: ValidatorNodeStatus
  /** the status of the validator in the current epoch */
  status: ValidatorNodeStatus
  /** tendermint voting power of the validator */
  votingPower: number
  /** final score */
  rankingScore: string
}

export interface RewardScore {
  /** stake based score - with anti-whaling */
  rawValidatorScore: string
  /** performance based score */
  performanceScore: string
  /** multisig score */
  multisigScore: string
  /** un-normalised score */
  validatorScore: string
  /** normalised validator score for rewards */
  normalisedScore: string
  /** the status of the validator for reward */
  validatorStatus: ValidatorNodeStatus
}

export interface Node {
  /** The node ID (wallet ID) */
  id: string
  /** Pub key of the node operator */
  pubKey: string
  /** Public key of Tendermint */
  tmPubKey: string
  /** Ethereum public key of the node */
  ethereumAddress: string
  /** URL where I can find out more info on the node */
  infoUrl: string
  /** Country code for the location of the node */
  location: string
  /** The amount the node has put up themselves */
  stakedByOperator: string
  /** The amount of stake that has been delegated by token holders */
  stakedByDelegates: string
  /** Total amount staked on node */
  stakedTotal: string
  /** Max amount of (wanted) stake, is this a network param or a node param */
  maxIntendedStake: string
  /** Amount of stake on the next epoch */
  pendingStake: string
  /** Information about epoch */
  epochData: EpochData | undefined
  /** Node status */
  status: NodeStatus
  /** Node's delegations */
  delegations: Delegation[]
  /** Node reward score */
  rewardScore: RewardScore | undefined
  /** Node ranking information */
  rankingScore: RankingScore | undefined
  /** Node name */
  name: string
  /** Avatar url */
  avatarUrl: string
}

/** Details on the collection of nodes for a particular validator status */
export interface NodeSet {
  /** Total number of nodes in the node set */
  total: number
  /** Number of nodes in the node set that had a performance score of 0 at the end of the last epoch */
  inactive: number
  /** IDs of nodes that were promoted into this node set at the start of the epoch */
  promoted: string[]
  /** IDs of nodes that were demoted into this node set at the start of the epoch */
  demoted: string[]
  /** Total number of nodes allowed in the node set */
  maximum?: number | undefined
}

export interface NodeData {
  /** Total staked amount across all nodes */
  stakedTotal: string
  /** Total number of nodes across all node sets */
  totalNodes: number
  /** Total number of nodes that had a performance score of 0 at the end of the last epoch */
  inactiveNodes: number
  /** Details on the set of consensus nodes in the network */
  tendermintNodes: NodeSet | undefined
  /** Details on the set of ersatz (standby) nodes in the network */
  ersatzNodes: NodeSet | undefined
  /** Details on the set of pending nodes in the network */
  pendingNodes: NodeSet | undefined
  /** Total uptime for all epochs across all nodes */
  uptime: number
}

export interface Delegation {
  /** Party which is delegating */
  party: string
  /** Node ID */
  nodeId: string
  /** Amount delegated */
  amount: string
  /** Epoch of delegation */
  epochSeq: string
}

/** Details for a single reward payment */
export interface Reward {
  assetId: string
  partyId: string
  epoch: number
  amount: string
  percentageOfTotal: string
  receivedAt: number
  marketId: string
  rewardType: string
}

/** Details for rewards for a single asset */
export interface RewardSummary {
  assetId: string
  partyId: string
  /** Total amount of rewards for the asset */
  amount: string
}

/** Details for rewards for a combination of asset, market, and reward type in a given epoch */
export interface EpochRewardSummary {
  epoch: number
  assetId: string
  marketId: string
  rewardType: string
  amount: string
}

export interface StateValueProposal {
  /** state variable identifier */
  stateVarId: string
  /** event identifier */
  eventId: string
  /** key value tolerance triplets */
  kvb: KeyValueBundle[]
}

export interface KeyValueBundle {
  key: string
  tolerance: string
  value: StateVarValue | undefined
}

export interface StateVarValue {
  scalarVal?: ScalarValue | undefined
  vectorVal?: VectorValue | undefined
  matrixVal?: MatrixValue | undefined
}

export interface ScalarValue {
  value: string
}

export interface VectorValue {
  value: string[]
}

export interface MatrixValue {
  value: VectorValue[]
}