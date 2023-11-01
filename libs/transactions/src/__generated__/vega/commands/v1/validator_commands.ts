/* eslint-disable */
import type {
  BuiltinAssetEvent,
  ERC20Event,
  ERC20MultiSigEvent,
  EthContractCallEvent,
  StakingEvent,
} from '../../chain_events'
import type { StateValueProposal } from '../../vega'
import type { Signature } from './signature'

export const protobufPackage = 'vega.commands.v1'

/** Kind of signature created by a node, for example, allow-listing a new asset, withdrawal etc */
export enum NodeSignatureKind {
  /** NODE_SIGNATURE_KIND_UNSPECIFIED - Represents an unspecified or missing value from the input. */
  NODE_SIGNATURE_KIND_UNSPECIFIED = 0,
  /** NODE_SIGNATURE_KIND_ASSET_NEW - Represents a signature for a new asset allow-listing. */
  NODE_SIGNATURE_KIND_ASSET_NEW = 1,
  /** NODE_SIGNATURE_KIND_ASSET_WITHDRAWAL - Represents a signature for an asset withdrawal. */
  NODE_SIGNATURE_KIND_ASSET_WITHDRAWAL = 2,
  /** NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_ADDED - Represents a signature for a new signer added to the erc20 multisig contract. */
  NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_ADDED = 3,
  /** NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_REMOVED - Represents a signature for a signer removed from the erc20 multisig contract. */
  NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_REMOVED = 4,
  /** NODE_SIGNATURE_KIND_ASSET_UPDATE - Represents a signature for an asset update allow-listing. */
  NODE_SIGNATURE_KIND_ASSET_UPDATE = 5,
  UNRECOGNIZED = -1,
}

/**
 * A validator command which is sent automatically at regular intervals by any validator participating in the network.
 * It is used to allow the network to know whether a validator is active, or if they have shut down.
 */
export interface ValidatorHeartbeat {
  /** Node ID of the validator emitting the heartbeat. */
  nodeId: string
  /** Signature from the validator made using their Ethereum wallet. */
  ethereumSignature: Signature | undefined
  /** Signature from the validator made using their Vega wallet. */
  vegaSignature: Signature | undefined
  /** Message which has been signed. */
  message: string
}

/** A command that allows a new node operator to announce themselves to the network as a new validator. */
export interface AnnounceNode {
  /** Vega public key of the node being announced. */
  vegaPubKey: string
  /** Ethereum public key of the node being announced. */
  ethereumAddress: string
  /** Public key for the blockchain, currently the node's CometBFT key. */
  chainPubKey: string
  /** URL to the node operators homepage allowing stake holders to make an informed decision when delegating. */
  infoUrl: string
  /** Country code (ISO 3166-1 alpha-2) for the location of the node. */
  country: string
  /** Node ID of the validator, which is the node's public master key. */
  id: string
  /** Human-readable name of the node. */
  name: string
  /** URL to the node operator's avatar. */
  avatarUrl: string
  /** Vega public key derivation index. */
  vegaPubKeyIndex: number
  /** Epoch from which the node is expected to be ready to validate blocks. */
  fromEpoch: number
  /** Signature from the node made using the ethereum wallet. */
  ethereumSignature: Signature | undefined
  /** Signature from the node made using the Vega wallet. */
  vegaSignature: Signature | undefined
  /** Ethereum public key to use as a submitter to allow automatic signature generation. */
  submitterAddress: string
}

/** A validator command which is sent automatically by a node when it has verified a resource external to the network. */
export interface NodeVote {
  /** Reference identifying the resource that has been verified. */
  reference: string
  /** Type of external event that has been verified. */
  type: NodeVote_Type
}

