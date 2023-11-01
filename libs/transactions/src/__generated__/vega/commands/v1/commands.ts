/* eslint-disable */
import type {
  ProposalRationale,
  ProposalTerms,
  Vote_Value,
} from '../../governance'
import type {
  AccountType,
  DispatchStrategy,
  Order_TimeInForce,
  Order_Type,
  PeggedOrder,
  PeggedReference,
  Side,
  StopOrder_ExpiryStrategy,
  WithdrawExt,
} from '../../vega'
import type { NodeSignatureKind } from './validator_commands'

export const protobufPackage = 'vega.commands.v1'

/**
 * A command that allows the submission of a batch market instruction which wraps up multiple market instructions into a single transaction.
 * These instructions are then processed sequentially in the following order:
 * - OrderCancellation
 * - OrderAmendment
 * - OrderSubmission
 * - StopOrderSubmission
 * where the maximum allow of instructions in a batch is controlled by the network parameter "spam.protection.max.batchSize".
 */
export interface BatchMarketInstructions {
  /** List of order cancellations to be processed sequentially. */
  cancellations: OrderCancellation[]
  /** List of order amendments to be processed sequentially. */
  amendments: OrderAmendment[]
  /** List of order submissions to be processed sequentially. */
  submissions: OrderSubmission[]
  /** List of stop order cancellations to be processed sequentially. */
  stopOrdersCancellation: StopOrdersCancellation[]
  /** List of stop order submissions to be processed sequentially. */
  stopOrdersSubmission: StopOrdersSubmission[]
}

/**
 * A command that allows a party to submit a stop order for a given market.
 * A stop order is a normal order that remains off the order book and is only submitted if a given trigger is breached from a particular direction.
 * If both rises-above and falls-below are configured, then if one is triggered the other will be cancelled (OCO).
 */
export interface StopOrdersSubmission {
  /** Stop order that will be triggered if the price rises above a given trigger price. */
  risesAbove?: StopOrderSetup | undefined
  /** Stop order that will be triggered if the price falls below a given trigger price. */
  fallsBelow?: StopOrderSetup | undefined
}

/** Price and expiry configuration for a stop order. */
export interface StopOrderSetup {
  /** Order to be submitted once the trigger is breached. */
  orderSubmission: OrderSubmission | undefined
  /** Timestamp, in Unix nanoseconds, for when the stop order should expire. If not set the stop order will not expire. */
  expiresAt?: number | undefined
  /** Strategy to adopt if the expiry time is reached. */
  expiryStrategy?: StopOrder_ExpiryStrategy | undefined
  /** Order will be submitted if the last traded price on the market breaches the given price. */
  price?: string | undefined
  /** Order will be submitted if the last traded price has moved the given percent from the highest/lowest mark price since the stop order was submitted. */
  trailingPercentOffset?: string | undefined
}

/**
 * A command that instructs the network to cancel untriggered stop orders that were submitted by the sender of this transaction.
 * If any cancelled stop order is part of an OCO, both stop orders will be cancelled.
 * It is not possible to cancel another party's stop orders with this command.
 */
export interface StopOrdersCancellation {
  /** Restrict cancellations to those submitted to the given market. If not set, all stop orders across all markets will be cancelled. */
  marketId?: string | undefined
  /** Restrict cancellations to a stop order with the given ID. If set, then a market ID must also be provided. */
  stopOrderId?: string | undefined
}

