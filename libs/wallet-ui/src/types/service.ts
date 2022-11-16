import type { EVENTS } from '../lib/events'
import type { RawInteraction, InteractionResponse } from './interaction'
import type { Logger } from './logger'

export type GetCurrentServiceInfoResponse = {
  url: string
  logFilePath: string
  isRunning: boolean
  latestHealthState: string
}
export type NetworkCompatibility = {
  network: string
  isCompatible: boolean
  retrievedVersion: string
  error?: string
}
export type BackendVersionResponse = {
  version: string
  gitHash: string
  networksCompatibility: NetworkCompatibility[]
}
export type GetVersionResponse = {
  version: string
  gitHash: string
  backend?: BackendVersionResponse
}
export type InitialiseAppArg = {
  vegaHome: string
}
export type LatestRelease = {
  version: string
  url: string
}
export type SearchForExistingConfigurationResponse = {
  wallets: string[]
  networks: string[]
}
export type StartServiceArg = {
  network: string
}
export type TelemetryConfig = {
  consentAsked: boolean
  enabled: boolean
}
export type AppConfig = {
  logLevel: string
  vegaHome: string
  defaultNetwork: string
  telemetry: TelemetryConfig
}

type Empty = undefined | Error

type EventsCallbackArgs =
  | [EVENTS.NEW_INTERACTION_EVENT, (interaction: RawInteraction) => void]
  | [EVENTS.SERVICE_HEALTHY, () => void]
  | [EVENTS.SERVICE_UNREACHABLE, () => void]
  | [EVENTS.SERVICE_UNHEALTHY, () => void]
  | [EVENTS.SERVICE_STOPPED_WITH_ERROR, (err: Error) => void]
  | [EVENTS.SERVICE_STOPPED, () => void]

type EventsCallback = (...args: EventsCallbackArgs) => void

export type Service = {
  // Version
  GetLatestRelease: () => Promise<LatestRelease>
  GetVersion: () => Promise<GetVersionResponse>

  // Config
  GetAppConfig: () => Promise<AppConfig>
  SearchForExistingConfiguration: () => Promise<SearchForExistingConfigurationResponse>
  UpdateAppConfig: (arg: AppConfig) => Promise<Empty>

  // Initialization
  InitialiseApp: (arg: InitialiseAppArg) => Promise<Empty>
  IsAppInitialised: () => Promise<boolean>

  // Telemetry
  EnableTelemetry: () => Promise<Empty>

  // Logging
  GetLogger: (namespace?: string) => Logger

  // Service
  StartService: (arg: StartServiceArg) => Promise<Empty>
  StopService: () => Promise<Empty>
  GetCurrentServiceInfo: () => Promise<GetCurrentServiceInfoResponse>

  // API
  EventsOn: EventsCallback
  EventsOff: (...name: EVENTS[]) => void
  RespondToInteraction: (arg: InteractionResponse) => Promise<Empty>
}