export enum NodeVote_Type {
  /** TYPE_UNSPECIFIED - Represents an unspecified or missing value from the input */
  TYPE_UNSPECIFIED = 0,
  /** TYPE_STAKE_DEPOSITED - Node vote for a new stake deposit */
  TYPE_STAKE_DEPOSITED = 1,
  /** TYPE_STAKE_REMOVED - Node vote for a new stake removed event */
  TYPE_STAKE_REMOVED = 2,
  /** TYPE_FUNDS_DEPOSITED - Node vote for a new collateral deposit */
  TYPE_FUNDS_DEPOSITED = 3,
  /** TYPE_SIGNER_ADDED - Node vote for a new signer added to the erc20 bridge */
  TYPE_SIGNER_ADDED = 4,
  /** TYPE_SIGNER_REMOVED - Node vote for a signer removed from the erc20 bridge */
  TYPE_SIGNER_REMOVED = 5,
  /** TYPE_BRIDGE_STOPPED - Node vote for a bridge stopped event */
  TYPE_BRIDGE_STOPPED = 6,
  /** TYPE_BRIDGE_RESUMED - Node vote for a bridge resumed event */
  TYPE_BRIDGE_RESUMED = 7,
  /** TYPE_ASSET_LISTED - Node vote for a newly listed asset */
  TYPE_ASSET_LISTED = 8,
  /** TYPE_LIMITS_UPDATED - Node vote for an asset limits update */
  TYPE_LIMITS_UPDATED = 9,
  /** TYPE_STAKE_TOTAL_SUPPLY - Node vote to share the total supply of the staking token */
  TYPE_STAKE_TOTAL_SUPPLY = 10,
  /** TYPE_SIGNER_THRESHOLD_SET - Node vote to update the threshold of the signer set for the multisig contract */
  TYPE_SIGNER_THRESHOLD_SET = 11,
  /** TYPE_GOVERNANCE_VALIDATE_ASSET - Node vote to validate a new assert governance proposal */
  TYPE_GOVERNANCE_VALIDATE_ASSET = 12,
  /** TYPE_ETHEREUM_CONTRACT_CALL_RESULT - Node vote for an Ethereum contract call result */
  TYPE_ETHEREUM_CONTRACT_CALL_RESULT = 13,
  UNRECOGNIZED = -1,
}

/** A validator command sent automatically containing a signature that can be used on a foreign chain to process an action. */
export interface NodeSignature {
  /** ID of the resource that the signature relates to. */
  id: string
  /** Signature generated by the node. */
  sig: Uint8Array
  /** Kind of resource being signed. */
  kind: NodeSignatureKind
}

/** A validator command sent automatically that provides information of events that have happened on foreign chains. */
export interface ChainEvent {
  /** ID of the transaction on the foreign chain that caused the event. */
  txId: string
  /** Arbitrary one-time integer used to prevent replay attacks. */
  nonce: number
  /** Built-in asset event. */
  builtin?: BuiltinAssetEvent | undefined
  /** Ethereum ERC20 event. */
  erc20?: ERC20Event | undefined
  /** Ethereum Staking event. */
  stakingEvent?: StakingEvent | undefined
  /** Ethereum ERC20 multisig event. */
  erc20Multisig?: ERC20MultiSigEvent | undefined
  /** Ethereum contract call event. */
  contractCall?: EthContractCallEvent | undefined
}

/** A validator command sent manually that allows a node operator to indicate to the network that their node's Vega key will be rotated. */
export interface KeyRotateSubmission {
  /** New Vega public key derivation index. */
  newPubKeyIndex: number
  /** Block height at which the key rotation will take effect. */
  targetBlock: number
  /** Vega public key that would be rotated to. */
  newPubKey: string
  /** Hash of the node's current Vega public key. */
  currentPubKeyHash: string
}

/** A validator command sent manually that allows a node operator to indicate to the network that their node's Ethereum key will be rotated. */
export interface EthereumKeyRotateSubmission {
  /** Block height at which the key rotation will take effect. */
  targetBlock: number
  /** Ethereum address that is being rotated to. */
  newAddress: string
  /** Ethereum address of the node's current Ethereum keys. */
  currentAddress: string
  /** Ethereum public key to use as a submitter to allow automatic signature generation. */
  submitterAddress: string
  /** Signature signed by the new Ethereum key that can be verified to prove ownership. */
  ethereumSignature: Signature | undefined
}

/** A validator command sent automatically to reach consensus on floating point values. */
export interface StateVariableProposal {
  /** Details of the state variable being proposed. */
  proposal: StateValueProposal | undefined
}

/** A validator command sent manually by a node operator to propose a protocol upgrade. */
export interface ProtocolUpgradeProposal {
  /** Block height at which to perform the upgrade. */
  upgradeBlockHeight: number
  /** Release tag for the Vega binary. */
  vegaReleaseTag: string
}
