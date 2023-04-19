import log from 'loglevel'
import storageMock from '../../../../scripts/storage-mock'
import type { Service, ServiceConfig } from '../types/service'
import type { RawInteraction } from '../types'

const logger = log.getLogger('test')

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

type CallbackFunctionTypes =
  | (() => void)
  | ((interaction: RawInteraction) => void)
  | ((err: Error) => void)

export enum ServiceMock {
  EnableTelemetry = 'service.EnableTelemetry',
  EventsOff = 'service.EventsOff',
  EventsOn = 'service.EventsOn',
  GetAppConfig = 'service.GetAppConfig',
  GetCurrentServiceInfo = 'service.GetCurrentServiceInfo',
  GetLatestRelease = 'service.GetLatestRelease',
  GetLogger = 'service.GetLogger',
  GetVersion = 'service.GetVersion',
  InitialiseApp = 'service.InitialiseApp',
  IsAppInitialised = 'service.IsAppInitialised',
  RespondToInteraction = 'service.RespondToInteraction',
  SearchForExistingConfiguration = 'service.SearchForExistingConfiguration',
  StartService = 'service.StartService',
  StartupBackend = 'service.StartupBackend',
  StopService = 'service.StopService',
  UpdateAppConfig = 'service.UpdateAppConfig',
}

export const service: Service = {
  TYPE: 'http',

  StartupBackend: () => Promise.resolve(undefined),

  GetLatestRelease: () =>
    Promise.resolve(
      storageMock(ServiceMock.GetLatestRelease, {
        version: '0.99.0',
        url: 'https://github.com/vegaprotocol/vegawallet-ui',
      })
    ),
  GetVersion: () =>
    Promise.resolve(
      storageMock(ServiceMock.GetVersion, {
        version: '0.98.0',
        gitHash: '0x0',
        networksCompatibility: [
          {
            network: 'test',
            isCompatible: false,
            retrievedVersion: '1.0.0',
          },
        ],
        backend: {
          version: '2.0.1',
          gitHash: '0x0',
        },
      })
    ),

  // Config
  GetAppConfig: () =>
    Promise.resolve(
      storageMock(ServiceMock.GetAppConfig, {
        logLevel: 'debug',
        vegaHome: '/some/vega/home',
        defaultNetwork: 'test',
        telemetry: {
          consentAsked: true,
          enabled: false,
        },
      })
    ),
  SearchForExistingConfiguration: () =>
    Promise.resolve(
      storageMock(ServiceMock.SearchForExistingConfiguration, {
        wallets: [],
        networks: ['test'],
      })
    ),
  UpdateAppConfig: () => Promise.resolve(undefined),

  // Initialization
  InitialiseApp: () => Promise.resolve(undefined),
  IsAppInitialised: () =>
    Promise.resolve(storageMock(ServiceMock.IsAppInitialised, true)),

  // Telemetry
  EnableTelemetry: () => Promise.resolve(undefined),

  // Logging
  GetLogger: () => storageMock(ServiceMock.GetLogger, logger),

  // Service
  StartService: () => Promise.resolve(undefined),
  StopService: () => Promise.resolve(undefined),
  GetCurrentServiceInfo: () =>
    Promise.resolve(
      storageMock(ServiceMock.GetCurrentServiceInfo, {
        url: 'http://localhost:1789',
        logFilePath: './',
        isRunning: true,
        latestHealthState: 'HEALTHY',
      })
    ),
  SuggestFairgroundFolder: () => Promise.resolve('~/fairground/or/something'),

  // API
  EventsOn: (event: string, cb: CallbackFunctionTypes) => {
    window.document.body.addEventListener(event, (e) => {
      const detail = e && (e as CustomEvent).detail
      cb(detail)
    })
  },
  EventsOff: noop,
  RespondToInteraction: () => Promise.resolve(undefined),
  GetServiceConfig: function (): Promise<ServiceConfig> {
    return Promise.resolve({
      logLevel: 'debug',
      server: {
        host: 'localhost',
        port: 1789,
      },
      apiV1: {
        maximumTokenDuration: 3600,
      },
    })
  },
  UpdateServiceConfig: function (
    arg: ServiceConfig
  ): Promise<void | Error | undefined> {
    return Promise.resolve(undefined)
  },
}
