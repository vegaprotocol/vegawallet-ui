// Code generated by @vegaprotocol/jsonrpc-generator@0.0.1. DO NOT EDIT.

export namespace WalletModel {
  /**
   * The Vega public key to use.
   */
  export type PublicKey = string
  export type ListWalletsParams = []
  export type RenameWalletResult = null
  export type ListNetworksParams = []
  export type UpdateNetworkResult = null
  export type RemoveNetworkResult = null
  export type TaintKeyResult = null
  export type UntaintKeyResult = null
  /**
   * The different access modes a permission can have.
   */
  export type AccessMode = 'read' | 'none'

  export interface Methods {
    CreateWalletResult?: CreateWalletResult
    CreateWalletParams?: CreateWalletParams
    ImportWalletResult?: ImportWalletResult
    ImportWalletParams?: ImportWalletParams
    DescribeWalletResult?: DescribeWalletResult
    DescribeWalletParams?: DescribeWalletParams
    ListWalletsResult?: ListWalletsResult
    ListWalletsParams?: ListWalletsParams
    RenameWalletResult?: RenameWalletResult
    RenameWalletParams?: RenameWalletParams
    ListNetworksResult?: ListNetworksResult
    ListNetworksParams?: ListNetworksParams
    DescribeNetworkResult?: DescribeNetworkResult
    DescribeNetworkParams?: DescribeNetworkParams
    UpdateNetworkResult?: UpdateNetworkResult
    UpdateNetworkParams?: UpdateNetworkParams
    RemoveNetworkResult?: RemoveNetworkResult
    RemoveNetworkParams?: RemoveNetworkParams
    ImportNetworkResult?: ImportNetworkResult
    ImportNetworkParams?: ImportNetworkParams
    GenerateKeyResult?: GenerateKeyResult
    GenerateKeyParams?: GenerateKeyParams
    DescribeKeyResult?: DescribeKeyResult
    DescribeKeyParams?: DescribeKeyParams
    ListKeysResult?: ListKeysResult
    ListKeysParams?: ListKeysParams
    AnnotateKeyResult?: AnnotateKeyResult
    AnnotateKeyParams?: AnnotateKeyParams
    TaintKeyResult?: TaintKeyResult
    TaintKeyParams?: TaintKeyParams
    UntaintKeyResult?: UntaintKeyResult
    UntaintKeyParams?: UntaintKeyParams
    DescribePermissionsResult?: DescribePermissionsResult
    DescribePermissionsParams?: DescribePermissionsParams
    ListPermissionsResult?: ListPermissionsResult
    ListPermissionsParams?: ListPermissionsParams
    UpdatePermissionsResult?: UpdatePermissionsResult
    UpdatePermissionsParams?: UpdatePermissionsParams
    SignMessageResult?: SignMessageResult
    SignMessageParams?: SignMessageParams
  }
  export interface CreateWalletResult {
    /**
     * the newly generated wallet
     */
    wallet: {
      name: string
      version: number
      recoveryPhrase: string
      filePath: string
    }
    /**
     * the first public key generated
     */
    key: {
      publicKey: PublicKey
      algorithm: Algorithm
      metadata: Metadata[]
    }
  }
  /**
   * The algorithm used to generate the key.
   */
  export interface Algorithm {
    name: string
    version: string
  }
  /**
   * The key's metadata.
   */
  export interface Metadata {
    key: string
    value: string
  }
  export interface CreateWalletParams {
    wallet: string
    passphrase: string
  }
  export interface ImportWalletResult {
    /**
     * the imported wallet
     */
    wallet: {
      name: string
      version: number
      filePath: string
    }
    /**
     * the first public key generated
     */
    key: {
      publicKey: PublicKey
      algorithm: Algorithm
      metadata: Metadata[]
    }
  }
  export interface ImportWalletParams {
    wallet: string
    passphrase: string
    recoveryPhrase: string
    version: number
  }
  export interface DescribeWalletResult {
    name: string
    version: number
    id: string
    type: string
  }
  export interface DescribeWalletParams {
    wallet: string
    passphrase: string
  }
  export interface ListWalletsResult {
    wallets: string[]
  }
  export interface RenameWalletParams {
    wallet: string
    newName: string
    passphrase: string
  }
  export interface ListNetworksResult {
    networks: string[]
  }
  export interface DescribeNetworkResult {
    name: string
    logLevel: string
    tokenExpiry: string
    port: number
    host: string
    api: NetworkApiConfig
  }
  /**
   * The API configuration for the network.
   */
  export interface NetworkApiConfig {
    grpcConfig: {
      hosts: string[]
      retries: number
    }
    graphQLConfig: {
      hosts: string[]
    }
    restConfig: {
      hosts: string[]
    }
  }
  export interface DescribeNetworkParams {
    network: string
  }
  export interface UpdateNetworkParams {
    name: string
    logLevel: string
    tokenExpiry: string
    port: number
    host: string
    api: NetworkApiConfig
  }
  export interface RemoveNetworkParams {
    network: string
  }
  export interface ImportNetworkResult {
    name: string
    filePath: string
  }
  export interface ImportNetworkParams {
    name?: string
    filePath: string
    url: string
    overwrite: boolean
  }
  export interface GenerateKeyResult {
    publicKey: PublicKey
    algorithm: Algorithm
    metadata: Metadata[]
  }
  export interface GenerateKeyParams {
    wallet: string
    passphrase: string
    metadata: Metadata[]
  }
  export interface DescribeKeyResult {
    publicKey: PublicKey
    algorithm: Algorithm
    metadata: Metadata[]
    /**
     * Tells if the key is tainted or not. A tainted key cannot be used for signing and sending transaction, for example.
     */
    isTainted: boolean
  }
  export interface DescribeKeyParams {
    wallet: string
    passphrase: string
    publicKey: PublicKey
  }
  export interface ListKeysResult {
    keys: NamedPublicKey[]
  }
  /**
   * The public key with its name.
   */
  export interface NamedPublicKey {
    name: string
    publicKey: string
  }
  export interface ListKeysParams {
    wallet: string
    passphrase: string
  }
  export interface AnnotateKeyResult {
    metadata: Metadata[]
  }
  export interface AnnotateKeyParams {
    wallet: string
    passphrase: string
    publicKey: PublicKey
    metadata: Metadata[]
  }
  export interface TaintKeyParams {
    wallet: string
    passphrase: string
    publicKey: PublicKey
  }
  export interface UntaintKeyParams {
    wallet: string
    passphrase: string
    publicKey: PublicKey
  }
  export interface DescribePermissionsResult {
    permissions: Permissions
  }
  /**
   * The full description of the permissions a third-party application has.
   */
  export interface Permissions {
    /**
     * The permissions related to public keys.
     */
    publicKeys: {
      access: AccessMode
      /**
       * The subset of public keys the user selected for this hostname. If empty, the wallet assumes all keys are accessible.
       */
      restrictedKeys: string[]
    }
  }
  export interface DescribePermissionsParams {
    wallet: string
    passphrase: string
    hostname: string
  }
  export interface ListPermissionsResult {
    permissions: {
      [k: string]: string
    }
  }
  export interface ListPermissionsParams {
    wallet: string
    passphrase: string
  }
  export interface UpdatePermissionsResult {
    permissions: Permissions
  }
  export interface UpdatePermissionsParams {
    wallet: string
    passphrase: string
    hostname: string
    permissions: Permissions
  }
  export interface SignMessageResult {
    encodedSignature: string
  }
  export interface SignMessageParams {
    wallet: string
    passphrase: string
    pubKey: string
    /**
     * The message to sign encoded using base-64.
     */
    encodedMessage: string
  }
}

