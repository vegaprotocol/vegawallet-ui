/* eslint-disable */
import type { AssetDetails, AssetDetailsUpdate } from './assets'
import type { DataSourceDefinition } from './data_source'
import type {
  DataSourceSpecToFutureBinding,
  LiquidityMonitoringParameters,
  LogNormalRiskModel,
  PriceMonitoringParameters,
  SimpleModelParams,
} from './markets'
import type { NetworkParameter } from './vega'

export const protobufPackage = 'vega'

/** A list of possible errors that can cause a proposal to be in state rejected or failed */
export enum ProposalError {
  /** PROPOSAL_ERROR_UNSPECIFIED - Default value */
  PROPOSAL_ERROR_UNSPECIFIED = 0,
  /** PROPOSAL_ERROR_CLOSE_TIME_TOO_SOON - The specified close time is too early based on network parameters */
  PROPOSAL_ERROR_CLOSE_TIME_TOO_SOON = 1,
  /** PROPOSAL_ERROR_CLOSE_TIME_TOO_LATE - The specified close time is too late based on network parameters */
  PROPOSAL_ERROR_CLOSE_TIME_TOO_LATE = 2,
  /** PROPOSAL_ERROR_ENACT_TIME_TOO_SOON - The specified enactment time is too early based on network parameters */
  PROPOSAL_ERROR_ENACT_TIME_TOO_SOON = 3,
  /** PROPOSAL_ERROR_ENACT_TIME_TOO_LATE - The specified enactment time is too late based on network parameters */
  PROPOSAL_ERROR_ENACT_TIME_TOO_LATE = 4,
  /** PROPOSAL_ERROR_INSUFFICIENT_TOKENS - The proposer for this proposal has insufficient tokens */
  PROPOSAL_ERROR_INSUFFICIENT_TOKENS = 5,
  /** PROPOSAL_ERROR_INVALID_INSTRUMENT_SECURITY - The instrument quote name and base name were the same */
  PROPOSAL_ERROR_INVALID_INSTRUMENT_SECURITY = 6,
  /** PROPOSAL_ERROR_NO_PRODUCT - The proposal has no product */
  PROPOSAL_ERROR_NO_PRODUCT = 7,
  /** PROPOSAL_ERROR_UNSUPPORTED_PRODUCT - The specified product is not supported */
  PROPOSAL_ERROR_UNSUPPORTED_PRODUCT = 8,
  /** PROPOSAL_ERROR_NO_TRADING_MODE - The proposal has no trading mode */
  PROPOSAL_ERROR_NO_TRADING_MODE = 11,
  /** PROPOSAL_ERROR_UNSUPPORTED_TRADING_MODE - The proposal has an unsupported trading mode */
  PROPOSAL_ERROR_UNSUPPORTED_TRADING_MODE = 12,
  /** PROPOSAL_ERROR_NODE_VALIDATION_FAILED - The proposal failed node validation */
  PROPOSAL_ERROR_NODE_VALIDATION_FAILED = 13,
  /** PROPOSAL_ERROR_MISSING_BUILTIN_ASSET_FIELD - A field is missing in a builtin asset source */
  PROPOSAL_ERROR_MISSING_BUILTIN_ASSET_FIELD = 14,
  /** PROPOSAL_ERROR_MISSING_ERC20_CONTRACT_ADDRESS - The contract address is missing in the ERC20 asset source */
  PROPOSAL_ERROR_MISSING_ERC20_CONTRACT_ADDRESS = 15,
  /** PROPOSAL_ERROR_INVALID_ASSET - The asset ID is invalid or does not exist on the Vega network */
  PROPOSAL_ERROR_INVALID_ASSET = 16,
  /** PROPOSAL_ERROR_INCOMPATIBLE_TIMESTAMPS - Proposal terms timestamps are not compatible (Validation < Closing < Enactment) */
  PROPOSAL_ERROR_INCOMPATIBLE_TIMESTAMPS = 17,
  /** PROPOSAL_ERROR_NO_RISK_PARAMETERS - No risk parameters were specified */
  PROPOSAL_ERROR_NO_RISK_PARAMETERS = 18,
  /** PROPOSAL_ERROR_NETWORK_PARAMETER_INVALID_KEY - Invalid key in update network parameter proposal */
  PROPOSAL_ERROR_NETWORK_PARAMETER_INVALID_KEY = 19,
  /** PROPOSAL_ERROR_NETWORK_PARAMETER_INVALID_VALUE - Invalid value in update network parameter proposal */
  PROPOSAL_ERROR_NETWORK_PARAMETER_INVALID_VALUE = 20,
  /** PROPOSAL_ERROR_NETWORK_PARAMETER_VALIDATION_FAILED - Validation failed for network parameter proposal */
  PROPOSAL_ERROR_NETWORK_PARAMETER_VALIDATION_FAILED = 21,
  /** PROPOSAL_ERROR_OPENING_AUCTION_DURATION_TOO_SMALL - Opening auction duration is less than the network minimum opening auction time */
  PROPOSAL_ERROR_OPENING_AUCTION_DURATION_TOO_SMALL = 22,
  /** PROPOSAL_ERROR_OPENING_AUCTION_DURATION_TOO_LARGE - Opening auction duration is more than the network minimum opening auction time */
  PROPOSAL_ERROR_OPENING_AUCTION_DURATION_TOO_LARGE = 23,
  /** PROPOSAL_ERROR_COULD_NOT_INSTANTIATE_MARKET - Market proposal market could not be instantiated in execution */
  PROPOSAL_ERROR_COULD_NOT_INSTANTIATE_MARKET = 25,
  /** PROPOSAL_ERROR_INVALID_FUTURE_PRODUCT - Market proposal market contained invalid product definition */
  PROPOSAL_ERROR_INVALID_FUTURE_PRODUCT = 26,
  /** PROPOSAL_ERROR_INVALID_RISK_PARAMETER - Market proposal has invalid risk parameter */
  PROPOSAL_ERROR_INVALID_RISK_PARAMETER = 30,
  /** PROPOSAL_ERROR_MAJORITY_THRESHOLD_NOT_REACHED - Proposal was declined because vote didn't reach the majority threshold required */
  PROPOSAL_ERROR_MAJORITY_THRESHOLD_NOT_REACHED = 31,
  /** PROPOSAL_ERROR_PARTICIPATION_THRESHOLD_NOT_REACHED - Proposal declined because the participation threshold was not reached */
  PROPOSAL_ERROR_PARTICIPATION_THRESHOLD_NOT_REACHED = 32,
  /** PROPOSAL_ERROR_INVALID_ASSET_DETAILS - Asset proposal has invalid asset details */
  PROPOSAL_ERROR_INVALID_ASSET_DETAILS = 33,
  /** PROPOSAL_ERROR_UNKNOWN_TYPE - Proposal is an unknown type */
  PROPOSAL_ERROR_UNKNOWN_TYPE = 34,
  /** PROPOSAL_ERROR_UNKNOWN_RISK_PARAMETER_TYPE - Proposal has an unknown risk parameter type */
  PROPOSAL_ERROR_UNKNOWN_RISK_PARAMETER_TYPE = 35,
  /** PROPOSAL_ERROR_INVALID_FREEFORM - Validation failed for freeform proposal */
  PROPOSAL_ERROR_INVALID_FREEFORM = 36,
  /**
   * PROPOSAL_ERROR_INSUFFICIENT_EQUITY_LIKE_SHARE - The party doesn't have enough equity-like share to propose an update on the market
   * targeted by the proposal
   */
  PROPOSAL_ERROR_INSUFFICIENT_EQUITY_LIKE_SHARE = 37,
  /** PROPOSAL_ERROR_INVALID_MARKET - The market targeted by the proposal does not exist or is not eligible for modification */
  PROPOSAL_ERROR_INVALID_MARKET = 38,
  /** PROPOSAL_ERROR_TOO_MANY_MARKET_DECIMAL_PLACES - The market proposal decimal place is higher than the market settlement asset decimal places */
  PROPOSAL_ERROR_TOO_MANY_MARKET_DECIMAL_PLACES = 39,
  /** PROPOSAL_ERROR_TOO_MANY_PRICE_MONITORING_TRIGGERS - The market proposal contains too many price monitoring triggers */
  PROPOSAL_ERROR_TOO_MANY_PRICE_MONITORING_TRIGGERS = 40,
  /** PROPOSAL_ERROR_ERC20_ADDRESS_ALREADY_IN_USE - The market proposal contains too many price monitoring triggers */
  PROPOSAL_ERROR_ERC20_ADDRESS_ALREADY_IN_USE = 41,
  /** PROPOSAL_ERROR_LP_PRICE_RANGE_NONPOSITIVE - The LP price range must be larger than 0 */
  PROPOSAL_ERROR_LP_PRICE_RANGE_NONPOSITIVE = 42,
  /** PROPOSAL_ERROR_LP_PRICE_RANGE_TOO_LARGE - The LP price range must not be larger than 100 */
  PROPOSAL_ERROR_LP_PRICE_RANGE_TOO_LARGE = 43,
  UNRECOGNIZED = -1,
}

