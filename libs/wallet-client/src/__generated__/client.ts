import type { ConnectorBrowserProps } from './connectors/browser'
import { ConnectorBrowser } from './connectors/browser'
import type { ConnectorHttpProps } from './connectors/http'
import { ConnectorHttp } from './connectors/http'
import type { WalletModel } from './model'

type Props =
  | (ConnectorHttpProps & {
      type: 'http'
    })
  | (ConnectorBrowserProps & {
      type: 'browser'
    })

export class WalletClient {
  private connector: ConnectorBrowser | ConnectorHttp

  constructor(props: Props) {
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
        throw new Error(
          'Invalid connector type. Only "http" or "browser" type supported.'
        )
      }
    }
  }

  /**
   * Initiates a connection between a wallet and a third-party application.
   */

  // tslint:disable-next-line:max-line-length
  public ConnectWallet = async (
    params: WalletModel.ConnectWalletParams = {}
  ) => {
    return this.connector.ConnectWallet(params)
  }

  /**
   * Ends the connection between the third-party application and the wallet.
   */

  // tslint:disable-next-line:max-line-length
  public DisconnectWallet = async (
    params: WalletModel.DisconnectWalletParams = {}
  ) => {
    return this.connector.DisconnectWallet(params)
  }

  /**
   * Returns the keys the user has allowed the third-party application to have access to.
   */

  // tslint:disable-next-line:max-line-length
  public ListKeys = async (params: WalletModel.ListKeysParams = {}) => {
    return this.connector.ListKeys(params)
  }

  /**
   * Sign a transaction without sending it.
   */

  // tslint:disable-next-line:max-line-length
  public SignTransaction = async (
    params: WalletModel.SignTransactionParams
  ) => {
    return this.connector.SignTransaction(params)
  }

  /**
   * Send a transaction to the network.
   */

  // tslint:disable-next-line:max-line-length
  public SendTransaction = async (
    params: WalletModel.SendTransactionParams
  ) => {
    return this.connector.SendTransaction(params)
  }

  /**
   * Returns the chain ID of the network in use.
   */

  // tslint:disable-next-line:max-line-length
  public GetChainId = async (params: WalletModel.GetChainIdParams = {}) => {
    return this.connector.GetChainId(params)
  }

  /**
   * Returns a list of supported methods
   */
  public ListMethods = async (): Promise<{ registeredMethods: string[] }> => {
    return this.connector.ListMethods()
  }
}
