import type { WalletModel } from '../model'

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
  GetChainId(
    params: WalletModel.GetChainIdParams
  ): Promise<WalletModel.GetChainIdResult>
  ListMethods(): Promise<{ registeredMethods: string[] }>
}
