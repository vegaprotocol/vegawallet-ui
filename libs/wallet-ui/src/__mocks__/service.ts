import log from 'loglevel'
import type { Service } from '../types/service'

const logger = log.getLogger('test')

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export const service: Service = {
  GetLatestRelease: () =>
    Promise.resolve({
      version: '0.99.0',
      url: 'https://github.com/vegaprotocol/vegawallet-ui',
    }),
  GetVersion: () =>
    Promise.resolve({
      version: '0.98.0',
      gitHash: '0x0',
      backend: {
        version: '2.0.1',
        gitHash: '0x0',
        networksCompatibility: [
          {
            network: 'test',
            isCompatible: false,
            retrievedVersion: '1.0.0',
          },
        ],
      },
    }),

  // Config
  GetAppConfig: () =>
    Promise.resolve({
      logLevel: 'debug',
      vegaHome: '',
      defaultNetwork: 'test',
      telemetry: {
        consentAsked: true,
        enabled: true,
      },
    }),
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
  EventsOn: noop,
  EventsOff: noop,
  RespondToInteraction: () => Promise.resolve(undefined),
}