enum Identifier {
  CreateWallet = 'admin.create_wallet',
  ImportWallet = 'admin.import_wallet',
  DescribeWallet = 'admin.describe_wallet',
  ListWallets = 'admin.list_wallets',
  RenameWallet = 'admin.rename_wallet',
  ListNetworks = 'admin.list_networks',
  DescribeNetwork = 'admin.describe_network',
  UpdateNetwork = 'admin.update_network',
  RemoveNetwork = 'admin.remove_network',
  ImportNetwork = 'admin.import_network',
  GenerateKey = 'admin.generate_key',
  DescribeKey = 'admin.describe_key',
  ListKeys = 'admin.list_keys',
  AnnotateKey = 'admin.annotate_key',
  TaintKey = 'admin.taint_key',
  UntaintKey = 'admin.untaint_key',
  DescribePermissions = 'admin.describe_permissions',
  ListPermissions = 'admin.list_permissions',
  UpdatePermissions = 'admin.update_permissions',
  SignMessage = 'admin.sign_message',
}

export type WalletAPIRequest = ((
  id: Identifier.CreateWallet,
  params: WalletModel.CreateWalletParams
) => Promise<WalletModel.CreateWalletResult>) &
  ((
    id: Identifier.ImportWallet,
    params: WalletModel.ImportWalletParams
  ) => Promise<WalletModel.ImportWalletResult>) &
  ((
    id: Identifier.DescribeWallet,
    params: WalletModel.DescribeWalletParams
  ) => Promise<WalletModel.DescribeWalletResult>) &
  ((
    id: Identifier.ListWallets,
    params: WalletModel.ListWalletsParams
  ) => Promise<WalletModel.ListWalletsResult>) &
  ((
    id: Identifier.RenameWallet,
    params: WalletModel.RenameWalletParams
  ) => Promise<WalletModel.RenameWalletResult>) &
  ((
    id: Identifier.ListNetworks,
    params: WalletModel.ListNetworksParams
  ) => Promise<WalletModel.ListNetworksResult>) &
  ((
    id: Identifier.DescribeNetwork,
    params: WalletModel.DescribeNetworkParams
  ) => Promise<WalletModel.DescribeNetworkResult>) &
  ((
    id: Identifier.UpdateNetwork,
    params: WalletModel.UpdateNetworkParams
  ) => Promise<WalletModel.UpdateNetworkResult>) &
  ((
    id: Identifier.RemoveNetwork,
    params: WalletModel.RemoveNetworkParams
  ) => Promise<WalletModel.RemoveNetworkResult>) &
  ((
    id: Identifier.ImportNetwork,
    params: WalletModel.ImportNetworkParams
  ) => Promise<WalletModel.ImportNetworkResult>) &
  ((
    id: Identifier.GenerateKey,
    params: WalletModel.GenerateKeyParams
  ) => Promise<WalletModel.GenerateKeyResult>) &
  ((
    id: Identifier.DescribeKey,
    params: WalletModel.DescribeKeyParams
  ) => Promise<WalletModel.DescribeKeyResult>) &
  ((
    id: Identifier.ListKeys,
    params: WalletModel.ListKeysParams
  ) => Promise<WalletModel.ListKeysResult>) &
  ((
    id: Identifier.AnnotateKey,
    params: WalletModel.AnnotateKeyParams
  ) => Promise<WalletModel.AnnotateKeyResult>) &
  ((
    id: Identifier.TaintKey,
    params: WalletModel.TaintKeyParams
  ) => Promise<WalletModel.TaintKeyResult>) &
  ((
    id: Identifier.UntaintKey,
    params: WalletModel.UntaintKeyParams
  ) => Promise<WalletModel.UntaintKeyResult>) &
  ((
    id: Identifier.DescribePermissions,
    params: WalletModel.DescribePermissionsParams
  ) => Promise<WalletModel.DescribePermissionsResult>) &
  ((
    id: Identifier.ListPermissions,
    params: WalletModel.ListPermissionsParams
  ) => Promise<WalletModel.ListPermissionsResult>) &
  ((
    id: Identifier.UpdatePermissions,
    params: WalletModel.UpdatePermissionsParams
  ) => Promise<WalletModel.UpdatePermissionsResult>) &
  ((
    id: Identifier.SignMessage,
    params: WalletModel.SignMessageParams
  ) => Promise<WalletModel.SignMessageResult>)

