// Code generated by @vegaprotocol/jsonrpc-generator@<%= version %>. DO NOT EDIT.
import { nanoid } from 'nanoid'

export namespace WalletModel {
<%= types %>
}

export enum Identifier {
<% methods.forEach((method) => { %><%= getMethodName(method) %> = '<%= method.name %>',
<%}) %>}

type Props = {
  hostname: string
  origin?: string
  token?: string
}

type Options = {
  id?: string
}

async function handleResponse <T>(res: Response) {
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  const { jsonrpc, ...json } = await res.json()

  return json as Promise<{
    result: T,
    id: string
  }>
}

export class WalletClient {
  private origin: string
  private hostname: string
  private token?: string

  constructor ({ hostname, origin, token }: Props) {
    this.origin = origin || window.location.origin
    this.hostname = hostname
    this.token = token
  }

  <% methods.filter(m => m.name === 'client.connect_wallet').forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %><% if (!method.params || !method.params.length) { %> = {} <% } %>, options?: Options) => {
    return fetch(`${this.hostname}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: this.origin,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: options?.id || nanoid(),
        method: Identifier.<%= getMethodName(method) %>,
        params: params,
      }),
    })
      .then(r => handleResponse<WalletModel.<%= getMethodResultType(method) %>>(r))
      .then(r => {
        this.token = r.result.token
        return r
      })
  }
  <% }) %>

  <% methods.filter(m => m.name !== 'client.connect_wallet' && !m.params.find(p => p.name === 'token')).forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %><% if (!method.params || !method.params.length) { %> = {} <% } %>, options?: Options) => {
    return fetch(`${this.hostname}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: this.origin,
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
    return fetch(`${this.hostname}/api/v2/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: this.origin,
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
    return fetch(`${this.hostname}/api/v2/methods`)
      .then(r => r.json())
  }
}
