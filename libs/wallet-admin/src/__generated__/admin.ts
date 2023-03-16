// Code generated by @vegaprotocol/jsonrpc-generator@0.0.1. DO NOT EDIT.
import type { WalletModel, WalletAPIHandler } from './model';
import { Identifier } from './model'

export class WalletAdmin {
  private request: WalletAPIHandler

  constructor(request: WalletAPIHandler) {
    this.request = request
  }

  /**
   * Creates a wallet with its first key-pair.
   */

  // tslint:disable-next-line:max-line-length
  public CreateWallet = (params: WalletModel.CreateWalletParams) => {
    return this.request({
      method: Identifier.CreateWallet,
      params,
    })
  }

  /**
   * Import a wallet with its first key-pair with a recovery phrase and a key derivation version.
   */

  // tslint:disable-next-line:max-line-length
  public ImportWallet = (params: WalletModel.ImportWalletParams) => {
    return this.request({
      method: Identifier.ImportWallet,
      params,
    })
  }

  /**
   * Change the passphrase of the specified wallet.
   */

  // tslint:disable-next-line:max-line-length
  public UpdatePassphrase = (params: WalletModel.UpdatePassphraseParams) => {
    return this.request({
      method: Identifier.UpdatePassphrase,
      params,
    })
  }

  /**
   * Returns the wallet base information.
   */

  // tslint:disable-next-line:max-line-length
  public DescribeWallet = (params: WalletModel.DescribeWalletParams) => {
    return this.request({
      method: Identifier.DescribeWallet,
      params,
    })
  }

  /**
   * Returns the list of the wallets present on the computer.
   */

  // tslint:disable-next-line:max-line-length
  public ListWallets = (...params: WalletModel.ListWalletsParams) => {
    return this.request({
      method: Identifier.ListWallets,
      params,
    })
  }

  /**
   * Renames a wallet
   */

  // tslint:disable-next-line:max-line-length
  public RenameWallet = (params: WalletModel.RenameWalletParams) => {
    return this.request({
      method: Identifier.RenameWallet,
      params,
    })
  }

  /**
   * Removes a wallet from the computer.
   */

  // tslint:disable-next-line:max-line-length
  public RemoveWallet = (params: WalletModel.RemoveWalletParams) => {
    return this.request({
      method: Identifier.RemoveWallet,
      params,
    })
  }

  /**
   * Returns the list of all registered networks.
   */

  // tslint:disable-next-line:max-line-length
  public ListNetworks = (...params: WalletModel.ListNetworksParams) => {
    return this.request({
      method: Identifier.ListNetworks,
      params,
    })
  }

  /**
   * Returns the network information.
   */

  // tslint:disable-next-line:max-line-length
  public DescribeNetwork = (params: WalletModel.DescribeNetworkParams) => {
    return this.request({
      method: Identifier.DescribeNetwork,
      params,
    })
  }

  /**
   * Update an existing network.
   */

  // tslint:disable-next-line:max-line-length
  public UpdateNetwork = (params: WalletModel.UpdateNetworkParams) => {
    return this.request({
      method: Identifier.UpdateNetwork,
      params,
    })
  }

  /**
   * Renames a network
   */

  // tslint:disable-next-line:max-line-length
  public RenameNetwork = (params: WalletModel.RenameNetworkParams) => {
    return this.request({
      method: Identifier.RenameNetwork,
      params,
    })
  }

  /**
   * Removes a network from the computer.
   */

  // tslint:disable-next-line:max-line-length
  public RemoveNetwork = (params: WalletModel.RemoveNetworkParams) => {
    return this.request({
      method: Identifier.RemoveNetwork,
      params,
    })
  }

  /**
   * Import a network configuration from a file or an URL.
   */

  // tslint:disable-next-line:max-line-length
  public ImportNetwork = (params: WalletModel.ImportNetworkParams) => {
    return this.request({
      method: Identifier.ImportNetwork,
      params,
    })
  }

  /**
   * Generates a key on the specified wallet.
   */

  // tslint:disable-next-line:max-line-length
  public GenerateKey = (params: WalletModel.GenerateKeyParams) => {
    return this.request({
      method: Identifier.GenerateKey,
      params,
    })
  }

  /**
   * Returns key's information.
   */

  // tslint:disable-next-line:max-line-length
  public DescribeKey = (params: WalletModel.DescribeKeyParams) => {
    return this.request({
      method: Identifier.DescribeKey,
      params,
    })
  }

  /**
   * Returns all generated key of the specified wallet.
   */

  // tslint:disable-next-line:max-line-length
  public ListKeys = (params: WalletModel.ListKeysParams) => {
    return this.request({
      method: Identifier.ListKeys,
      params,
    })
  }

  /**
   * Attaches metadata to a key.
   */

  // tslint:disable-next-line:max-line-length
  public AnnotateKey = (params: WalletModel.AnnotateKeyParams) => {
    return this.request({
      method: Identifier.AnnotateKey,
      params,
    })
  }

  /**
   * Isolate a key to a specific wallet.
   */

  // tslint:disable-next-line:max-line-length
  public IsolateKey = (params: WalletModel.IsolateKeyParams) => {
    return this.request({
      method: Identifier.IsolateKey,
      params,
    })
  }

  /**
   * Builds a transaction to rotate key on the network.
   */

