import type { Transaction as VegaTransaction } from '@vegaprotocol/transaction'

export namespace WalletModel {
  export type ConnectWalletResult = null
  /**
   * The Vega public key to use.
   */
  export type PublicKey = string
  /**
   * The chosen mode to send the transaction:
   * - `TYPE_SYNC` returns the result of running the transaction.
   * - `TYPE_ASYNC` returns right away without waiting to hear if the transaction is even valid.
   * - `TYPE_COMMIT` waits until the transaction is committed in a block, or until some timeout is reached, or returns return right away if the transaction is not valid.
   */
  export type SendingMode = 'TYPE_SYNC' | 'TYPE_ASYNC' | 'TYPE_COMMIT'

  export interface Methods {
    ConnectWalletResult?: ConnectWalletResult
    ConnectWalletParams?: ConnectWalletParams
    DisconnectWalletResult?: DisconnectWalletResult
    DisconnectWalletParams?: DisconnectWalletParams
    ListKeysResult?: ListKeysResult
    ListKeysParams?: ListKeysParams
    SignTransactionResult?: SignTransactionResult
    SignTransactionParams?: SignTransactionParams
    SendTransactionResult?: SendTransactionResult
    SendTransactionParams?: SendTransactionParams
    GetChainIdResult?: GetChainIdResult
    GetChainIdParams?: GetChainIdParams
  }
  export interface ConnectWalletParams {}
  export interface DisconnectWalletResult {
    [k: string]: unknown
  }
  export interface DisconnectWalletParams {}
  export interface ListKeysResult {
    keys: {
      name: string
      publicKey: string
    }[]
  }
  export interface ListKeysParams {}
  export interface SignTransactionResult {
    /**
     * A transaction that has been signed by the wallet.
     */
    transaction: {
      inputData: string
      signature: {
        value: string
        algo: string
        version: number
      }
      from: {
        publicKey?: string
        address?: string
      }
      version: number
      pow: {
        tid: string
        nonce: number
      }
    }
  }
  export interface SignTransactionParams {
    publicKey: PublicKey
    transaction: Transaction
  }
  /**
   * The transaction as a JSON object
   */
  export type Transaction = VegaTransaction
  export interface SendTransactionResult {
    /**
     * The date when the API received the request to send the transaction.
     *
     * The time is a quoted string in RFC 3339 format, with sub-second precision added if present.
     */
    receivedAt: string
    /**
     * The date when the transaction has been sent to the network.
     *
     * The time is a quoted string in RFC 3339 format, with sub-second precision added if present.
     */
    sentAt: string
    /**
     * The hash of the transaction. It's used to uniquely identify the transaction and can be used in the block explorer to retrieve it.
     */
    transactionHash: string
    /**
     * A transaction that has been signed by the wallet.
     */
    transaction: {
      inputData: string
      signature: {
        value: string
        algo: string
        version: number
      }
      from: {
        publicKey?: string
        address?: string
      }
      version: number
      pow: {
        tid: string
        nonce: number
      }
    }
  }
  export interface SendTransactionParams {
    publicKey: PublicKey
    sendingMode: SendingMode
    transaction: Transaction
  }
  export interface GetChainIdResult {
    /**
     * The chain identifier
     */
    chainID: string
  }
  export interface GetChainIdParams {}
}

export enum Identifier {
  ConnectWallet = 'client.connect_wallet',
  DisconnectWallet = 'client.disconnect_wallet',
  ListKeys = 'client.list_keys',
  SignTransaction = 'client.sign_transaction',
  SendTransaction = 'client.send_transaction',
  GetChainId = 'client.get_chain_id',
}

export type WalletClientHandler = ((
  id: Identifier.ConnectWallet,
  params: WalletModel.ConnectWalletParams
) => Promise<WalletModel.ConnectWalletResult>) &
  ((
    id: Identifier.DisconnectWallet,
    params: WalletModel.DisconnectWalletParams
  ) => Promise<WalletModel.DisconnectWalletResult>) &
  ((
    id: Identifier.ListKeys,
    params: WalletModel.ListKeysParams
  ) => Promise<WalletModel.ListKeysResult>) &
  ((
    id: Identifier.SignTransaction,
    params: WalletModel.SignTransactionParams
  ) => Promise<WalletModel.SignTransactionResult>) &
  ((
    id: Identifier.SendTransaction,
    params: WalletModel.SendTransactionParams
  ) => Promise<WalletModel.SendTransactionResult>) &
  ((
    id: Identifier.GetChainId,
    params: WalletModel.GetChainIdParams
  ) => Promise<WalletModel.GetChainIdResult>)

export type ResponseError = {
  code: number
  message: string
  data: string
}