/** Future product configuration */
export interface FutureProduct {
  /** Asset ID for the product's settlement asset */
  settlementAsset: string
  /** Product quote name */
  quoteName: string
  /** The data source spec describing the data source for settlement */
  dataSourceSpecForSettlementData: DataSourceDefinition | undefined
  /** The external data source spec describing the data source of trading termination */
  dataSourceSpecForTradingTermination: DataSourceDefinition | undefined
  /** The binding between the data source spec and the settlement data */
  dataSourceSpecBinding: DataSourceSpecToFutureBinding | undefined
}

/** Instrument configuration */
export interface InstrumentConfiguration {
  /** Instrument name */
  name: string
  /** Instrument code, human-readable shortcode used to describe the instrument */
  code: string
  /** Future */
  future?: FutureProduct | undefined
}

/** Configuration for a new market on Vega */
export interface NewMarketConfiguration {
  /** New market instrument configuration */
  instrument: InstrumentConfiguration | undefined
  /** Decimal places used for the new market, sets the smallest price increment on the book */
  decimalPlaces: number
  /** Optional new market metadata, tags */
  metadata: string[]
  /** Price monitoring parameters */
  priceMonitoringParameters: PriceMonitoringParameters | undefined
  /** Liquidity monitoring parameters */
  liquidityMonitoringParameters: LiquidityMonitoringParameters | undefined
  /** Simple risk model parameters, valid only if MODEL_SIMPLE is selected */
  simple?: SimpleModelParams | undefined
  /** Log normal risk model parameters, valid only if MODEL_LOG_NORMAL is selected */
  logNormal?: LogNormalRiskModel | undefined
  /** Decimal places for order sizes, sets what size the smallest order / position on the market can be */
  positionDecimalPlaces: number
  /**
   * Percentage move up and down from the mid price which specifies the range of
   * price levels over which automated liquidity provision orders will be deployed
   */
  lpPriceRange: string
}

