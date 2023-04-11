// Code generated by @vegaprotocol/jsonrpc-generator@0.0.1. DO NOT EDIT.
import { WalletModel } from '../model'

export interface Connector {
  ConnectWallet(
    params: WalletModel.ConnectWalletParams
  ): Promise<WalletModel.ConnectWalletResult>
  DisconnectWallet(
    params: WalletModel.DisconnectWalletParams
  ): Promise<WalletModel.DisconnectWalletResult>
  ListKeys(
    params: WalletModel.ListKeysParams
  ): Promise<WalletModel.ListKeysResult>
  SignTransaction(
    params: WalletModel.SignTransactionParams
  ): Promise<WalletModel.SignTransactionResult>
  SendTransaction(
    params: WalletModel.SendTransactionParams
  ): Promise<WalletModel.SendTransactionResult>
  CheckTransaction(
    params: WalletModel.CheckTransactionParams
  ): Promise<WalletModel.CheckTransactionResult>
  GetChainId(
    params: WalletModel.GetChainIdParams
  ): Promise<WalletModel.GetChainIdResult>
  ListMethods(): Promise<{ registeredMethods: string[] }>
}
