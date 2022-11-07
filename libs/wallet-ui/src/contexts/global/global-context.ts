import React from 'react'
import type { Thunk } from 'react-hook-thunk-reducer'
import type { WalletClient, WalletModel } from '@vegaprotocol/wallet-client'

import type { NetworkPreset } from '../../lib/networks'
import type { Transaction } from '../../lib/transactions'
import type {
  Service,
  GetVersionResponse,
  AppConfig,
} from '../../types/service'
import type { Runtime } from '../../types/runtime'
import type { GlobalActions } from './global-actions'
import type { GlobalAction } from './global-reducer'

export enum AppStatus {
  Pending = 'Pending',
  Initialised = 'Initialised',
  Failed = 'Failed',
  Onboarding = 'Onboarding',
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
}

export type DrawerState = {
  isOpen: boolean
  panel: DrawerPanel | null
  editingNetwork: string | null
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
  transactions: Record<string, Transaction>
}

export interface Wallet {
  name: string
  keypairs: Record<string, KeyPair>
  connections?: Record<string, Connection>
  auth: boolean
}

export interface GlobalState {
  status: AppStatus
  version: GetVersionResponse | null
  config: AppConfig | null

  // Wallet
  wallet: string | null
  wallets: Record<string, Wallet>

  // Network
  network: string | null
  networks: string[]
  presets: NetworkPreset[]
  presetsInternal: NetworkPreset[]
  networkConfig: WalletModel.DescribeNetworkResult | null
  serviceStatus: ServiceState

  // UI
  drawerState: DrawerState
  isPassphraseModalOpen: boolean
  isRemoveWalletModalOpen: boolean
  isSignMessageModalOpen: boolean
  isTaintKeyModalOpen: boolean
  isUpdateKeyModalOpen: boolean
  isSettingsModalOpen: boolean
}

export type GlobalDispatch = React.Dispatch<
  GlobalAction | Thunk<GlobalState, GlobalAction>
>

type GlobalContextShape = {
  state: GlobalState
  actions: GlobalActions
  dispatch: GlobalDispatch
  service: Service
  runtime: Runtime
  client: WalletClient
}

export const GlobalContext = React.createContext<
  GlobalContextShape | undefined
>(undefined)

export function useGlobal() {
  const context = React.useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobal must be used within GlobalProvider')
  }
  return context
}
