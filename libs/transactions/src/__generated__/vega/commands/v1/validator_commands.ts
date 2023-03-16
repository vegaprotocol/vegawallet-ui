/* eslint-disable */
import type {
  BuiltinAssetEvent,
  ERC20Event,
  ERC20MultiSigEvent,
  StakingEvent,
} from '../../chain_events'
import type { StateValueProposal } from '../../vega'
import type { Signature } from './signature'

export const protobufPackage = 'vega.commands.v1'

/** The kind of signature created by a node, for example, allow-listing a new asset, withdrawal etc */
export enum NodeSignatureKind {
  /** NODE_SIGNATURE_KIND_UNSPECIFIED - Represents an unspecified or missing value from the input */
  NODE_SIGNATURE_KIND_UNSPECIFIED = 0,
  /** NODE_SIGNATURE_KIND_ASSET_NEW - Represents a signature for a new asset allow-listing */
  NODE_SIGNATURE_KIND_ASSET_NEW = 1,
  /** NODE_SIGNATURE_KIND_ASSET_WITHDRAWAL - Represents a signature for an asset withdrawal */
  NODE_SIGNATURE_KIND_ASSET_WITHDRAWAL = 2,
  /** NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_ADDED - Represents a signature for a new signer added to the erc20 multisig contract */
  NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_ADDED = 3,
  /** NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_REMOVED - Represents a signature for a signer removed from the erc20 multisig contract */
  NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_REMOVED = 4,
  /** NODE_SIGNATURE_KIND_ASSET_UPDATE - Represents a signature for an asset update allow-listing */
  NODE_SIGNATURE_KIND_ASSET_UPDATE = 5,
  UNRECOGNIZED = -1,
}

/**
 * A message from a validator signalling they are still online and validating blocks
 * or ready to validate blocks when they are still a pending validator
 */
export interface ValidatorHeartbeat {
  /** the id of the node emitting the heartbeat */
  nodeId: string
  /** Signature from the validator made using the ethereum wallet */
  ethereumSignature: Signature | undefined
  /** Signature from the validator made using the vega wallet */
  vegaSignature: Signature | undefined
}

/** Used to announce a node as a new pending validator */
export interface AnnounceNode {
  /** Vega public key, required field */
  vegaPubKey: string
  /** Ethereum public key, required field */
  ethereumAddress: string
  /** Public key for the blockchain, required field */
  chainPubKey: string
  /** URL with more info on the node */
  infoUrl: string
  /** Country code (ISO 3166-1 alpha-2) for the location of the node */
  country: string
  /** ID of the validator, (public master key) */
  id: string
  /** Name of the validator */
  name: string
  /** AvatarURL of the validator */
  avatarUrl: string
  /** Vega public key derivation index */
  vegaPubKeyIndex: number
  /**
   * The epoch from which the validator is expected
   * to be ready to validate blocks
   */
  fromEpoch: number
  /** Signature from the validator made using the ethereum wallet */
  ethereumSignature: Signature | undefined
  /** Signature from the validator made using the Vega wallet */
  vegaSignature: Signature | undefined
  /** Ethereum public key to use as a submitter to allow automatic signature generation */
  submitterAddress: string
}

/**
 * Used when a node votes for validating that a given resource exists or is valid,
 * for example, an ERC20 deposit is valid and exists on ethereum
 */
export interface NodeVote {
  /** Reference, required field */
  reference: string
  /** type of NodeVote, also required */
  type: NodeVote_Type
}

