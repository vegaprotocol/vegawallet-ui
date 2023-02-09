import { nanoid } from 'nanoid'
import type { WalletModel } from '../model'
import { Identifier } from '../model'
import type { Connector } from './interface'

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

  throw new Error(
    'Unsupported platform, cannot find "browser" or "chrome" in the global namespace.'
  )
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

function handleExtensionRequest<Req, Res>({
  platform,
  extensionId,
  method,
  params,
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

  /**
   * Initiates a connection between a wallet and a third-party application.
   */

  // tslint:disable-next-line:max-line-length
  public ConnectWallet = async (
    params: WalletModel.ConnectWalletParams = {}
  ) => {
    return handleExtensionRequest<
      WalletModel.ConnectWalletParams,
      WalletModel.ConnectWalletResult
    >({
      platform: this.platform,
      extensionId: this.extensionId,
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
    return handleExtensionRequest<
      WalletModel.DisconnectWalletParams,
      WalletModel.DisconnectWalletResult
    >({
      platform: this.platform,
      extensionId: this.extensionId,
      method: Identifier.DisconnectWallet,
      params,
    })
  }

  /**
   * Returns the keys the user has allowed the third-party application to have access to.
   */

  // tslint:disable-next-line:max-line-length
  public ListKeys = async (params: WalletModel.ListKeysParams = {}) => {
    return handleExtensionRequest<
      WalletModel.ListKeysParams,
      WalletModel.ListKeysResult
    >({
      platform: this.platform,
      extensionId: this.extensionId,
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
    return handleExtensionRequest<
      WalletModel.SignTransactionParams,
      WalletModel.SignTransactionResult
    >({
      platform: this.platform,
      extensionId: this.extensionId,
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
    return handleExtensionRequest<
      WalletModel.SendTransactionParams,
      WalletModel.SendTransactionResult
    >({
      platform: this.platform,
      extensionId: this.extensionId,
      method: Identifier.SendTransaction,
      params,
    })
  }

  /**
   * Returns the chain ID of the network in use.
   */

  // tslint:disable-next-line:max-line-length
  public GetChainId = async (params: WalletModel.GetChainIdParams = {}) => {
    return handleExtensionRequest<
      WalletModel.GetChainIdParams,
      WalletModel.GetChainIdResult
    >({
      platform: this.platform,
      extensionId: this.extensionId,
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