/** New market on Vega */
export interface NewMarket {
  /** The configuration of the new market */
  changes: NewMarketConfiguration | undefined
}

/** Update an existing market on Vega */
export interface UpdateMarket {
  /** The identifier of the market to update */
  marketId: string
  /** The updated configuration of the market */
  changes: UpdateMarketConfiguration | undefined
}

/** Configuration to update a market on Vega */
export interface UpdateMarketConfiguration {
  /** Updated market instrument configuration */
  instrument: UpdateInstrumentConfiguration | undefined
  /** Optional market metadata, tags */
  metadata: string[]
  /** Price monitoring parameters */
  priceMonitoringParameters: PriceMonitoringParameters | undefined
  /** Liquidity monitoring parameters */
  liquidityMonitoringParameters: LiquidityMonitoringParameters | undefined
  /** Simple risk model parameters, valid only if MODEL_SIMPLE is selected */
  simple?: SimpleModelParams | undefined
  /** Log normal risk model parameters, valid only if MODEL_LOG_NORMAL is selected */
  logNormal?: LogNormalRiskModel | undefined
  /**
   * Percentage move up and down from the mid price which specifies the range of
   * price levels over which automated liquidity provision orders will be deployed
   */
  lpPriceRange: string
}

/** Instrument configuration */
export interface UpdateInstrumentConfiguration {
  /** Instrument code, human-readable shortcode used to describe the instrument */
  code: string
  /** Future */
  future?: UpdateFutureProduct | undefined
}

