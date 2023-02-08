import { nanoid } from 'nanoid'
import { WalletModel, Identifier } from '../model'
import { Connector } from './interface'

export type ConnectorBrowserProps = {
  extensionId: string
}

type Platform = 'chrome' | 'firefox'

const getPlatform = () => {
  if (typeof globalThis.browser?.runtime !== 'undefined') {
    return 'firefox'
  }

  if (typeof globalThis.chrome?.runtime !== 'undefined') {
    return 'chrome'
  }

  throw new Error('Unsupported platform, cannot find "browser" or "chrome" in the global namespace.')
}

type RequestProps<Req> = {
  platform: Platform
  extensionId: string
  method: Identifier
  params: Req
}

type Request<T> = {
  id: string
  method: Identifier
  params: T
}

function handleExtensionRequest <Req, Res> ({
  platform,
  extensionId,
  method,
  params
}: RequestProps<Req>) {
  switch (platform) {
    case 'chrome': {
      return chrome.runtime.sendMessage<Request<Req>, Res>(extensionId, {
        id: nanoid(),
        method,
        params,
      })
    }
    case 'firefox': {
      return browser.runtime.sendMessage(extensionId, {
        id: nanoid(),
        method,
        params,
      }) as Promise<Res>
    }
  }
}

export class ConnectorBrowser implements Connector {
  private origin: string
  private platform: Platform
  private extensionId: string
  
  constructor({ extensionId }: ConnectorBrowserProps) {
    this.origin = window.location.hostname
    this.platform = getPlatform()
    this.extensionId = extensionId
  }

  <% methods.forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %><% if (!method.params || !method.params.length) { %> = {} <% } %>) => {
    return handleExtensionRequest<
      WalletModel.<%= getMethodParamsType(method) %>,
      WalletModel.<%= getMethodResultType(method) %>
    >({
      platform: this.platform,
      extensionId: this.extensionId,
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