export class WalletClient {
  private request: WalletAPIRequest

  constructor(request: WalletAPIRequest) {
    this.request = request
  }

  /**
   * Creates a wallet with its first key-pair.
   */

  // tslint:disable-next-line:max-line-length
  public CreateWallet = (params: WalletModel.CreateWalletParams) => {
    return this.request(Identifier.CreateWallet, params)
  }

  /**
   * Import a wallet with its first key-pair with a recovery phrase and a version.
   */

  // tslint:disable-next-line:max-line-length
  public ImportWallet = (params: WalletModel.ImportWalletParams) => {
    return this.request(Identifier.ImportWallet, params)
  }

  /**
   * Returns the wallet base information.
   */

  // tslint:disable-next-line:max-line-length
  public DescribeWallet = (params: WalletModel.DescribeWalletParams) => {
    return this.request(Identifier.DescribeWallet, params)
  }

  /**
   * Returns the list of the wallets present on the computer.
   */

  // tslint:disable-next-line:max-line-length
  public ListWallets = (...params: WalletModel.ListWalletsParams) => {
    return this.request(Identifier.ListWallets, params)
  }

  /**
   * Renames a wallet
   */

  // tslint:disable-next-line:max-line-length
  public RenameWallet = (params: WalletModel.RenameWalletParams) => {
    return this.request(Identifier.RenameWallet, params)
  }