/** Future product configuration */
export interface UpdateFutureProduct {
  /** Human-readable name/abbreviation of the quote name */
  quoteName: string
  /** The data source spec describing the data of settlement data */
  dataSourceSpecForSettlementData: DataSourceDefinition | undefined
  /** The data source spec describing the data source for trading termination */
  dataSourceSpecForTradingTermination: DataSourceDefinition | undefined
  /** The binding between the data source spec and the settlement data */
  dataSourceSpecBinding: DataSourceSpecToFutureBinding | undefined
}

/** Update network configuration on Vega */
export interface UpdateNetworkParameter {
  /** The network parameter to update */
  changes: NetworkParameter | undefined
}

/** New asset on Vega */
export interface NewAsset {
  /** The configuration of the new asset */
  changes: AssetDetails | undefined
}

/** Update an existing asset on Vega */
export interface UpdateAsset {
  /** The ID of the asset to be updated */
  assetId: string
  /** The changes to apply on an existing asset */
  changes: AssetDetailsUpdate | undefined
}

/**
 * Freeform proposal
 * This message is just used as a placeholder to sort out the nature of the
 * proposal once parsed.
 */
export interface NewFreeform {}

/** Terms for a governance proposal on Vega */
export interface ProposalTerms {
  /**
   * Timestamp (Unix time in seconds) when voting closes for this proposal,
   * constrained by `minClose` and `maxClose` network parameters
   */
  closingTimestamp: number
  /**
   * Timestamp (Unix time in seconds) when proposal gets enacted (if passed),
   * constrained by `minEnact` and `maxEnact` network parameters
   */
  enactmentTimestamp: number
  /** Validation timestamp (Unix time in seconds) */
  validationTimestamp: number
  /** Proposal change for modifying an existing market on Vega */
  updateMarket?: UpdateMarket | undefined
  /** Proposal change for creating new market on Vega */
  newMarket?: NewMarket | undefined
  /** Proposal change for updating Vega network parameters */
  updateNetworkParameter?: UpdateNetworkParameter | undefined
  /** Proposal change for creating new assets on Vega */
  newAsset?: NewAsset | undefined
  /**
   * Proposal change for a freeform request, which can be voted on but does not change the behaviour of the system,
   * and can be used to gauge community sentiment
   */
  newFreeform?: NewFreeform | undefined
  /** Proposal change for updating an asset */
  updateAsset?: UpdateAsset | undefined
}

/** The rationale behind a proposal. */
export interface ProposalRationale {
  /**
   * Description to show a short title / something in case the link goes offline.
   * This is to be between 0 and 20k unicode characters.
   * This is mandatory for all proposals.
   */
  description: string
  /**
   * Title to be used to give a short description of the proposal in lists.
   * This is to be between 0 and 100 unicode characters.
   * This is mandatory for all proposals.
   */
  title: string
}

/** Governance data */
export interface GovernanceData {
  /** The governance proposal */
  proposal: Proposal | undefined
  /** All YES votes in favour of the proposal above */
  yes: Vote[]
  /** All NO votes against the proposal above */
  no: Vote[]
  /**
   * All latest YES votes by party (guaranteed to be unique),
   * where key (string) is the party ID (public key) and
   * value (Vote) is the vote cast by the given party
   */
  yesParty: { [key: string]: Vote }
  /**
   * All latest NO votes by party (guaranteed to be unique),
   * where key (string) is the party ID (public key) and
   * value (Vote) is the vote cast by the given party
   */
  noParty: { [key: string]: Vote }
}

