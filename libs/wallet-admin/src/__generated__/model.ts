// Code generated by @vegaprotocol/jsonrpc-generator@0.0.1. DO NOT EDIT.
export namespace WalletModel {
  export type UpdatePassphraseResult = null
  export type ListWalletsParams = []
  export type RenameWalletResult = null
  export type RemoveWalletResult = null
  export type ListNetworksParams = []
  export type UpdateNetworkResult = null
  export type RemoveNetworkResult = null
  /**
   * The Vega public key to use.
   */
  export type PublicKey = string
  export type TaintKeyResult = null
  export type UntaintKeyResult = null
  export type RevokePermissionsResult = null
  export type PurgePermissionsResult = null
  /**
   * The chosen mode to send the transaction:
   * - `TYPE_SYNC` returns the result of running the transaction.
   * - `TYPE_ASYNC` returns right away without waiting to hear if the transaction is even valid.
   * - `TYPE_COMMIT` waits until the transaction is committed in a block, or until some timeout is reached, or returns return right away if the transaction is not valid.
   */
  export type SendingMode = 'TYPE_SYNC' | 'TYPE_ASYNC' | 'TYPE_COMMIT'
  export type StartServiceResult = null
  export type StopServiceResult = null
  export type CloseConnectionResult = null
  export type CloseConnectionsToHostnameResult = null
  export type CloseConnectionsToWalletResult = null

