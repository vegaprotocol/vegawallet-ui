// Code generated by @vegaprotocol/jsonrpc-generator@0.0.1. DO NOT EDIT.
import { nanoid } from 'nanoid'

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
  export interface Transaction {}
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

type Props = {
  address: string
  origin?: string
  token?: string
  onTokenChange: (token: string | null) => void
}

type Options = {
  id?: string
}

type ResponseError = {
  code: number
  message: string
  data: string
}

export class WalletClientError extends Error {
  public code: number

  constructor(response: ResponseError) {
    const message = response.data
      ? `${response.message}: ${response.data}`
      : response.message

    super(message)
    this.code = response.code
  }
}

export class WalletHttpError extends Error {
  public code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

async function handleResponse<T>(res: Response) {
  try {
    const { jsonrpc, error, ...json } = await res.json()

    if (error) {
      throw new WalletClientError(error)
    }

    return json as Promise<{
      result: T
      id: string
    }>
  } catch (err) {
    if (err instanceof WalletClientError) {
      throw err
    }
    if (!res.ok) {
      throw new WalletHttpError(res.status, res.statusText)
    }
    throw err
  }
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

export class WalletClient {
  // The wallet service address to connect to
  private walletAddress: string
  // The dApp address which wants to connect
  private origin?: string
  // The stored connection token
  private token?: string | null
  // The token updater callback to update / save tokens
  private onTokenChange: (token: string | null) => void

  constructor({ address, origin, token, onTokenChange }: Props) {
    this.origin = origin || window.location.host
    this.walletAddress = address
    this.token = token
    this.onTokenChange = onTokenChange
  }

  /**
   * Initiates a connection between a wallet and a third-party application.
   */

  // tslint:disable-next-line:max-line-length
  public ConnectWallet = async (
    params: WalletModel.ConnectWalletParams = {},
    options?: Options
  ) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: options?.id || nanoid(),
        method: Identifier.ConnectWallet,
        params: {
          hostname: this.origin,
          ...params,
        },
      }),
    })
      .then((r) => {
        this.token = r.headers.get('Authorization')
        this.onTokenChange(this.token)
        return r
      })
      .then((r) => handleResponse<WalletModel.ConnectWalletResult>(r))
  }

  /**
   * Ends the connection between the third-party application and the wallet.
   */

  // tslint:disable-next-line:max-line-length
  public DisconnectWallet = async (
    params: WalletModel.DisconnectWalletParams = {},
    options?: Options
  ) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token ?? '',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: options?.id || nanoid(),
        method: Identifier.DisconnectWallet,
        params: params,
      }),
    }).then((r) => handleResponse<WalletModel.DisconnectWalletResult>(r))
  }

  /**
   * Returns the keys the user has allowed the third-party application to have access to.
   */

  // tslint:disable-next-line:max-line-length
  public ListKeys = async (
    params: WalletModel.ListKeysParams = {},
    options?: Options
  ) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token ?? '',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: options?.id || nanoid(),
        method: Identifier.ListKeys,
        params: params,
      }),
    }).then((r) => handleResponse<WalletModel.ListKeysResult>(r))
  }

  /**
   * Sign a transaction without sending it.
   */

  // tslint:disable-next-line:max-line-length
  public SignTransaction = async (
    params: WalletModel.SignTransactionParams,
    options?: Options
  ) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token ?? '',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: options?.id || nanoid(),
        method: Identifier.SignTransaction,
        params: params,
      }),
    }).then((r) => handleResponse<WalletModel.SignTransactionResult>(r))
  }

  /**
   * Send a transaction to the network.
   */

  // tslint:disable-next-line:max-line-length
  public SendTransaction = async (
    params: WalletModel.SendTransactionParams,
    options?: Options
  ) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token ?? '',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: options?.id || nanoid(),
        method: Identifier.SendTransaction,
        params: params,
      }),
    }).then((r) => handleResponse<WalletModel.SendTransactionResult>(r))
  }

  /**
   * Returns the chain ID of the network in use.
   */

  // tslint:disable-next-line:max-line-length
  public GetChainId = async (
    params: WalletModel.GetChainIdParams = {},
    options?: Options
  ) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token ?? '',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: options?.id || nanoid(),
        method: Identifier.GetChainId,
        params: params,
      }),
    }).then((r) => handleResponse<WalletModel.GetChainIdResult>(r))
  }

  /**
   * Returns a list of supported methods
   */
  public ListMethods = async (): Promise<{ registeredMethods: string[] }> => {
    return fetch(`${this.walletAddress}/api/v2/methods`).then((r) => r.json())
  }
}
