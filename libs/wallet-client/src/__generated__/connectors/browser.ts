import { nanoid } from 'nanoid'
import type { WalletModel} from '../model';
import { Identifier } from '../model'
import type { Connector } from './interface'

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

  /**
   * Initiates a connection between a wallet and a third-party application.
   */

  // tslint:disable-next-line:max-line-length
  public ConnectWallet = async (
    params: WalletModel.ConnectWalletParams = {}
  ) => {
    return runtime?.sendMessage(this.extensionId, {
      id: nanoid(),
      method: Identifier.ConnectWallet,
      params,
    })
  }

  /**
   * Ends the connection between the third-party application and the wallet.
   */

  // tslint:disable-next-line:max-line-length
  public DisconnectWallet = async (
    params: WalletModel.DisconnectWalletParams = {}
  ) => {
    return runtime?.sendMessage(this.extensionId, {
      id: nanoid(),
      method: Identifier.DisconnectWallet,
      params,
    })
  }

  /**
   * Returns the keys the user has allowed the third-party application to have access to.
   */

  // tslint:disable-next-line:max-line-length
  public ListKeys = async (params: WalletModel.ListKeysParams = {}) => {
    return runtime?.sendMessage(this.extensionId, {
      id: nanoid(),
      method: Identifier.ListKeys,
      params,
    })
  }

  /**
   * Sign a transaction without sending it.
   */

  // tslint:disable-next-line:max-line-length
  public SignTransaction = async (
    params: WalletModel.SignTransactionParams
  ) => {
    return runtime?.sendMessage(this.extensionId, {
      id: nanoid(),
      method: Identifier.SignTransaction,
      params,
    })
  }

  /**
   * Send a transaction to the network.
   */

  // tslint:disable-next-line:max-line-length
  public SendTransaction = async (
    params: WalletModel.SendTransactionParams
  ) => {
    return runtime?.sendMessage(this.extensionId, {
      id: nanoid(),
      method: Identifier.SendTransaction,
      params,
    })
  }

  /**
   * Returns the chain ID of the network in use.
   */

  // tslint:disable-next-line:max-line-length
  public GetChainId = async (params: WalletModel.GetChainIdParams = {}) => {
    return runtime?.sendMessage(this.extensionId, {
      id: nanoid(),
      method: Identifier.GetChainId,
      params,
    })
  }

  /**
   * Returns a list of supported methods
   */
  public ListMethods = async (): Promise<{ registeredMethods: string[] }> => {
    return Promise.resolve({ registeredMethods: [] })
  }
}
