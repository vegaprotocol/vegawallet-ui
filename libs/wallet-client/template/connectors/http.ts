import { nanoid } from 'nanoid'
import { WalletModel, ResponseError, Identifier } from '../model'
import { Connector } from './interface'

export type ConnectorHttpProps = {
  address: string
  token?: string
  onTokenChange: (token: string | null) => void
}

export class WalletHttpError extends Error {
  public code: number

  constructor (code: number, message: string) {
    super(message)
    this.code = code
  }
}

export class WalletClientError extends Error {
  public title: string
  public code: number

  constructor (response: ResponseError) {
    super(response.data)
    this.title = response.message
    this.code = response.code
  }
}

async function handleHTTPResponse <T>(res: Response) {
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
  
    constructor ({ address, token, onTokenChange }: ConnectorHttpProps) {
      this.address = address
      this.token = token
      this.onTokenChange = onTokenChange
    }
  
    <% methods.forEach((method) => { %>
    /**
     * <%= method.summary %>
     */
  
    // tslint:disable-next-line:max-line-length
    public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %><% if (!method.params || !method.params.length) { %> = {} <% } %>) => {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      if (this.token) {
        headers.append('Authorization', this.token)
      }
  
      return fetch(`${this.address}/api/v2/requests`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: nanoid(),
          method: Identifier.<%= getMethodName(method) %>,
          params,
        }),
      })
        .then(r => {
          const token = r.headers.get('Authorization')
          if (token !== this.token) {
            this.token = token
            this.onTokenChange?.(token)
          }
          return r
        })
        .then(r => handleHTTPResponse<WalletModel.<%= getMethodResultType(method) %>>(r))
      }
      <% }) %>
    
      /**
       * Returns a list of supported methods
       */
      public ListMethods = async (): Promise<{ registeredMethods: string[] }> => {
        return fetch(`${this.address}/api/v2/methods`)
          .then(r => r.json())
      }
  }