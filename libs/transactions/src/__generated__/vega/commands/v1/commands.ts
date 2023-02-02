/* eslint-disable */
import type {
  ProposalRationale,
  ProposalTerms,
  Vote_Value,
} from '../../governance'
import type {
  AccountType,
  DispatchStrategy,
  LiquidityOrder,
  Order_TimeInForce,
  Order_Type,
  PeggedOrder,
  PeggedReference,
  Side,
  WithdrawExt,
} from '../../vega'

export const protobufPackage = 'vega.commands.v1'

/**
 * A batch of order instructions.
 * This command accepts only the following batches of commands
 * and will be processed in the following order:
 * - OrderCancellation
 * - OrderAmendment
 * - OrderSubmission
 * The total amount of commands in the batch across all three lists of
 * instructions is restricted by the following network parameter:
 * "spam.protection.max.batchSize"
 */
export interface BatchMarketInstructions {
  /** A list of order cancellations to be processed sequentially */
  cancellations: OrderCancellation[]
  /** A list of order amendments to be processed sequentially */
  amendments: OrderAmendment[]
  /** A list of order submissions to be processed sequentially */
  submissions: OrderSubmission[]
}

/** An order submission is a request to submit or create a new order on Vega */
export interface OrderSubmission {
  /** Market identifier for the order, required field */
  marketId: string
  /**
   * Price for the order, the price is an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places,
   * , required field for limit orders, however it is not required for market orders
   */
  price: string
  /** Size for the order, for example, in a futures market the size equals the number of units, cannot be negative */
  size: number
  /**
   * Side for the order, e.g. SIDE_BUY or SIDE_SELL, required field
   * - See `Side`
   */
  side: Side
  /**
   * Time in force indicates how long an order will remain active before it is executed or expires, required field
   * - See `Order.TimeInForce`
   */
  timeInForce: Order_TimeInForce
  /**
   * Timestamp for when the order will expire, in nanoseconds since the epoch,
   * required field only for `Order.TimeInForce`.TIME_IN_FORCE_GTT`
   * - See `VegaTimeResponse`.`timestamp`
   */
  expiresAt: number
  /** Type for the order, required field - See `Order.Type` */
  type: Order_Type
  /**
   * Reference given for the order, this is typically used to retrieve an order submitted through consensus, currently
   * set internally by the node to return a unique reference identifier for the order submission
   */
  reference: string
  /**
   * Used to specify the details for a pegged order
   * - See `PeggedOrder`
   */
  peggedOrder: PeggedOrder | undefined
}

/** An order cancellation is a request to cancel an existing order on Vega */
export interface OrderCancellation {
  /** Unique identifier for the order (set by the system after consensus), required field */
  orderId: string
  /** Market identifier for the order, required field */
  marketId: string
}

/** An order amendment is a request to amend or update an existing order on Vega */
export interface OrderAmendment {
  /** Order identifier, this is required to find the order and will not be updated, required field */
  orderId: string
  /** Market identifier, this is required to find the order and will not be updated */
  marketId: string
  /** Amend the price for the order, if the Price value is set, otherwise price will remain unchanged - See [`Price`](#vega.Price) */
  price?: string | undefined
  /**
   * Amend the size for the order by the delta specified:
   * - To reduce the size from the current value set a negative integer value
   * - To increase the size from the current value, set a positive integer value
   * - To leave the size unchanged set a value of zero
   */
  sizeDelta: number
  /**
   * Amend the expiry time for the order, if the Timestamp value is set, otherwise expiry time will remain unchanged
   * - See [`VegaTimeResponse`](#api.VegaTimeResponse).`timestamp`
   */
  expiresAt?: number | undefined
  /**
   * Amend the time in force for the order, set to TIME_IN_FORCE_UNSPECIFIED to remain unchanged
   * - See [`TimeInForce`](#api.VegaTimeResponse).`timestamp`
   */
  timeInForce: Order_TimeInForce
  /** Amend the pegged order offset for the order */
  peggedOffset: string
  /**
   * Amend the pegged order reference for the order
   * - See [`PeggedReference`](#vega.PeggedReference)
   */
  peggedReference: PeggedReference
}

