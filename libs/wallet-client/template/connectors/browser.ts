import { nanoid } from 'nanoid'
import { WalletModel, Identifier } from '../model'
import { Connector } from './interface'

export type ConnectorBrowserProps = {
  firefoxId: string
  chromeId: string
}

type Platform = 'chrome' | 'firefox'

const getPlatform = () => {
  if (navigator.userAgent.includes('Firefox')) {
    return 'firefox'
  }

  if (navigator.userAgent.includes('Chrome')) {
    return 'chrome'
  }

  throw new Error('Unsupported platform, cannot find "browser" or "chrome" in the global namespace.')
}

const getExtensionId = (platform: Platform, { firefoxId, chromeId }: ConnectorBrowserProps) => {
  switch (platform) {
    case 'firefox': {
      return firefoxId
    }
    case 'chrome': {
      return chromeId
    }
  }
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
      if (!chrome.runtime) {
        throw new Error('No browser extension detected.')
      }
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
  
  constructor({ firefoxId, chromeId }: ConnectorBrowserProps) {
    this.origin = window.location.hostname
    this.platform = getPlatform()
    this.extensionId = getExtensionId(this.platform, { firefoxId, chromeId })
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