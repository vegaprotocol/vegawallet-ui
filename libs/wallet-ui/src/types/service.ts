import type { EVENTS } from '../lib/events'
import type { RawInteraction, InteractionResponse } from './interaction'
import type { Logger } from './logger'

export type GetHTTPServiceInfoResponse = {
  url: string
  logFilePath: string
  isRunning: boolean
  latestHealthState: string
}
export type GetBrowserServiceInfoResponse = {
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
}
export type GetVersionResponse = {
  version: string
  gitHash: string
  backend?: BackendVersionResponse
  networksCompatibility?: NetworkCompatibility[]
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

type Empty = void | undefined | Error

export type EventType =
  | 'new_interaction'
  // Sent when the service is healthy.
  // This event can be emitted every 15 seconds.
  | 'service_is_healthy'
  // Sent when no service is running anymore.
  // This event can be emitted every 15 seconds.
  | 'service_unreachable'
  // Sent when the service is unhealthy, meaning we could connect but the endpoint
  // didn't answer what we expected. More in the application logs.
  // This event can be emitted every 15 seconds.
  | 'service_is_unhealthy'
  // Sent when the service unexpectedly stopped, internal crash.
  // This event is emitted once per service lifecycle.
  // If emitted, the `ServiceStopped` is not be emitted.
  | 'service_stopped_with_error'
  // Sent when the service has been stopped by the user.
  // This event is emitted once per service lifecycle.
  // If emitted, the `ServiceStoppedWithError` is not be emitted.
  | 'service_stopped'

type EventsCallbackArgs =
  | ['new_interaction', (interaction: RawInteraction) => void]
  | ['service_is_healthy', () => void]
  | ['service_unreachable', () => void]
  | ['service_is_unhealthy', () => void]
  | ['service_stopped_with_error', (err: Error) => void]
  | ['service_stopped', () => void]

type EventsCallback = (...args: EventsCallbackArgs) => void

export type Service = {
  TYPE: 'http' | 'browser'

  // Version
  GetLatestRelease: () => Promise<LatestRelease>
  GetVersion: () => Promise<GetVersionResponse>

  // Config
  GetAppConfig: () => Promise<AppConfig>
  SearchForExistingConfiguration: () => Promise<SearchForExistingConfigurationResponse>
  UpdateAppConfig: (arg: AppConfig) => Promise<Empty>

  // Initialization
  StartupBackend: () => Promise<Empty>
  InitialiseApp: (arg: InitialiseAppArg) => Promise<Empty>
  IsAppInitialised: () => Promise<boolean>

  // Telemetry
  EnableTelemetry: () => Promise<Empty>

  // Logging
  GetLogger: (namespace?: string) => Logger

  // Service
  StartService: (arg: StartServiceArg) => Promise<Empty>
  StopService: () => Promise<Empty>
  GetCurrentServiceInfo: () => Promise<
    GetHTTPServiceInfoResponse | GetBrowserServiceInfoResponse
  >

  // API
  EventsOn: EventsCallback
  EventsOff: (...name: EventType[]) => void
  RespondToInteraction: (arg: InteractionResponse) => Promise<Empty>
}