/** A command that submits an order to the Vega network for a given market. */
export interface OrderSubmission {
  /** Market ID to submit the order to. */
  marketId: string
  /**
   * Price for the order, the price is an integer, for example `123456` is a correctly
   * formatted price of `1.23456` assuming market configured to 5 decimal places,
   * required field for limit orders, however it is not required for market orders.
   * This field is an unsigned integer scaled to the market's decimal places.
   */
  price: string
  /** Size for the order, for example, in a futures market the size equals the number of units. */
  size: number
  /** Which side of the order book the order is for, e.g. buy or sell. */
  side: Side
  /** Time in force indicates how long an order will remain active before it is executed or expires.. */
  timeInForce: Order_TimeInForce
  /** Timestamp, in Unix nanoseconds, for when the order will expire. Can only be set when the order's time-in-force is GTT. */
  expiresAt: number
  /** Type of the order. */
  type: Order_Type
  /** Arbitrary optional reference for the order, to be used as a human-readable non-unique identifier for the order. */
  reference: string
  /** Pegged order details. If set, the order's price will be offset from a particular reference price of the order book at all times. */
  peggedOrder: PeggedOrder | undefined
  /** If set, the order will only be executed if it would not trade on entry to the order book. Only valid for limit orders. */
  postOnly: boolean
  /**
   * If set, the order will only be executed if the outcome of the trade moves the trader's position closer to 0.
   * Only valid for non-persistent orders.
   */
  reduceOnly: boolean
  /** Iceberg order details. If set, the order will exist on the order book in chunks. */
  icebergOpts?: IcebergOpts | undefined
}

/** Iceberg order options */
export interface IcebergOpts {
  /** Size of the order that is made visible and can be traded with during the execution of a single order. */
  peakSize: number
  /** Minimum allowed remaining size of the order before it is replenished back to its peak size. */
  minimumVisibleSize: number
}

/**
 * A command that instructs the network to cancel orders, active or partially filled, that were previously submitted by the sender of this transaction.
 * It is not possible to cancel another party's order with this command.
 */
export interface OrderCancellation {
  /** Restrict cancellations to an order with the given ID. If set, then a market ID must also be provided. */
  orderId: string
  /** Restrict cancellations to those submitted to the given market. If not set, all stop orders across all markets will be cancelled. */
  marketId: string
}

/**
 * A command that allows a party to update the details of an existing order.
 * Any field that is left unset or as a default value indicates that this field on the original order will be left unchanged.
 * It is not possible to change an order's type through this command.
 */
export interface OrderAmendment {
  /** ID of the order to amend. */
  orderId: string
  /** Market ID that the order was originally submitted to. */
  marketId: string
  /** New price for the order. This field is an unsigned integer scaled to the market's decimal places. */
  price?: string | undefined
  /**
   * Amend the size for the order by the delta specified:
   * - To reduce the size from the current value set a negative integer value
   * - To increase the size from the current value, set a positive integer value
   * - To leave the size unchanged set a value of zero
   * This field needs to be scaled using the market's position decimal places.
   */
  sizeDelta: number
  /** Timestamp, in Unix nanoseconds, for the new expiry time for the order. */
  expiresAt?: number | undefined
  /** New time in force for the order. */
  timeInForce: Order_TimeInForce
  /**
   * New pegged offset for the order.
   * This field is an unsigned integer scaled to the market's decimal places.
   */
  peggedOffset: string
  /** New pegged reference for the order. */
  peggedReference: PeggedReference
}

/**
 * A command that indicates to the network the party's intention to supply liquidity to the given market and become a liquidity provider.
 * An active liquidity provider for a market will earn fees based on the trades that occur in the market.
 */
export interface LiquidityProvisionSubmission {
  /** Market that the submitter wishes to provide liquidity for. */
  marketId: string
  /**
   * Amount that the submitter will commit as liquidity to the market, specified as a unitless number in the settlement asset of the market.
   * This field is an unsigned integer scaled using the asset's decimal places.
   */
  commitmentAmount: string
  /** Nominated liquidity fee factor, which is an input to the calculation of taker fees on the market, as per setting fees and rewarding liquidity providers. */
  fee: string
  /** Arbitrary reference to be added to every order created out of this liquidity provision submission. */
  reference: string
}

/** Command that allows a liquidity provider to inform the network that they will stop providing liquidity for a market. */
export interface LiquidityProvisionCancellation {
  /** Market that the submitter will stop providing liquidity for. */
  marketId: string
}