export enum NodeVote_Type {
  /** TYPE_UNSPECIFIED - Represents an unspecified or missing value from the input */
  TYPE_UNSPECIFIED = 0,
  /** TYPE_STAKE_DEPOSITED - A node vote a new stake deposit */
  TYPE_STAKE_DEPOSITED = 1,
  /** TYPE_STAKE_REMOVED - A node vote for a new stake removed event */
  TYPE_STAKE_REMOVED = 2,
  /** TYPE_FUNDS_DEPOSITED - A node vote for new collateral deposited */
  TYPE_FUNDS_DEPOSITED = 3,
  /** TYPE_SIGNER_ADDED - A node vote for a new signer added to the erc20 bridge */
  TYPE_SIGNER_ADDED = 4,
  /** TYPE_SIGNER_REMOVED - A node vote for a signer removed from the erc20 bridge */
  TYPE_SIGNER_REMOVED = 5,
  /** TYPE_BRIDGE_STOPPED - A node vote for a bridge stopped event */
  TYPE_BRIDGE_STOPPED = 6,
  /** TYPE_BRIDGE_RESUMED - A node vote for a bridge resumed event */
  TYPE_BRIDGE_RESUMED = 7,
  /** TYPE_ASSET_LISTED - A node vote for a newly listed asset */
  TYPE_ASSET_LISTED = 8,
  /** TYPE_LIMITS_UPDATED - A node vote for an asset limits update */
  TYPE_LIMITS_UPDATED = 9,
  /** TYPE_STAKE_TOTAL_SUPPLY - A node vote to share the total supply of the staking token */
  TYPE_STAKE_TOTAL_SUPPLY = 10,
  /** TYPE_SIGNER_THRESHOLD_SET - A node vote to update the threshold of the signer set for the multisig contract */
  TYPE_SIGNER_THRESHOLD_SET = 11,
  /** TYPE_GOVERNANCE_VALIDATE_ASSET - A node vote to validate a new assert governance proposal */
  TYPE_GOVERNANCE_VALIDATE_ASSET = 12,
  UNRECOGNIZED = -1,
}

/** Represents a signature from a validator, to be used by a foreign chain in order to recognise a decision taken by the Vega network */
export interface NodeSignature {
  /** The identifier of the resource being signed */
  id: string
  /** The signature */
  sig: Uint8Array
  /** The kind of resource being signed */
  kind: NodeSignatureKind
}

/** An event forwarded to the Vega network to provide information on events happening on other networks */
export interface ChainEvent {
  /** The identifier of the transaction in which the events happened, usually a hash */
  txId: string
  /** Arbitrary one-time integer used to prevent replay attacks */
  nonce: number
  /** Built-in asset event */
  builtin?: BuiltinAssetEvent | undefined
  /** Ethereum ERC20 event */
  erc20?: ERC20Event | undefined
  /** Ethereum Staking event */
  stakingEvent?: StakingEvent | undefined
  /** Ethereum ERC20 multisig event */
  erc20Multisig?: ERC20MultiSigEvent | undefined
}

/** A transaction to allow a validator to rotate their Vega keys */
export interface KeyRotateSubmission {
  /** New Vega public key derivation index */
  newPubKeyIndex: number
  /** Target block at which the key rotation will take effect on */
  targetBlock: number
  /** The new public key to rotate to */
  newPubKey: string
  /** Hash of currently used public key */
  currentPubKeyHash: string
}

/** A transaction to allow a validator to rotate their ethereum keys */
export interface EthereumKeyRotateSubmission {
  /** Target block at which the key rotation will take effect on */
  targetBlock: number
  /** The new address to rotate to */
  newAddress: string
  /** Currently used public address */
  currentAddress: string
  /** Ethereum public key to use as a submitter to allow automatic signature generation */
  submitterAddress: string
  /** Signature that can be verified using the new ethereum address */
  ethereumSignature: Signature | undefined
}

/** A transaction for a validator to submit a floating point value */
export interface StateVariableProposal {
  /** The state value proposal details */
  proposal: StateValueProposal | undefined
}

/** A transaction for a validator to suggest a protocol upgrade */
export interface ProtocolUpgradeProposal {
  /** The block height at which to perform the upgrade */
  upgradeBlockHeight: number
  /** the release tag for the Vega binary */
  vegaReleaseTag: string
}