  // tslint:disable-next-line:max-line-length
  public RotateKey = (params: WalletModel.RotateKeyParams) => {
    return this.request({
      method: Identifier.RotateKey,
      params,
    })
  }

  /**
   * Marks the specified public key as tainted.
   */

  // tslint:disable-next-line:max-line-length
  public TaintKey = (params: WalletModel.TaintKeyParams) => {
    return this.request({
      method: Identifier.TaintKey,
      params,
    })
  }

  /**
   * Remove the taint from the specified public key.
   */

  // tslint:disable-next-line:max-line-length
  public UntaintKey = (params: WalletModel.UntaintKeyParams) => {
    return this.request({
      method: Identifier.UntaintKey,
      params,
    })
  }

  /**
   * Returns the permissions set for the specified wallet and hostname.
   */

  // tslint:disable-next-line:max-line-length
  public DescribePermissions = (
    params: WalletModel.DescribePermissionsParams
  ) => {
    return this.request({
      method: Identifier.DescribePermissions,
      params,
    })
  }

  /**
   * Returns the permissions summary for all set hostnames.
   */

  // tslint:disable-next-line:max-line-length
  public ListPermissions = (params: WalletModel.ListPermissionsParams) => {
    return this.request({
      method: Identifier.ListPermissions,
      params,
    })
  }

  /**
   * Updates the permissions for the specified wallet and hostname.
   */

  // tslint:disable-next-line:max-line-length
  public UpdatePermissions = (params: WalletModel.UpdatePermissionsParams) => {
    return this.request({
      method: Identifier.UpdatePermissions,
      params,
    })
  }

  /**
   * Revokes the permissions set in the specified hostname.
   */

  // tslint:disable-next-line:max-line-length
  public RevokePermissions = (params: WalletModel.RevokePermissionsParams) => {
    return this.request({
      method: Identifier.RevokePermissions,
      params,
    })
  }

  /**
   * Purges all the permissions set for all hostname.
   */

  // tslint:disable-next-line:max-line-length
  public PurgePermissions = (params: WalletModel.PurgePermissionsParams) => {
    return this.request({
      method: Identifier.PurgePermissions,
      params,
    })
  }

  /**
   * Sign a command using the specified wallet and public key.
   */

  // tslint:disable-next-line:max-line-length
  public SignTransaction = (params: WalletModel.SignTransactionParams) => {
    return this.request({
      method: Identifier.SignTransaction,
      params,
    })
  }

  /**
   * Sign any arbitrary message
   */

  // tslint:disable-next-line:max-line-length
  public SignMessage = (params: WalletModel.SignMessageParams) => {
    return this.request({
      method: Identifier.SignMessage,
      params,
    })
  }

  /**
   * Verify any arbitrary signature
   */

  // tslint:disable-next-line:max-line-length
  public VerifyMessage = (params: WalletModel.VerifyMessageParams) => {
    return this.request({
      method: Identifier.VerifyMessage,
      params,
    })
  }

  /**
   * Sign & send a transaction to a network
   */

  // tslint:disable-next-line:max-line-length
  public SendTransaction = (params: WalletModel.SendTransactionParams) => {
    return this.request({
      method: Identifier.SendTransaction,
      params,
    })
  }

  /**
   * Check transaction command using the specified wallet and public key.
   */

  // tslint:disable-next-line:max-line-length
  public CheckTransaction = (params: WalletModel.CheckTransactionParams) => {
    return this.request({
      method: Identifier.CheckTransaction,
      params,
    })
  }

  /**
   * Send a signed transaction to a network
   */

  // tslint:disable-next-line:max-line-length
  public SendRawTransaction = (
    params: WalletModel.SendRawTransactionParams
  ) => {
    return this.request({
      method: Identifier.SendRawTransaction,
      params,
    })
  }

  /**
   * Start a wallet service.
   */

  // tslint:disable-next-line:max-line-length
  public StartService = (params: WalletModel.StartServiceParams) => {
    return this.request({
      method: Identifier.StartService,
      params,
    })
  }

  /**
   * Stop a wallet service.
   */

  // tslint:disable-next-line:max-line-length
  public StopService = (params: WalletModel.StopServiceParams) => {
    return this.request({
      method: Identifier.StopService,
      params,
    })
  }

  /**
   * List all the connections of a service.
   */

  // tslint:disable-next-line:max-line-length
  public ListConnections = (params: WalletModel.ListConnectionsParams) => {
    return this.request({
      method: Identifier.ListConnections,
      params,
    })
  }

  /**
   * Close the connection between a third-party application and a wallet.
   */

  // tslint:disable-next-line:max-line-length
  public CloseConnection = (params: WalletModel.CloseConnectionParams) => {
    return this.request({
      method: Identifier.CloseConnection,
      params,
    })
  }

  /**
   * Close the connection from the specified third-party application to any wallet.
   */

  // tslint:disable-next-line:max-line-length
  public CloseConnectionsToHostname = (
    params: WalletModel.CloseConnectionsToHostnameParams
  ) => {
    return this.request({
      method: Identifier.CloseConnectionsToHostname,
      params,
    })
  }

  /**
   * Close the connection from any third-party application to the specified wallet.
   */

  // tslint:disable-next-line:max-line-length
  public CloseConnectionsToWallet = (
    params: WalletModel.CloseConnectionsToWalletParams
  ) => {
    return this.request({
      method: Identifier.CloseConnectionsToWallet,
      params,
    })
  }
}
