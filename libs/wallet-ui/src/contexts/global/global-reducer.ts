import { omit } from 'ramda'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { indexBy } from '../../lib/index-by'
import type { Transaction } from '../../lib/transactions'
import { extendKeypair } from '../../lib/wallet-helpers'
import type { AppConfig, GetVersionResponse } from '../../types/service'

import type {
  Connection,
  DrawerState,
  GlobalState,
  KeyPair,
  Wallet,
} from './global-context'
import { AppStatus, DrawerPanel, ServiceState } from './global-context'

export const initialGlobalState: GlobalState = {
  status: AppStatus.Pending,
  initError: null,
  version: null,
  config: null,

  // Wallet
  wallet: null,
  wallets: {},

  // Network
  currentNetwork: null,
  networks: {},

  // Service
  serviceStatus: ServiceState.Stopped,
  httpServiceUrl: null,

  // UI
  drawerState: {
    isOpen: false,
    panel: DrawerPanel.Network,
    selectedNetwork: null,
  },
  isPassphraseModalOpen: false,
  isSignMessageModalOpen: false,
  isTaintKeyModalOpen: false,
  isUpdateKeyModalOpen: false,
  isSettingsModalOpen: false,
}

export type GlobalAction =
  | {
      type: 'INIT_APP'
      config: AppConfig
      wallets: string[]
      currentNetwork: string | null
      networks: Record<string, WalletModel.DescribeNetworkResult>
    }
  | {
      type: 'INIT_APP_FAILED'
      message?: string
    }
  | {
      type: 'COMPLETE_ONBOARD'
    }
  | {
      type: 'SET_VERSION'
      version: GetVersionResponse | null
    }
  | {
      type: 'SET_CONFIG'
      config: AppConfig
    }
  | {
      type: 'START_ONBOARDING'
      existing: {
        wallets: string[]
        networks: string[]
      }
    }
  // Wallet
  | {
      type: 'ADD_WALLET'
      wallet: string
      key: WalletModel.DescribeKeyResult
    }
  | {
      type: 'UPDATE_WALLET'
      wallet: string
      data: Wallet
    }
  | {
      type: 'ADD_WALLETS'
      wallets: string[]
    }
  | {
      type: 'REMOVE_WALLET'
      wallet: string
    }
  | {
      type: 'SET_KEYPAIRS'
      wallet: string
      keypairs: WalletModel.DescribeKeyResult[]
    }
  | {
      type: 'UPDATE_KEYPAIR'
      wallet: string
      keypair: WalletModel.DescribeKeyResult
    }
  | {
      type: 'ADD_KEYPAIR'
      wallet: string
      keypair: WalletModel.DescribeKeyResult
    }
  | {
      type: 'SET_CONNECTIONS'
      wallet: string
      connections: Connection[]
    }
  | {
      type: 'SET_PERMISSONS'
      wallet: string
      hostname: string
      permissions: WalletModel.Permissions
    }
  | {
      type: 'CHANGE_WALLET'
      wallet: string
    }
  | {
      type: 'ACTIVATE_WALLET'
      wallet: string
    }
  | {
      type: 'DEACTIVATE_WALLET'
      wallet: string
    }
  | {
      type: 'RENAME_WALLET'
      from: string
      to: string
    }
  // UI
  | {
      type: 'SET_DRAWER'
      state: DrawerState
    }
  | {
      type: 'SET_PASSPHRASE_MODAL'
      open: boolean
    }
  | {
      type: 'SET_SETTINGS_MODAL'
      open: boolean
    }
  | {
      type: 'SET_TAINT_KEY_MODAL'
      open: boolean
    }
  | {
      type: 'SET_SIGN_MESSAGE_MODAL'
      open: boolean
    }
  | {
      type: 'SET_UPDATE_KEY_MODAL'
      open: boolean
    }
  // Network
  | {
      type: 'SET_NETWORKS'
      networks: Record<string, WalletModel.DescribeNetworkResult>
    }
  | {
      type: 'CHANGE_NETWORK'
      network: string
    }
  | {
      type: 'UPDATE_NETWORK_CONFIG'
      config: WalletModel.DescribeNetworkResult
    }
  | {
      type: 'ADD_NETWORK'
      config: WalletModel.DescribeNetworkResult
    }
  | {
      type: 'ADD_NETWORKS'
      networks: Record<string, WalletModel.DescribeNetworkResult>
    }
  | {
      type: 'REMOVE_NETWORK'
      network: string
    }
  // Service
  | {
      type: 'SET_SERVICE_STATUS'
      status: ServiceState
    }
  | {
      type: 'SET_SERVICE_URL'
      url: string
    }
  | {
      type: 'ADD_TRANSACTION'
      transaction: Transaction
    }
  | {
      type: 'UPDATE_TRANSACTION'
      transaction: Transaction
    }
  // Connections
  | {
      type: 'ADD_CONNECTION'
      connection: Connection
      wallet: string
    }