  /**
   * Returns the list of all registered networks.
   */

  // tslint:disable-next-line:max-line-length
  public ListNetworks = (...params: WalletModel.ListNetworksParams) => {
    return this.request(Identifier.ListNetworks, params)
  }

  /**
   * Returns the network information.
   */

  // tslint:disable-next-line:max-line-length
  public DescribeNetwork = (params: WalletModel.DescribeNetworkParams) => {
    return this.request(Identifier.DescribeNetwork, params)
  }

  /**
   * Update an existing network.
   */

  // tslint:disable-next-line:max-line-length
  public UpdateNetwork = (params: WalletModel.UpdateNetworkParams) => {
    return this.request(Identifier.UpdateNetwork, params)
  }

  /**
   * Removes a network from the computer.
   */

  // tslint:disable-next-line:max-line-length
  public RemoveNetwork = (params: WalletModel.RemoveNetworkParams) => {
    return this.request(Identifier.RemoveNetwork, params)
  }

  /**
   * Import a network configuration from a file or an URL.
   */

  // tslint:disable-next-line:max-line-length
  public ImportNetwork = (params: WalletModel.ImportNetworkParams) => {
    return this.request(Identifier.ImportNetwork, params)
  }

  /**
   * Generates a key on the specified wallet.
   */

  // tslint:disable-next-line:max-line-length
  public GenerateKey = (params: WalletModel.GenerateKeyParams) => {
    return this.request(Identifier.GenerateKey, params)
  }

  /**
   * Returns key's information.
   */

  // tslint:disable-next-line:max-line-length
  public DescribeKey = (params: WalletModel.DescribeKeyParams) => {
    return this.request(Identifier.DescribeKey, params)
  }

  /**
   * Returns all generated key of the specified wallet.
   */

  // tslint:disable-next-line:max-line-length
  public ListKeys = (params: WalletModel.ListKeysParams) => {
    return this.request(Identifier.ListKeys, params)
  }

  /**
   * Attaches metadata to a key.
   */

  // tslint:disable-next-line:max-line-length
  public AnnotateKey = (params: WalletModel.AnnotateKeyParams) => {
    return this.request(Identifier.AnnotateKey, params)
  }

  /**
   * Marks the specified public key as tainted.
   */

  // tslint:disable-next-line:max-line-length
  public TaintKey = (params: WalletModel.TaintKeyParams) => {
    return this.request(Identifier.TaintKey, params)
  }

  /**
   * Remove the taint from the specified public key.
   */

  // tslint:disable-next-line:max-line-length
  public UntaintKey = (params: WalletModel.UntaintKeyParams) => {
    return this.request(Identifier.UntaintKey, params)
  }

  /**
   * Returns the permissions set for the specified wallet and hostname.
   */

  // tslint:disable-next-line:max-line-length
  public DescribePermissions = (
    params: WalletModel.DescribePermissionsParams
  ) => {
    return this.request(Identifier.DescribePermissions, params)
  }

  /**
   * Returns the permissions summary for all set hostnames.
   */

  // tslint:disable-next-line:max-line-length
  public ListPermissions = (params: WalletModel.ListPermissionsParams) => {
    return this.request(Identifier.ListPermissions, params)
  }

  /**
   * Updates the permissions for the specified wallet and hostname.
   */

  // tslint:disable-next-line:max-line-length
  public UpdatePermissions = (params: WalletModel.UpdatePermissionsParams) => {
    return this.request(Identifier.UpdatePermissions, params)
  }

  /**
   * Sign any arbitrary message
   */

  // tslint:disable-next-line:max-line-length
  public SignMessage = (params: WalletModel.SignMessageParams) => {
    return this.request(Identifier.SignMessage, params)
  }
}
