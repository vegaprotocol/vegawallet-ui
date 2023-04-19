import { createContext, useContext } from 'react'
import type { ThunkDispatch } from 'react-hook-thunk-reducer'
import type { WalletAdmin, WalletModel } from '@vegaprotocol/wallet-admin'

import type { Transaction } from '../../lib/transactions'
import type {
  Service,
  GetVersionResponse,
  AppConfig,
  ServiceConfig,
} from '../../types/service'
import type { Runtime } from '../../types/runtime'
import type { Features } from '../../types/features'
import type { GlobalActions } from './global-actions'
import type { GlobalAction } from './global-reducer'

export enum AppStatus {
  Pending = 'Pending',
  Initialised = 'Initialised',
  Failed = 'Failed',
  Onboarding = 'Onboarding',
  Interacting = 'Interacting',
}

export enum ServiceState {
  Started = 'Started',
  Stopped = 'Stopped',
  Loading = 'Loading',
  Stopping = 'Stopping',
  Unhealthy = 'Unhealthy',
  Unreachable = 'Unreachable',
  Error = 'Error',
}

export enum DrawerPanel {
  Network,
  Manage,
  Edit,
  Add,
  View,
}

export type DrawerState = {
  isOpen: boolean
  panel: DrawerPanel | null
  selectedNetwork: string | null
}

export const enum PermissionTarget {
  PUBLIC_KEYS = 'public_keys',
}

export const enum PermissionType {
  READ = 'read',
}

export type Connection = {
  hostname: string
  active: boolean
  permissions: WalletModel.Permissions
}

export interface KeyPair
  extends Pick<WalletModel.DescribeKeyResult, 'publicKey' | 'isTainted'> {
  name: string
  publicKeyShort: string
  meta: WalletModel.DescribeKeyResult['metadata']
}

export interface Wallet {
  name: string
  keypairs: Record<string, KeyPair>
  connections?: Record<string, Connection>
  auth: boolean
}

export interface GlobalState {
  status: AppStatus
  initError: string | null
  version: GetVersionResponse | null
  config: AppConfig | null
  serviceConfig: ServiceConfig | null

  // Wallet
  wallet: string | null
  wallets: Record<string, Wallet>
  transactions: Record<string, Transaction>

  // Network
  currentNetwork: string | null
  networks: Record<string, WalletModel.DescribeNetworkResult>
  initNetworks?: string[]

  // Service
  serviceStatus: ServiceState
  httpServiceUrl: null | string

  // UI
  drawerState: DrawerState
  isNetworkCompatible: boolean

  // Modals
  isPassphraseModalOpen: boolean
  isSignMessageModalOpen: boolean
  isTaintKeyModalOpen: boolean
  isUpdateKeyModalOpen: boolean
  isNetworkCompatibilityModalOpen: boolean
  showTransactionDetails: null | string
}

export type GlobalDispatch = ThunkDispatch<GlobalState, GlobalAction>

type GlobalContextShape = {
  state: GlobalState
  actions: GlobalActions
  dispatch: GlobalDispatch
  service: Service
  runtime: Runtime
  features: Features
  client: WalletAdmin
}

export const GlobalContext = createContext<GlobalContextShape | undefined>(
  undefined
)

export function useGlobal() {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobal must be used within GlobalProvider')
  }
  return context
}
