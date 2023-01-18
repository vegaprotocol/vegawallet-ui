// Code generated by @vegaprotocol/jsonrpc-generator@<%= version %>. DO NOT EDIT.
import { nanoid } from 'nanoid'

export namespace WalletModel {
<%= types %>
}

export enum Identifier {
<% methods.forEach((method) => { %><%= getMethodName(method) %> = '<%= method.name %>',
<%}) %>}

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

  constructor (response: ResponseError) {
    const message = response.data
      ? `${response.message}: ${response.data}`
      :  response.message

    super(message)
    this.code = response.code
  }
}

export class WalletHttpError extends Error {
  public code: number

  constructor (code: number, message: string) {
    super(message)
    this.code = code
  }
}

async function handleResponse <T>(res: Response) {
  try {
    const { jsonrpc, error, ...json } = await res.json()

    if (error) {
      throw new WalletClientError(error)
    }

    return json as Promise<{
      result: T,
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

export type WalletClientHandler = <% methods.forEach((method) => { %>
  & ((id: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %>) => Promise<WalletModel.<%= getMethodResultType(method) %>>)<%
  }) %>

export class WalletClient {
  // The wallet service address to connect to
  private walletAddress: string
  // The dApp address which wants to connect
  private origin?: string
  // The stored connection token
  private token?: string | null

  constructor ({ address, origin, token, onTokenChange }: Props) {
    this.origin = origin || window.location.host
    this.walletAddress = address
    this.token = token
  }

  <% methods.filter(m => m.name === 'client.connect_wallet').forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %><% if (!method.params || !method.params.length) { %> = {} <% } %>, options?: Options) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: options?.id || nanoid(),
        method: Identifier.<%= getMethodName(method) %>,
        params: {
          hostname: this.origin,
          ...params,
        },
      }),
    })
      .then(r => {
        this.token = r.headers.get('Authorization')
        onTokenChange(this.token)
        return r
      })
      .then(r => handleResponse<WalletModel.<%= getMethodResultType(method) %>>(r))
  }
  <% }) %>

  <% methods.filter(m => m.name !== 'client.connect_wallet' && !m.params.find(p => p.name === 'token')).forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %><% if (!method.params || !method.params.length) { %> = {} <% } %>, options?: Options) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token ?? '',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: options?.id || nanoid(),
        method: Identifier.<%= getMethodName(method) %>,
        params: params,
      }),
    }).then(r => handleResponse<WalletModel.<%= getMethodResultType(method) %>>(r))
  }
  <% }) %>

  <% methods.filter(m => !!m.params.find(p => p.name === 'token')).forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: Omit<WalletModel.<%= getMethodParamsType(method) %>, 'token'><% if (!method.params || !method.params.length || (method.params.length === 1 && method.params[0].name === 'token')) { %> = {} <% } %>, options?: Options) => {
    return fetch(`${this.walletAddress}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: options?.id || nanoid(),
        method: Identifier.<%= getMethodName(method) %>,
        params: {
          ...params,
          token: this.token,
        }
      }),
    }).then(r => handleResponse<WalletModel.<%= getMethodResultType(method) %>>(r))
  }
  <% }) %>

  /**
   * Returns a list of supported methods
   */
  public ListMethods = async (): Promise<{ registeredMethods: string[] }> => {
    return fetch(`${this.walletAddress}/api/v2/methods`)
      .then(r => r.json())
  }
}
