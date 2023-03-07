import log from 'loglevel'
import storageMock from './storage-mock'
import type { Service } from '../types/service'
import type { RawInteraction } from '../types'

const logger = log.getLogger('test')

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

type CallbackFunctionTypes =
  | (() => void)
  | ((interaction: RawInteraction) => void)
  | ((err: Error) => void)

export const service: Service = {
  TYPE: 'http',

  StartupBackend: () => Promise.resolve(undefined),

  GetLatestRelease: () =>
    Promise.resolve({
      version: '0.99.0',
      url: 'https://github.com/vegaprotocol/vegawallet-ui',
    }),
  GetVersion: () =>
    Promise.resolve(
      storageMock('service.GetVersion', {
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
      storageMock('service.GetAppConfig', {
        logLevel: 'debug',
        vegaHome: '',
        defaultNetwork: 'test',
        telemetry: {
          consentAsked: true,
          enabled: true,
        },
      })
    ),
  SearchForExistingConfiguration: () =>
    Promise.resolve({
      wallets: [],
      networks: ['test'],
    }),
  UpdateAppConfig: () => Promise.resolve(undefined),

  // Initialization
  InitialiseApp: () => Promise.resolve(undefined),
  IsAppInitialised: () => Promise.resolve(true),

  // Telemetry
  EnableTelemetry: () => Promise.resolve(undefined),

  // Logging
  GetLogger: () => logger,

  // Service
  StartService: () => Promise.resolve(undefined),
  StopService: () => Promise.resolve(undefined),
  GetCurrentServiceInfo: () =>
    Promise.resolve({
      url: 'http://localhost:1789',
      logFilePath: './',
      isRunning: true,
      latestHealthState: 'HEALTHY',
    }),

  // API
  EventsOn: (event: string, cb: CallbackFunctionTypes) => {
    window.document.body.addEventListener(event, (e) => {
      const detail = e && (e as CustomEvent).detail
      cb(detail)
    })
  },
  EventsOff: noop,
  RespondToInteraction: () => Promise.resolve(undefined),
}
