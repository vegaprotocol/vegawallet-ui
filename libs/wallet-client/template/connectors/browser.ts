import { nanoid } from 'nanoid'
import { WalletModel, Identifier } from '../model'
import { Connector } from './interface'

export type ConnectorBrowserProps = {
  extensionId: string
}

const getRuntime = () => {
  if (typeof globalThis.browser?.runtime !== 'undefined') {
    return globalThis.browser.runtime as typeof browser.runtime
  }

  if (typeof globalThis.chrome?.runtime !== 'undefined') {
    return globalThis.chrome.runtime as typeof chrome.runtime
  }

  return undefined
}

const runtime = getRuntime()

export class ConnectorBrowser implements Connector {
  private extensionId: string
  private origin: string
  
  constructor({ extensionId }: ConnectorBrowserProps) {
    this.extensionId = extensionId
    this.origin = window.location.hostname
  }

  <% methods.forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %><% if (!method.params || !method.params.length) { %> = {} <% } %>) => {
    return runtime?.sendMessage(this.extensionId, {
      id: nanoid(),
      method: Identifier.<%= getMethodName(method) %>,
      params,
    })
  }
  <% }) %>
  
  /**
   * Returns a list of supported methods
   */
  public ListMethods = async (): Promise<{ registeredMethods: string[] }> => {
    return Promise.resolve({ registeredMethods: [] })
  }
}