import { nanoid } from 'nanoid'
import type { WalletModel, ResponseError } from '../model'
import { Identifier } from '../model'
import type { Connector } from './interface'

export type ConnectorHttpProps = {
  address: string
  token?: string
  onTokenChange: (token: string | null) => void
}

export class WalletHttpError extends Error {
  public code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

export class WalletClientError extends Error {
  public title: string
  public code: number

  constructor(response: ResponseError) {
    super(response.data)
    this.title = response.message
    this.code = response.code
  }
}

async function handleHTTPResponse<T>(res: Response) {
  try {
    const { jsonrpc, error, ...json } = await res.json()

    if (error) {
      throw new WalletClientError(error)
    }

    return json as Promise<T>
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

export class ConnectorHttp implements Connector {
  // The wallet service address to connect to
  private address: string
  // The stored connection token
  private token?: string | null
  // The token updater callback to update / save tokens
  private onTokenChange?: (token: string | null) => void

  constructor({ address, token, onTokenChange }: ConnectorHttpProps) {
    this.address = address
    this.token = token
    this.onTokenChange = onTokenChange
  }

  /**
   * Initiates a connection between a wallet and a third-party application.
   */

  // tslint:disable-next-line:max-line-length
  public ConnectWallet = async (
    params: WalletModel.ConnectWalletParams = {}
  ) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (this.token) {
      headers.append('Authorization', this.token)
    }

    return fetch(`${this.address}/api/v2/requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: nanoid(),
        method: Identifier.ConnectWallet,
        params,
      }),
    })
      .then((r) => {
        const token = r.headers.get('Authorization')
        if (token !== this.token) {
          this.token = token
          this.onTokenChange?.(token)
        }
        return r
      })
      .then((r) => handleHTTPResponse<WalletModel.ConnectWalletResult>(r))
  }

  /**
   * Ends the connection between the third-party application and the wallet.
   */

  // tslint:disable-next-line:max-line-length
  public DisconnectWallet = async (
    params: WalletModel.DisconnectWalletParams = {}
  ) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (this.token) {
      headers.append('Authorization', this.token)
    }

    return fetch(`${this.address}/api/v2/requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: nanoid(),
        method: Identifier.DisconnectWallet,
        params,
      }),
    })
      .then((r) => {
        const token = r.headers.get('Authorization')
        if (token !== this.token) {
          this.token = token
          this.onTokenChange?.(token)
        }
        return r
      })
      .then((r) => handleHTTPResponse<WalletModel.DisconnectWalletResult>(r))
  }

  /**
   * Returns the keys the user has allowed the third-party application to have access to.
   */

  // tslint:disable-next-line:max-line-length
  public ListKeys = async (params: WalletModel.ListKeysParams = {}) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (this.token) {
      headers.append('Authorization', this.token)
    }

    return fetch(`${this.address}/api/v2/requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: nanoid(),
        method: Identifier.ListKeys,
        params,
      }),
    })
      .then((r) => {
        const token = r.headers.get('Authorization')
        if (token !== this.token) {
          this.token = token
          this.onTokenChange?.(token)
        }
        return r
      })
      .then((r) => handleHTTPResponse<WalletModel.ListKeysResult>(r))
  }

  /**
   * Sign a transaction without sending it.
   */

  // tslint:disable-next-line:max-line-length
  public SignTransaction = async (
    params: WalletModel.SignTransactionParams
  ) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (this.token) {
      headers.append('Authorization', this.token)
    }

    return fetch(`${this.address}/api/v2/requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: nanoid(),
        method: Identifier.SignTransaction,
        params,
      }),
    })
      .then((r) => {
        const token = r.headers.get('Authorization')
        if (token !== this.token) {
          this.token = token
          this.onTokenChange?.(token)
        }
        return r
      })
      .then((r) => handleHTTPResponse<WalletModel.SignTransactionResult>(r))
  }

  /**
   * Send a transaction to the network.
   */

  // tslint:disable-next-line:max-line-length
  public SendTransaction = async (
    params: WalletModel.SendTransactionParams
  ) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (this.token) {
      headers.append('Authorization', this.token)
    }

    return fetch(`${this.address}/api/v2/requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: nanoid(),
        method: Identifier.SendTransaction,
        params,
      }),
    })
      .then((r) => {
        const token = r.headers.get('Authorization')
        if (token !== this.token) {
          this.token = token
          this.onTokenChange?.(token)
        }
        return r
      })
      .then((r) => handleHTTPResponse<WalletModel.SendTransactionResult>(r))
  }

  /**
   * Returns the chain ID of the network in use.
   */

  // tslint:disable-next-line:max-line-length
  public GetChainId = async (params: WalletModel.GetChainIdParams = {}) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (this.token) {
      headers.append('Authorization', this.token)
    }

    return fetch(`${this.address}/api/v2/requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: nanoid(),
        method: Identifier.GetChainId,
        params,
      }),
    })
      .then((r) => {
        const token = r.headers.get('Authorization')
        if (token !== this.token) {
          this.token = token
          this.onTokenChange?.(token)
        }
        return r
      })
      .then((r) => handleHTTPResponse<WalletModel.GetChainIdResult>(r))
  }

  /**
   * Returns a list of supported methods
   */
  public ListMethods = async (): Promise<{ registeredMethods: string[] }> => {
    return fetch(`${this.address}/api/v2/methods`).then((r) => r.json())
  }
}
