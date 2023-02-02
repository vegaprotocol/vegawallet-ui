import type {
  BatchMarketInstructions as TBatchMarketInstructions,
  CancelTransfer as TCancelTransfer,
  DelegateSubmission as TDelegateSubmission,
  LiquidityProvisionAmendment as TLiquidityProvisionAmendment,
  LiquidityProvisionCancellation as TLiquidityProvisionCancellation,
  LiquidityProvisionSubmission as TLiquidityProvisionSubmission,
  OneOffTransfer as TOneOffTransfer,
  OrderAmendment as TOrderAmendment,
  OrderCancellation as TOrderCancellation,
  OrderSubmission as TOrderSubmission,
  ProposalSubmission as TProposalSubmission,
  RecurringTransfer as TRecurringTransfer,
  Transfer as TTransfer,
  UndelegateSubmission as TUndelegateSubmission,
  VoteSubmission as TVoteSubmission,
  WithdrawSubmission as TWithdrawSubmission,
} from './__generated__/vega/commands/v1/commands'

export namespace TransactionModel {
  export type BatchMarketInstructions = TBatchMarketInstructions
  export type CancelTransfer = TCancelTransfer
  export type DelegateSubmission = TDelegateSubmission
  export type LiquidityProvisionAmendment = TLiquidityProvisionAmendment
  export type LiquidityProvisionCancellation = TLiquidityProvisionCancellation
  export type LiquidityProvisionSubmission = TLiquidityProvisionSubmission
  export type OneOffTransfer = TOneOffTransfer
  export type OrderAmendment = TOrderAmendment
  export type OrderCancellation = TOrderCancellation
  export type OrderSubmission = TOrderSubmission
  export type ProposalSubmission = TProposalSubmission
  export type RecurringTransfer = TRecurringTransfer
  export type Transfer = TTransfer
  export type UndelegateSubmission = TUndelegateSubmission
  export type VoteSubmission = TVoteSubmission
  export type WithdrawSubmission = TWithdrawSubmission
}

export type Transaction =
  | TransactionModel.BatchMarketInstructions
  | TransactionModel.CancelTransfer
  | TransactionModel.DelegateSubmission
  | TransactionModel.LiquidityProvisionAmendment
  | TransactionModel.LiquidityProvisionCancellation
  | TransactionModel.LiquidityProvisionSubmission
  | TransactionModel.OneOffTransfer
  | TransactionModel.OrderAmendment
  | TransactionModel.OrderCancellation
  | TransactionModel.OrderSubmission
  | TransactionModel.ProposalSubmission
  | TransactionModel.RecurringTransfer
  | TransactionModel.Transfer
  | TransactionModel.UndelegateSubmission
  | TransactionModel.VoteSubmission
  | TransactionModel.WithdrawSubmission