  export interface Methods {
    CreateWalletResult?: CreateWalletResult
    CreateWalletParams?: CreateWalletParams
    ImportWalletResult?: ImportWalletResult
    ImportWalletParams?: ImportWalletParams
    UpdatePassphraseResult?: UpdatePassphraseResult
    UpdatePassphraseParams?: UpdatePassphraseParams
    DescribeWalletResult?: DescribeWalletResult
    DescribeWalletParams?: DescribeWalletParams
    ListWalletsResult?: ListWalletsResult
    ListWalletsParams?: ListWalletsParams
    RenameWalletResult?: RenameWalletResult
    RenameWalletParams?: RenameWalletParams
    RemoveWalletResult?: RemoveWalletResult
    RemoveWalletParams?: RemoveWalletParams
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
    IsolateKeyResult?: IsolateKeyResult
    IsolateKeyParams?: IsolateKeyParams
    RotateKeyResult?: RotateKeyResult
    RotateKeyParams?: RotateKeyParams
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
    RevokePermissionsResult?: RevokePermissionsResult
    RevokePermissionsParams?: RevokePermissionsParams
    PurgePermissionsResult?: PurgePermissionsResult
    PurgePermissionsParams?: PurgePermissionsParams
    SignTransactionResult?: SignTransactionResult
    SignTransactionParams?: SignTransactionParams
    SignMessageResult?: SignMessageResult
    SignMessageParams?: SignMessageParams
    VerifyMessageResult?: VerifyMessageResult
    VerifyMessageParams?: VerifyMessageParams
    SendTransactionResult?: SendTransactionResult
    SendTransactionParams?: SendTransactionParams
    SendRawTransactionResult?: SendRawTransactionResult
    SendRawTransactionParams?: SendRawTransactionParams
    StartServiceResult?: StartServiceResult
    StartServiceParams?: StartServiceParams
    StopServiceResult?: StopServiceResult
    StopServiceParams?: StopServiceParams
    ListConnectionsResult?: ListConnectionsResult
    ListConnectionsParams?: ListConnectionsParams
    CloseConnectionResult?: CloseConnectionResult
    CloseConnectionParams?: CloseConnectionParams
    CloseConnectionsToHostnameResult?: CloseConnectionsToHostnameResult
    CloseConnectionsToHostnameParams?: CloseConnectionsToHostnameParams
    CloseConnectionsToWalletResult?: CloseConnectionsToWalletResult
    CloseConnectionsToWalletParams?: CloseConnectionsToWalletParams
  }
  export interface CreateWalletResult {
    /**
     * the newly generated wallet
     */
    wallet: {
      name: string
      keyDerivationVersion: number
      recoveryPhrase: string
      filePath: string
    }
    /**
     * the first public key generated
     */
    key: {
      /**
       * The Vega public key to use.
       */
      publicKey: string
      /**
       * The algorithm used to generate the key.
       */
      algorithm: {
        name: string
        version: number
      }
      metadata: {
        key: string
        value: string
      }[]
    }
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
      keyDerivationVersion: number
      filePath: string
    }
    /**
     * the first public key generated
     */
    key: {
      /**
       * The Vega public key to use.
       */
      publicKey: string
      /**
       * The algorithm used to generate the key.
       */
      algorithm: {
        name: string
        version: number
      }
      metadata: {
        key: string
        value: string
      }[]
    }
  }
  export interface ImportWalletParams {
    wallet: string
    passphrase: string
    recoveryPhrase: string
    keyDerivationVersion: number
  }
  export interface UpdatePassphraseParams {
    wallet: string
    passphrase: string
    newPassphrase: string
  }
  export interface DescribeWalletResult {
    name: string
    keyDerivationVersion: number
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
  export interface RemoveWalletParams {
    wallet: string
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
    /**
     * The API configuration for the network.
     */
    api: {
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
  }
  export interface DescribeNetworkParams {
    name: string
  }
  export interface UpdateNetworkParams {
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
  export interface RemoveNetworkParams {
    name: string
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
    /**
     * The Vega public key to use.
     */
    publicKey: string
    /**
     * The algorithm used to generate the key.
     */
    algorithm: {
      name: string
      version: number
    }
    metadata: {
      key: string
      value: string
    }[]
  }
  export interface GenerateKeyParams {
    wallet: string
    passphrase: string
    metadata: {
      key: string
      value: string
    }[]
  }
  export interface DescribeKeyResult {
    /**
     * The Vega public key to use.
     */
    publicKey: string
    /**
     * The algorithm used to generate the key.
     */
    algorithm: {
      name: string
      version: number
    }
    metadata: {
      key: string
      value: string
    }[]
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
    keys: {
      name: string
      publicKey: string
    }[]
  }
  export interface ListKeysParams {
    wallet: string
    passphrase: string
  }
  export interface AnnotateKeyResult {
    metadata: {
      key: string
      value: string
    }[]
  }
  export interface AnnotateKeyParams {
    wallet: string
    passphrase: string
    publicKey: PublicKey
    metadata: {
      key: string
      value: string
    }[]
  }
  export interface IsolateKeyResult {
    /**
     * Name of the generated isolated wallet
     */
    wallet: string
    /**
     * Path to the isolated wallet file
     */
    filePath: string
  }
  export interface IsolateKeyParams {
    wallet: string
    passphrase: string
    isolatedWalletPassphrase: string
    publicKey: PublicKey
  }
  export interface RotateKeyResult {
    /**
     * The master public key of the wallet used to sign the transaction
     */
    masterPublicKey: string
    /**
     * The base64-encoded key rotation transaction
     */
    encodedTransaction: string
  }
  export interface RotateKeyParams {
    wallet: string
    passphrase: string
    /**
     * The current public key
     */
    fromPublicKey: string
    /**
     * The next public key to rotate to
     */
    toPublicKey: string
    /**
     * The chain identifier
     */
    chainID: string
    /**
     * The block height (approximation) at which the transaction will be submitted
     */
    submissionBlockHeight: string
    /**
     * The block height at which the rotation should happen
     */
    enactmentBlockHeight: string
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
    /**
     * The full description of the permissions a third-party application has.
     */
    permissions: {
      /**
       * The permissions related to public keys.
       */
      publicKeys: {
        /**
         * The different access modes a permission can have.
         */
        access: 'read' | 'none'
        /**
         * The subset of public keys the user selected for this hostname. If empty, the wallet assumes all keys are accessible.
         */
        allowedKeys: string[]
      }
    }
  }
  export interface DescribePermissionsParams {
    wallet: string
    passphrase: string
    hostname: string
  }
  export interface ListPermissionsResult {
    permissions: {
      /**
       * The description of the permissions a third-party application has.
       *
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` ".".
       */
      [k: string]: {
        /**
         * The different access modes a permission can have.
         */
        public_keys: 'read' | 'none'
      }
    }
  }
  export interface ListPermissionsParams {
    wallet: string
    passphrase: string
  }
  export interface UpdatePermissionsResult {
    /**
     * The full description of the permissions a third-party application has.
     */
    permissions: {
      /**
       * The permissions related to public keys.
       */
      publicKeys: {
        /**
         * The different access modes a permission can have.
         */
        access: 'read' | 'none'
        /**
         * The subset of public keys the user selected for this hostname. If empty, the wallet assumes all keys are accessible.
         */
        allowedKeys: string[]
      }
    }
  }
  export interface UpdatePermissionsParams {
    wallet: string
    passphrase: string
    hostname: string
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
      /**
       * The different access modes a permission can have.
       */
      access: 'read' | 'none'
      /**
       * The subset of public keys the user selected for this hostname. If empty, the wallet assumes all keys are accessible.
       */
      allowedKeys: string[]
    }
  }
  export interface RevokePermissionsParams {
    wallet: string
    passphrase: string
    hostname: string
  }
  export interface PurgePermissionsParams {
    wallet: string
    passphrase: string
  }
  export interface SignTransactionResult {
    encodedTransaction: string
  }
  export interface SignTransactionParams {
    wallet: string
    passphrase: string
    pubKey: string
    chainId: string
    blockHeight: number
    network?: number
    transaction: Transaction
  }
  /**
   * The transaction as a JSON object
   */
  export interface Transaction {}
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
  export interface VerifyMessageResult {
    isValid: string
  }
  export interface VerifyMessageParams {
    pubKey: string
    /**
     * The message use to create the signature, encoded using base-64.
     */
    encodedMessage: string
    /**
     * The signature to verify, encoded using base-64.
     */
    encodedSignature: string
  }
  export interface SendTransactionResult {
    /**
     * The date when the API received the request to send the transaction.
     *
     * The time is a quoted string in RFC 3339 format, with sub-second precision added if present.
     */
    receivedAt: string
    /**
     * The date when the transaction has been sent to the network.
     *
     * The time is a quoted string in RFC 3339 format, with sub-second precision added if present.
     */
    sentAt: string
    /**
     * The hash of the transaction. It's used to uniquely identify the transaction and can be used in the block explorer to retrieve it.
     */
    transactionHash: string
    /**
     * A transaction that has been signed by the wallet.
     */
    transaction: {
      inputData: string
      signature: {
        value: string
        algo: string
        version: number
      }
      from: {
        publicKey?: string
        address?: string
      }
      version: number
      pow: {
        tid: string
        nonce: number
      }
    }
  }
  export interface SendTransactionParams {
    wallet: string
    passphrase: string
    pubKey: string
    network?: number
    sendingMode: SendingMode
    transaction: Transaction1
  }
  /**
   * The transaction as a JSON object
   */
  export interface Transaction1 {}
  export interface SendRawTransactionResult {
    /**
     * The date when the API received the request to send the transaction.
     *
     * The time is a quoted string in RFC 3339 format, with sub-second precision added if present.
     */
    receivedAt: string
    /**
     * The date when the transaction has been sent to the network.
     *
     * The time is a quoted string in RFC 3339 format, with sub-second precision added if present.
     */
    sentAt: string
    /**
     * The hash of the transaction. It's used to uniquely identify the transaction and can be used in the block explorer to retrieve it.
     */
    transactionHash: string
    /**
     * A transaction that has been signed by the wallet.
     */
    transaction: {
      inputData: string
      signature: {
        value: string
        algo: string
        version: number
      }
      from: {
        publicKey?: string
        address?: string
      }
      version: number
      pow: {
        tid: string
        nonce: number
      }
    }
  }
  export interface SendRawTransactionParams {
    /**
     * The signed transaction to be sent, encoded using base-64.
     */
    encodedTransaction: string
    /**
     * The network to send the transaction to.
     */
    network: string
    /**
     * The node address to send the transaction to.
     */
    nodeAddress: string
    /**
     * the number of times sending the transaction should be attempted if it fails
     */
    retries: number
    sendingMode: SendingMode
  }
  export interface StartServiceParams {
    network: string
    noVersionCheck: boolean
  }
  export interface StopServiceParams {
    network: string
  }
  export interface ListConnectionsResult {
    /**
     * The list is sorted by hostname, then by wallet name.
     */
    activeConnections: {
      hostname: string
      wallet: string
    }[]
  }
  export interface ListConnectionsParams {}
  export interface CloseConnectionParams {
    hostname: string
    wallet: string
  }
  export interface CloseConnectionsToHostnameParams {
    hostname: string
  }
  export interface CloseConnectionsToWalletParams {
    wallet: string
  }
}

export enum Identifier {
  CreateWallet = 'admin.create_wallet',
  ImportWallet = 'admin.import_wallet',
  UpdatePassphrase = 'admin.update_passphrase',
  DescribeWallet = 'admin.describe_wallet',
  ListWallets = 'admin.list_wallets',
  RenameWallet = 'admin.rename_wallet',
  RemoveWallet = 'admin.remove_wallet',
  ListNetworks = 'admin.list_networks',
  DescribeNetwork = 'admin.describe_network',
  UpdateNetwork = 'admin.update_network',
  RemoveNetwork = 'admin.remove_network',
  ImportNetwork = 'admin.import_network',
  GenerateKey = 'admin.generate_key',
  DescribeKey = 'admin.describe_key',
  ListKeys = 'admin.list_keys',
  AnnotateKey = 'admin.annotate_key',
  IsolateKey = 'admin.isolate_key',
  RotateKey = 'admin.rotate_key',
  TaintKey = 'admin.taint_key',
  UntaintKey = 'admin.untaint_key',
  DescribePermissions = 'admin.describe_permissions',
  ListPermissions = 'admin.list_permissions',
  UpdatePermissions = 'admin.update_permissions',
  RevokePermissions = 'admin.revoke_permissions',
  PurgePermissions = 'admin.purge_permissions',
  SignTransaction = 'admin.sign_transaction',
  SignMessage = 'admin.sign_message',
  VerifyMessage = 'admin.verify_message',
  SendTransaction = 'admin.send_transaction',
  SendRawTransaction = 'admin.send_raw_transaction',
  StartService = 'admin.start_service',
  StopService = 'admin.stop_service',
  ListConnections = 'admin.list_connections',
  CloseConnection = 'admin.close_connection',
  CloseConnectionsToHostname = 'admin.close_connections_to_hostname',
  CloseConnectionsToWallet = 'admin.close_connections_to_wallet',
}

export type WalletAPIRequest =
  | { method: Identifier.CreateWallet; params: WalletModel.CreateWalletParams }
  | { method: Identifier.ImportWallet; params: WalletModel.ImportWalletParams }
  | {
      method: Identifier.UpdatePassphrase
      params: WalletModel.UpdatePassphraseParams
    }
  | {
      method: Identifier.DescribeWallet
      params: WalletModel.DescribeWalletParams
    }
  | { method: Identifier.ListWallets; params: WalletModel.ListWalletsParams }
  | { method: Identifier.RenameWallet; params: WalletModel.RenameWalletParams }
  | { method: Identifier.RemoveWallet; params: WalletModel.RemoveWalletParams }
  | { method: Identifier.ListNetworks; params: WalletModel.ListNetworksParams }
  | {
      method: Identifier.DescribeNetwork
      params: WalletModel.DescribeNetworkParams
    }
  | {
      method: Identifier.UpdateNetwork
      params: WalletModel.UpdateNetworkParams
    }
  | {
      method: Identifier.RemoveNetwork
      params: WalletModel.RemoveNetworkParams
    }
  | {
      method: Identifier.ImportNetwork
      params: WalletModel.ImportNetworkParams
    }
  | { method: Identifier.GenerateKey; params: WalletModel.GenerateKeyParams }
  | { method: Identifier.DescribeKey; params: WalletModel.DescribeKeyParams }
  | { method: Identifier.ListKeys; params: WalletModel.ListKeysParams }
  | { method: Identifier.AnnotateKey; params: WalletModel.AnnotateKeyParams }
  | { method: Identifier.IsolateKey; params: WalletModel.IsolateKeyParams }
  | { method: Identifier.RotateKey; params: WalletModel.RotateKeyParams }
  | { method: Identifier.TaintKey; params: WalletModel.TaintKeyParams }
  | { method: Identifier.UntaintKey; params: WalletModel.UntaintKeyParams }
  | {
      method: Identifier.DescribePermissions
      params: WalletModel.DescribePermissionsParams
    }
  | {
      method: Identifier.ListPermissions
      params: WalletModel.ListPermissionsParams
    }
  | {
      method: Identifier.UpdatePermissions
      params: WalletModel.UpdatePermissionsParams
    }
  | {
      method: Identifier.RevokePermissions
      params: WalletModel.RevokePermissionsParams
    }
  | {
      method: Identifier.PurgePermissions
      params: WalletModel.PurgePermissionsParams
    }
  | {
      method: Identifier.SignTransaction
      params: WalletModel.SignTransactionParams
    }
  | { method: Identifier.SignMessage; params: WalletModel.SignMessageParams }
  | {
      method: Identifier.VerifyMessage
      params: WalletModel.VerifyMessageParams
    }
  | {
      method: Identifier.SendTransaction
      params: WalletModel.SendTransactionParams
    }
  | {
      method: Identifier.SendRawTransaction
      params: WalletModel.SendRawTransactionParams
    }
  | { method: Identifier.StartService; params: WalletModel.StartServiceParams }
  | { method: Identifier.StopService; params: WalletModel.StopServiceParams }
  | {
      method: Identifier.ListConnections
      params: WalletModel.ListConnectionsParams
    }
  | {
      method: Identifier.CloseConnection
      params: WalletModel.CloseConnectionParams
    }
  | {
      method: Identifier.CloseConnectionsToHostname
      params: WalletModel.CloseConnectionsToHostnameParams
    }
  | {
      method: Identifier.CloseConnectionsToWallet
      params: WalletModel.CloseConnectionsToWalletParams
    }

export type WalletAPIResponse =
  | WalletModel.CreateWalletResult
  | WalletModel.ImportWalletResult
  | WalletModel.UpdatePassphraseResult
  | WalletModel.DescribeWalletResult
  | WalletModel.ListWalletsResult
  | WalletModel.RenameWalletResult
  | WalletModel.RemoveWalletResult
  | WalletModel.ListNetworksResult
  | WalletModel.DescribeNetworkResult
  | WalletModel.UpdateNetworkResult
  | WalletModel.RemoveNetworkResult
  | WalletModel.ImportNetworkResult
  | WalletModel.GenerateKeyResult
  | WalletModel.DescribeKeyResult
  | WalletModel.ListKeysResult
  | WalletModel.AnnotateKeyResult
  | WalletModel.IsolateKeyResult
  | WalletModel.RotateKeyResult
  | WalletModel.TaintKeyResult
  | WalletModel.UntaintKeyResult
  | WalletModel.DescribePermissionsResult
  | WalletModel.ListPermissionsResult
  | WalletModel.UpdatePermissionsResult
  | WalletModel.RevokePermissionsResult
  | WalletModel.PurgePermissionsResult
  | WalletModel.SignTransactionResult
  | WalletModel.SignMessageResult
  | WalletModel.VerifyMessageResult
  | WalletModel.SendTransactionResult
  | WalletModel.SendRawTransactionResult
  | WalletModel.StartServiceResult
  | WalletModel.StopServiceResult
  | WalletModel.ListConnectionsResult
  | WalletModel.CloseConnectionResult
  | WalletModel.CloseConnectionsToHostnameResult
  | WalletModel.CloseConnectionsToWalletResult

export type WalletAPIHandler = ((req: {
  method: Identifier.CreateWallet
  params: WalletModel.CreateWalletParams
}) => Promise<WalletModel.CreateWalletResult>) &
  ((req: {
    method: Identifier.ImportWallet
    params: WalletModel.ImportWalletParams
  }) => Promise<WalletModel.ImportWalletResult>) &
  ((req: {
    method: Identifier.UpdatePassphrase
    params: WalletModel.UpdatePassphraseParams
  }) => Promise<WalletModel.UpdatePassphraseResult>) &
  ((req: {
    method: Identifier.DescribeWallet
    params: WalletModel.DescribeWalletParams
  }) => Promise<WalletModel.DescribeWalletResult>) &
  ((req: {
    method: Identifier.ListWallets
    params: WalletModel.ListWalletsParams
  }) => Promise<WalletModel.ListWalletsResult>) &
  ((req: {
    method: Identifier.RenameWallet
    params: WalletModel.RenameWalletParams
  }) => Promise<WalletModel.RenameWalletResult>) &
  ((req: {
    method: Identifier.RemoveWallet
    params: WalletModel.RemoveWalletParams
  }) => Promise<WalletModel.RemoveWalletResult>) &
  ((req: {
    method: Identifier.ListNetworks
    params: WalletModel.ListNetworksParams
  }) => Promise<WalletModel.ListNetworksResult>) &
  ((req: {
    method: Identifier.DescribeNetwork
    params: WalletModel.DescribeNetworkParams
  }) => Promise<WalletModel.DescribeNetworkResult>) &
  ((req: {
    method: Identifier.UpdateNetwork
    params: WalletModel.UpdateNetworkParams
  }) => Promise<WalletModel.UpdateNetworkResult>) &
  ((req: {
    method: Identifier.RemoveNetwork
    params: WalletModel.RemoveNetworkParams
  }) => Promise<WalletModel.RemoveNetworkResult>) &
  ((req: {
    method: Identifier.ImportNetwork
    params: WalletModel.ImportNetworkParams
  }) => Promise<WalletModel.ImportNetworkResult>) &
  ((req: {
    method: Identifier.GenerateKey
    params: WalletModel.GenerateKeyParams
  }) => Promise<WalletModel.GenerateKeyResult>) &
  ((req: {
    method: Identifier.DescribeKey
    params: WalletModel.DescribeKeyParams
  }) => Promise<WalletModel.DescribeKeyResult>) &
  ((req: {
    method: Identifier.ListKeys
    params: WalletModel.ListKeysParams
  }) => Promise<WalletModel.ListKeysResult>) &
  ((req: {
    method: Identifier.AnnotateKey
    params: WalletModel.AnnotateKeyParams
  }) => Promise<WalletModel.AnnotateKeyResult>) &
  ((req: {
    method: Identifier.IsolateKey
    params: WalletModel.IsolateKeyParams
  }) => Promise<WalletModel.IsolateKeyResult>) &
  ((req: {
    method: Identifier.RotateKey
    params: WalletModel.RotateKeyParams
  }) => Promise<WalletModel.RotateKeyResult>) &
  ((req: {
    method: Identifier.TaintKey
    params: WalletModel.TaintKeyParams
  }) => Promise<WalletModel.TaintKeyResult>) &
  ((req: {
    method: Identifier.UntaintKey
    params: WalletModel.UntaintKeyParams
  }) => Promise<WalletModel.UntaintKeyResult>) &
  ((req: {
    method: Identifier.DescribePermissions
    params: WalletModel.DescribePermissionsParams
  }) => Promise<WalletModel.DescribePermissionsResult>) &
  ((req: {
    method: Identifier.ListPermissions
    params: WalletModel.ListPermissionsParams
  }) => Promise<WalletModel.ListPermissionsResult>) &
  ((req: {
    method: Identifier.UpdatePermissions
    params: WalletModel.UpdatePermissionsParams
  }) => Promise<WalletModel.UpdatePermissionsResult>) &
  ((req: {
    method: Identifier.RevokePermissions
    params: WalletModel.RevokePermissionsParams
  }) => Promise<WalletModel.RevokePermissionsResult>) &
  ((req: {
    method: Identifier.PurgePermissions
    params: WalletModel.PurgePermissionsParams
  }) => Promise<WalletModel.PurgePermissionsResult>) &
  ((req: {
    method: Identifier.SignTransaction
    params: WalletModel.SignTransactionParams
  }) => Promise<WalletModel.SignTransactionResult>) &
  ((req: {
    method: Identifier.SignMessage
    params: WalletModel.SignMessageParams
  }) => Promise<WalletModel.SignMessageResult>) &
  ((req: {
    method: Identifier.VerifyMessage
    params: WalletModel.VerifyMessageParams
  }) => Promise<WalletModel.VerifyMessageResult>) &
  ((req: {
    method: Identifier.SendTransaction
    params: WalletModel.SendTransactionParams
  }) => Promise<WalletModel.SendTransactionResult>) &
  ((req: {
    method: Identifier.SendRawTransaction
    params: WalletModel.SendRawTransactionParams
  }) => Promise<WalletModel.SendRawTransactionResult>) &
  ((req: {
    method: Identifier.StartService
    params: WalletModel.StartServiceParams
  }) => Promise<WalletModel.StartServiceResult>) &
  ((req: {
    method: Identifier.StopService
    params: WalletModel.StopServiceParams
  }) => Promise<WalletModel.StopServiceResult>) &
  ((req: {
    method: Identifier.ListConnections
    params: WalletModel.ListConnectionsParams
  }) => Promise<WalletModel.ListConnectionsResult>) &
  ((req: {
    method: Identifier.CloseConnection
    params: WalletModel.CloseConnectionParams
  }) => Promise<WalletModel.CloseConnectionResult>) &
  ((req: {
    method: Identifier.CloseConnectionsToHostname
    params: WalletModel.CloseConnectionsToHostnameParams
  }) => Promise<WalletModel.CloseConnectionsToHostnameResult>) &
  ((req: {
    method: Identifier.CloseConnectionsToWallet
    params: WalletModel.CloseConnectionsToWalletParams
  }) => Promise<WalletModel.CloseConnectionsToWalletResult>)