/**
 * Command that allows a liquidity provider to update the details of their existing liquidity commitment.
 * Any field that is left unset or as a default value indicates that this field on the original submission will be left unchanged.
 */
export interface LiquidityProvisionAmendment {
  /** Market that the submitter wants to amend the liquidity commitment for. */
  marketId: string
  /** New commitment amount. */
  commitmentAmount: string
  /** New nominated liquidity fee factor. */
  fee: string
  /** New arbitrary reference to be added to every order created out of this liquidity provision submission. */
  reference: string
}

/**
 * Command to instruct the network to process an asset withdrawal from the Vega network.
 * The process is specific to the destination foreign chain, for example, a withdrawal to Ethereum will generate signatures
 * that allow funds to be taken across the bridge.
 */
export interface WithdrawSubmission {
  /** Amount to be withdrawn, as an unsigned integer scaled to the asset's decimal places. */
  amount: string
  /** Asset to be withdrawn. */
  asset: string
  /** Details specific to the foreign chain, such as the receiver address. */
  ext: WithdrawExt | undefined
}

/**
 * Command that allows a token holder to submit a governance proposal that can be voted on by any other token holders, and eventually enacted on the Vega network.
 * For example this command can be used to propose a new market.
 */
export interface ProposalSubmission {
  /** Arbitrary human-readable reference identifying the proposal. */
  reference: string
  /** Proposal terms containing the type and details of the proposal, as well as time spans for voting and enactment. */
  terms: ProposalTerms | undefined
  /** Rationale behind a proposal. */
  rationale: ProposalRationale | undefined
}

/** Command that allows a token holder to vote for or against an active governance proposal. */
export interface VoteSubmission {
  /** Submit vote for the specified proposal ID. */
  proposalId: string
  /** Actual value of the vote. */
  value: Vote_Value
}

/**
 * Command to allow a token holder to delegate their tokens to a validator to help secure the network.
 * A token holder delegating to a validator will earn rewards based on the amount they have delegated, and the performance of the chosen validator.
 */
export interface DelegateSubmission {
  /** Node ID to delegate stake to. */
  nodeId: string
  /** Amount of stake to delegate, as an unsigned integer scaled to the governance asset's decimal places. */
  amount: string
}

/** Command to allow a token holder to instruct the network to remove their delegated stake from a given validator node. */
export interface UndelegateSubmission {
  /** Node ID to undelegate stake from. */
  nodeId: string
  /**
   * Amount to undelegate, as an unsigned integer scaled to the governance asset's decimal places.
   * If not set, then all delegations to the given validator node will be removed.
   */
  amount: string
  /** Method of delegation. */
  method: UndelegateSubmission_Method
}

export enum UndelegateSubmission_Method {
  METHOD_UNSPECIFIED = 0,
  /** METHOD_NOW - Undelegate straight away, losing all rewards for the current epoch. */
  METHOD_NOW = 1,
  /** METHOD_AT_END_OF_EPOCH - Undelegate at the end of an epoch, retaining all rewards for the current epoch. */
  METHOD_AT_END_OF_EPOCH = 2,
  UNRECOGNIZED = -1,
}

/**
 * Command that allows a party to move assets from one account to another.
 * A transfer can be set up as a single one-off transfer, or a recurring transfer that occurs once at the start of each epoch.
 * Each transfer incurs a fee as specified by the network parameter `transfer.fee.factor`
 */
export interface Transfer {
  /** Account type from which the funds of the party should be taken. */
  fromAccountType: AccountType
  /** Public key of the destination account. */
  to: string
  /** Type of the destination account. */
  toAccountType: AccountType
  /** Asset ID of the asset to be transferred. */
  asset: string
  /** Amount to be taken from the source account, as an unsigned integer scaled to the asset's decimal places. */
  amount: string
  /** Reference to be attached to the transfer. */
  reference: string
  /** Details of a one-off transfer that is executed once at a specified time. */
  oneOff?: OneOffTransfer | undefined
  /** Details of a transfer that is executed once every epoch until stopped. */
  recurring?: RecurringTransfer | undefined
}