export interface GovernanceData_YesPartyEntry {
  key: string
  value: Vote | undefined
}

export interface GovernanceData_NoPartyEntry {
  key: string
  value: Vote | undefined
}

/** Governance proposal */
export interface Proposal {
  /** Unique proposal identifier */
  id: string
  /** Proposal reference */
  reference: string
  /** Party identifier (public key) of the author (the party submitting the proposal) */
  partyId: string
  /** Proposal state - See (Proposal.State)[#vega.Proposal.State] definition */
  state: Proposal_State
  /** Proposal timestamp for date and time (in nanoseconds) when proposal was submitted to the network */
  timestamp: number
  /** Proposal configuration and the actual change that is meant to be executed when proposal is enacted */
  terms: ProposalTerms | undefined
  /** A reason for the current state of the proposal, this may be set in case of REJECTED and FAILED statuses */
  reason?: ProposalError | undefined
  /** The detailed error associated to the reason */
  errorDetails?: string | undefined
  /** The rationale behind a proposal */
  rationale: ProposalRationale | undefined
  /** The required vote participation for this proposal */
  requiredParticipation: string
  /** The required majority for this proposal */
  requiredMajority: string
  /** The required participation from liquidity providers, optional (required for market update proposal) */
  requiredLiquidityProviderParticipation?: string | undefined
  /** The require majority from liquidity providers, optional (required for market update proposal) */
  requiredLiquidityProviderMajority?: string | undefined
}

/**
 * Proposal state transition:
 * Open ->
 *   - Passed -> Enacted.
 *   - Passed -> Failed.
 *   - Declined
 * Rejected
 * Proposal can enter Failed state from any other state
 */
export enum Proposal_State {
  /** STATE_UNSPECIFIED - Default value, always invalid */
  STATE_UNSPECIFIED = 0,
  /** STATE_FAILED - Proposal enactment has failed - even though proposal has passed, its execution could not be performed */
  STATE_FAILED = 1,
  /** STATE_OPEN - Proposal is open for voting */
  STATE_OPEN = 2,
  /** STATE_PASSED - Proposal has gained enough support to be executed */
  STATE_PASSED = 3,
  /** STATE_REJECTED - Proposal wasn't accepted (proposal terms failed validation due to wrong configuration or failing to meet network requirements) */
  STATE_REJECTED = 4,
  /** STATE_DECLINED - Proposal didn't get enough votes (either failing to gain required participation or majority level) */
  STATE_DECLINED = 5,
  /** STATE_ENACTED - Proposal enacted */
  STATE_ENACTED = 6,
  /** STATE_WAITING_FOR_NODE_VOTE - Waiting for node validation of the proposal */
  STATE_WAITING_FOR_NODE_VOTE = 7,
  UNRECOGNIZED = -1,
}

/** Governance vote */
export interface Vote {
  /** Voter's party identifier */
  partyId: string
  /** Actual vote */
  value: Vote_Value
  /** Identifier of the proposal being voted on */
  proposalId: string
  /** Vote timestamp for date and time (in nanoseconds) when vote was submitted to the network */
  timestamp: number
  /** Total number of governance token for the party that cast the vote */
  totalGovernanceTokenBalance: string
  /** The weight of this vote based on the total number of governance tokens */
  totalGovernanceTokenWeight: string
  /** The weight of the vote compared to the total amount of equity-like share on the market */
  totalEquityLikeShareWeight: string
}

/** Vote value */
export enum Vote_Value {
  /** VALUE_UNSPECIFIED - Default value, always invalid */
  VALUE_UNSPECIFIED = 0,
  /** VALUE_NO - A vote against the proposal */
  VALUE_NO = 1,
  /** VALUE_YES - A vote in favour of the proposal */
  VALUE_YES = 2,
  UNRECOGNIZED = -1,
}