export function globalReducer(
  state: GlobalState,
  action: GlobalAction
): GlobalState {
  switch (action.type) {
    case 'INIT_APP': {
      return {
        ...state,
        initError: null,
        config: action.config,
        wallets: action.wallets.reduce(
          (acc, name) => ({
            ...acc,
            [name]: {
              name,
              keypairs: null,
              auth: false,
            },
          }),
          {}
        ),
        currentNetwork: action.currentNetwork,
        networks: action.networks,
        status: AppStatus.Initialised,
      }
    }
    case 'INIT_APP_FAILED': {
      return {
        ...state,
        status: AppStatus.Failed,
        initError: action.message ?? null,
      }
    }
    case 'COMPLETE_ONBOARD': {
      return {
        ...state,
        status: AppStatus.Initialised,
      }
    }
    case 'SET_VERSION': {
      return {
        ...state,
        version: action.version,
      }
    }
    case 'SET_CONFIG': {
      return {
        ...state,
        config: action.config,
      }
    }
    case 'START_ONBOARDING': {
      return {
        ...state,
        status: AppStatus.Onboarding,
        initNetworks: action.existing.networks,
        wallets: action.existing.wallets.reduce(
          (acc, w) => ({
            ...acc,
            [w]: {
              name: w,
              auth: false,
            },
          }),
          {}
        ),
      }
    }
    case 'ADD_WALLET': {
      const keypairExtended: KeyPair = extendKeypair(action.key)
      const newWallet: Wallet = {
        name: action.wallet,
        connections: {},
        keypairs: {
          ...(keypairExtended.publicKey && {
            [keypairExtended.publicKey ?? '']: keypairExtended,
          }),
        },
        auth: false,
      }
      return {
        ...state,
        wallet: newWallet.name,
        wallets: {
          ...state.wallets,
          [newWallet.name]: newWallet,
        },
      }
    }
    case 'ADD_WALLETS': {
      const newWallets = action.wallets.reduce(
        (acc, name) => ({
          ...acc,
          [name]: {
            name,
            keypairs: null,
            auth: false,
          },
        }),
        {}
      )
      return {
        ...state,
        wallets: {
          ...state.wallets,
          ...newWallets,
        },
      }
    }
    case 'REMOVE_WALLET': {
      return {
        ...state,
        wallet: null,
        wallets: omit([action.wallet], state.wallets),
      }
    }
    case 'SET_KEYPAIRS': {
      if (!state.wallets[action.wallet]) {
        throw new Error('Wallet not found')
      }

      const keypairsExtended: KeyPair[] = action.keypairs.map(extendKeypair)
      const newWallet: Wallet = {
        ...state.wallets[action.wallet],
        name: action.wallet,
        keypairs: keypairsExtended.reduce(indexBy('publicKey'), {}),
        auth: true,
      }

      return {
        ...state,
        wallets: {
          ...state.wallets,
          [action.wallet]: newWallet,
        },
      }
    }
    case 'ADD_KEYPAIR':
    case 'UPDATE_KEYPAIR': {
      if (!state.wallets[action.wallet]) {
        throw new Error('Wallet not found')
      }
      const currentWallet = state.wallets[action.wallet]

      const newKeypair = extendKeypair(action.keypair)
      const updatedWallet: Wallet = {
        ...currentWallet,
        keypairs: {
          ...currentWallet.keypairs,
          ...(newKeypair.publicKey && {
            [newKeypair.publicKey ?? '']: newKeypair,
          }),
        },
      }

      return {
        ...state,
        wallets: {
          ...state.wallets,
          [action.wallet]: updatedWallet,
        },
      }
    }
    case 'SET_CONNECTIONS': {
      if (!state.wallets[action.wallet]) {
        throw new Error('Wallet not found')
      }
      const targetWallet = state.wallets[action.wallet]

      const updatedWallet: Wallet = {
        ...targetWallet,
        connections: action.connections.reduce(
          indexBy<Connection>('hostname'),
          {}
        ),
      }

      return {
        ...state,
        wallets: {
          ...state.wallets,
          [action.wallet]: updatedWallet,
        },
      }
    }
    case 'SET_PERMISSONS': {
      if (!state.wallets[action.wallet]) {
        throw new Error('Wallet not found')
      }
      const targetWallet = state.wallets[action.wallet]

      if (!targetWallet.connections?.[action.hostname]) {
        throw new Error('Connection not found')
      }

      const targetConnection = targetWallet.connections[action.hostname]

      const updatedWallet: Wallet = {
        ...targetWallet,
        connections: {
          ...targetWallet.connections,
          [action.hostname]: {
            ...targetConnection,
            permissions: action.permissions,
          },
        },
      }

      return {
        ...state,
        wallets: {
          ...state.wallets,
          [action.wallet]: updatedWallet,
        },
      }
    }
    case 'ACTIVATE_WALLET': {
      if (!state.wallets[action.wallet]) {
        throw new Error('Wallet not found')
      }

      return {
        ...state,
        wallet: action.wallet,
        wallets: {
          ...state.wallets,
          [action.wallet]: {
            ...state.wallets[action.wallet],
            auth: true,
          },
        },
      }
    }
    case 'DEACTIVATE_WALLET': {
      return {
        ...state,
        wallet: null,
      }
    }
    case 'RENAME_WALLET': {
      if (!state.wallets[action.from]) {
        throw new Error('Wallet not found')
      }

      return {
        ...state,
        wallets: {
          ...omit([action.from], state.wallets),
          [action.to]: {
            ...state.wallets[action.from],
            name: action.to,
          },
        },
      }
    }
    case 'CHANGE_WALLET': {
      if (!state.wallets[action.wallet]) {
        throw new Error('Wallet not found')
      }

      return {
        ...state,
        wallet: action.wallet,
      }
    }
    case 'SET_DRAWER': {
      return {
        ...state,
        drawerState: action.state,
      }
    }
    case 'SET_PASSPHRASE_MODAL': {
      return {
        ...state,
        isPassphraseModalOpen: action.open,
      }
    }
    case 'SET_SETTINGS_MODAL': {
      return {
        ...state,
        isSettingsModalOpen: action.open,
      }
    }
    case 'SET_TAINT_KEY_MODAL': {
      return {
        ...state,
        isTaintKeyModalOpen: action.open,
      }
    }
    case 'SET_SIGN_MESSAGE_MODAL': {
      return {
        ...state,
        isSignMessageModalOpen: action.open,
      }
    }
    case 'SET_UPDATE_KEY_MODAL': {
      return {
        ...state,
        isUpdateKeyModalOpen: action.open,
      }
    }
    // network
    case 'SET_NETWORKS': {
      return {
        ...state,
        networks: action.networks,
      }
    }
    case 'CHANGE_NETWORK': {
      return {
        ...state,
        currentNetwork: action.network,
      }
    }
    case 'ADD_NETWORK':
    case 'UPDATE_NETWORK_CONFIG': {
      return {
        ...state,
        networks: {
          ...state.networks,
          [action.config.name]: action.config,
        },
      }
    }
    case 'ADD_NETWORKS': {
      const newNetworks = action.networks
      return {
        ...state,
        networks: { ...state.networks, ...action.networks },
      }
    }
    case 'REMOVE_NETWORK': {
      return {
        ...state,
        currentNetwork:
          action.network === state.currentNetwork ? null : state.currentNetwork,
        networks: omit([action.network], state.networks),
      }
    }
    case 'SET_SERVICE_STATUS': {
      return {
        ...state,
        serviceStatus: action.status,
      }
    }
    case 'SET_SERVICE_URL': {
      return {
        ...state,
        httpServiceUrl: action.url,
      }
    }
    case 'ADD_TRANSACTION':
    case 'UPDATE_TRANSACTION': {
      const targetWallet = state.wallets[action.transaction.wallet]

      if (!targetWallet) {
        throw new Error('Wallet not found')
      }

      const keypair = targetWallet.keypairs?.[action.transaction.publicKey]

      if (!keypair) {
        throw new Error('Public key not found')
      }

      const updatedWallet: Wallet = {
        ...targetWallet,
        keypairs: {
          ...targetWallet.keypairs,
          [action.transaction.publicKey]: {
            ...keypair,
            transactions: {
              ...keypair.transactions,
              [action.transaction.id]: action.transaction,
            },
          },
        },
      }

      return {
        ...state,
        wallets: {
          ...state.wallets,
          [action.transaction.wallet]: updatedWallet,
        },
      }
    }
    case 'ADD_CONNECTION': {
      const targetWallet = state.wallets[action.wallet]

      if (!targetWallet) {
        throw new Error('Wallet not found')
      }

      const updatedWallet: Wallet = {
        ...targetWallet,
        auth: true,
        connections: {
          ...targetWallet.connections,
          [action.connection.hostname]: action.connection,
        },
      }

      return {
        ...state,
        wallets: {
          ...state.wallets,
          [action.wallet]: updatedWallet,
        },
      }
    }
    default: {
      return state
    }
  }
}