/** A liquidity provision submitted for a given market */
export interface LiquidityProvisionSubmission {
  /** Market identifier for the order, required field */
  marketId: string
  /** Specified as a unitless number that represents the amount of settlement asset of the market */
  commitmentAmount: string
  /** Nominated liquidity fee factor, which is an input to the calculation of taker fees on the market, as per setting fees and rewarding liquidity providers */
  fee: string
  /** A set of liquidity sell orders to meet the liquidity provision obligation */
  sells: LiquidityOrder[]
  /** A set of liquidity buy orders to meet the liquidity provision obligation */
  buys: LiquidityOrder[]
  /** A reference to be added to every order created out of this liquidityProvisionSubmission */
  reference: string
}

/** Cancel a liquidity provision request */
export interface LiquidityProvisionCancellation {
  /** Unique ID for the market with the liquidity provision to be cancelled */
  marketId: string
}

/** Amend a liquidity provision request */
export interface LiquidityProvisionAmendment {
  /** Unique ID for the market with the liquidity provision to be amended */
  marketId: string
  /** From here at least one of the following is required to consider the command valid */
  commitmentAmount: string
  /** an empty strings means no change */
  fee: string
  /** empty slice means no change */
  sells: LiquidityOrder[]
  /** empty slice means no change */
  buys: LiquidityOrder[]
  /** empty string means no change */
  reference: string
}

/** Represents the submission request to withdraw funds for a party on Vega */
export interface WithdrawSubmission {
  /** The amount to be withdrawn */
  amount: string
  /** The asset to be withdrawn */
  asset: string
  /** Foreign chain specifics */
  ext: WithdrawExt | undefined
}

/**
 * A command to submit a new proposal for the
 * Vega network governance
 */
export interface ProposalSubmission {
  /** Proposal reference */
  reference: string
  /** Proposal configuration and the actual change that is meant to be executed when proposal is enacted */
  terms: ProposalTerms | undefined
  /** The rationale behind a proposal. */
  rationale: ProposalRationale | undefined
}

/**
 * A command to submit a new vote for a governance
 * proposal.
 */
export interface VoteSubmission {
  /** The ID of the proposal to vote for. */
  proposalId: string
  /** The actual value of the vote */
  value: Vote_Value
}

/** A command to submit an instruction to delegate some stake to a node */
export interface DelegateSubmission {
  /** The ID for the node to delegate to */
  nodeId: string
  /** The amount of stake to delegate */
  amount: string
}

export interface UndelegateSubmission {
  nodeId: string
  /** optional, if not specified = ALL */
  amount: string
  method: UndelegateSubmission_Method
}

export enum UndelegateSubmission_Method {
  METHOD_UNSPECIFIED = 0,
  METHOD_NOW = 1,
  METHOD_AT_END_OF_EPOCH = 2,
  UNRECOGNIZED = -1,
}

/** A transfer initiated by a party */
export interface Transfer {
  /**
   * The account type from which the funds of the party
   * should be taken
   */
  fromAccountType: AccountType
  /** The public key of the destination account */
  to: string
  /** The type of the destination account */
  toAccountType: AccountType
  /** The asset */
  asset: string
  /** The amount to be taken from the source account */
  amount: string
  /** The reference to be attached to the transfer */
  reference: string
  oneOff?: OneOffTransfer | undefined
  recurring?: RecurringTransfer | undefined
}

/** Specific details for a one off transfer */
export interface OneOffTransfer {
  /**
   * A unix timestamp in seconds. Time at which the
   * transfer should be delivered into the To account
   */
  deliverOn: number
}

/** Specific details for a recurring transfer */
export interface RecurringTransfer {
  /** The first epoch from which this transfer shall be paid */
  startEpoch: number
  /** The last epoch at which this transfer shall be paid */
  endEpoch?: number | undefined
  /** factor needs to be > 0 */
  factor: string
  /** optional parameter defining how a transfer is dispatched */
  dispatchStrategy: DispatchStrategy | undefined
}

/** A request for cancelling a recurring transfer */
export interface CancelTransfer {
  /** The ID of the transfer to cancel */
  transferId: string
}
