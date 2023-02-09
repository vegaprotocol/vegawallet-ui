import { ConnectorBrowser, ConnectorBrowserProps } from './connectors/browser'
import { ConnectorHttp, ConnectorHttpProps } from './connectors/http'
import { WalletModel } from './model'

type Props = (ConnectorHttpProps & {
  type: 'http'
}) | (ConnectorBrowserProps & {
  type: 'browser',
})

export class WalletClient {
  private connector: ConnectorBrowser | ConnectorHttp

  constructor (props: Props) {
    switch (props.type) {
      case 'http': {
        const { type, ...rest } = props
        this.connector = new ConnectorHttp(rest)
        break
      }
      case 'browser': {
        const { type, ...rest } = props
        this.connector = new ConnectorBrowser(rest)
        break
      }
      default: {
        throw new Error('Invalid connector type. Only "http" or "browser" type supported.')
      }
    }
  }

  <% methods.forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = async (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %><% if (!method.params || !method.params.length) { %> = {} <% } %>) => {
    return this.connector.<%= getMethodName(method) %>(<%= getMethodParams(method) %>)
  }
  <% }) %>

  /**
   * Returns a list of supported methods
   */
  public ListMethods = async (): Promise<{ registeredMethods: string[] }> => {
    return this.connector.ListMethods()
  }
}