/** Details for a one-off transfer. */
export interface OneOffTransfer {
  /** Timestamp, in Unix nanoseconds, for when the transfer should be executed, i.e., assets transferred into the receiver's account. */
  deliverOn: number
}

/** Details for a recurring transfer */
export interface RecurringTransfer {
  /** First epoch from which this transfer shall be executed. */
  startEpoch: number
  /** Last epoch at which this transfer shall be executed. */
  endEpoch?: number | undefined
  /**
   * Factor that the initial transfer amount is multiplied by for each epoch that it is executed.
   * For example if the initial transfer amount is 1000 and the factor is 0.5, then the amounts transferred per epoch will be 1000, 500, 250, 125, etc.
   */
  factor: string
  /** Optional parameter defining how a transfer is dispatched. */
  dispatchStrategy: DispatchStrategy | undefined
}

/** Command that can be used by the party that initiated a transfer to instruct the network to stop an active recurring transaction. */
export interface CancelTransfer {
  /** Transfer ID of the transfer to cancel. */
  transferId: string
}

/**
 * Command that can be used by a validator to instruct the network to generate signatures to add or remove validators from the multisig-control contract.
 * Signatures can only be generated for validator nodes that have been promoted or demoted from the consensus validator set, and any attempt to generate signatures for another node will be rejected.
 * The generated signatures can only be submitted to the contract by the Ethereum addresses included in the command.
 */
export interface IssueSignatures {
  /** Ethereum address which will submit the signatures to the smart contract. */
  submitter: string
  /** What kind of signatures to generate, namely for whether a signer is being added or removed. */
  kind: NodeSignatureKind
  /** Node ID of the validator node that will be signed in or out of the smart contract. */
  validatorNodeId: string
}

/**
 * Command that a party can use to instruct the network to create a new referral set on the network.
 * The submitter of this command will become the referrer of the new set and cannot be the referrer or a referee of another set.
 * A referrer can use the referral set ID as a referral code to attract others to the Vega network and have fees reduced for the referral set.
 */
export interface CreateReferralSet {
  /** Whether or not the referral set should be considered a team that can participate in team games on the network. */
  isTeam: boolean
  /** Team details, if the referral set is to be considered a team. */
  team?: CreateReferralSet_Team | undefined
}

export interface CreateReferralSet_Team {
  /** Name of the team. */
  name: string
  /** External link to the team's homepage. */
  teamUrl?: string | undefined
  /** External link to an avatar for the team. */
  avatarUrl?: string | undefined
  /** Whether or not the team is closed to new party members. */
  closed: boolean
}

/**
 * A command that allows the referrer of a referral set to update team details for a referral set.
 * Any field that is left unset or has a default value indicates that this field on the original referral set will be left unchanged.
 */
export interface UpdateReferralSet {
  /** ID of the referral set to update. */
  id: string
  /** Whether or not the referral set should be considered a team that can participate in team games on the network. */
  isTeam: boolean
  /** Team details, if the referral set is to be considered a team. */
  team?: UpdateReferralSet_Team | undefined
}

export interface UpdateReferralSet_Team {
  /** New name of the team. */
  name?: string | undefined
  /** New link to the team's homepage. */
  teamUrl?: string | undefined
  /** New link to an avatar for the team. */
  avatarUrl?: string | undefined
  /** Whether or not the team is closed to new party members. */
  closed?: boolean | undefined
}

/**
 * Command that allows the submitter to join a referral set and earn a collective reduction in fees based on the activity of all members of that set.
 * A party that joins a referral set is called a referee. A referee can only be a member of one referral set and cannot themselves be or become a referrer.
 * To switch to another referral set, a subsequent command can be sent and the switch will take effect at the end of the epoch.
 */
export interface ApplyReferralCode {
  /** Referral code, normally the referral set ID, for the party to join. */
  id: string
}
