import type { Service } from '../src/types/service'

const logger = {}

export const service: Service = {
  GetLatestRelease: jest.fn().mockImplementation(() =>
    Promise.resolve({
      version: '0.99.0',
      url: 'https://github.com/vegaprotocol/vegawallet-ui',
    })
  ),
  GetVersion: jest.fn().mockImplementation(() =>
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
    })
  ),

  // Config
  GetAppConfig: jest.fn().mockImplementation(() =>
    Promise.resolve({
      logLevel: 'debug',
      vegaHome: '',
      defaultNetwork: 'test',
      telemetry: {
        consentAsked: true,
        enabled: true,
      },
    })
  ),
  SearchForExistingConfiguration: jest.fn().mockImplementation(() =>
    Promise.resolve({
      wallets: [],
      networks: ['test'],
    })
  ),
  UpdateAppConfig: jest.fn().mockImplementation(() => Promise.resolve()),

  // Initialization
  InitialiseApp: jest.fn().mockImplementation(() => Promise.resolve()),
  IsAppInitialised: jest.fn().mockImplementation(() => Promise.resolve(true)),

  // Telemetry
  EnableTelemetry: jest.fn().mockImplementation(() => Promise.resolve()),

  // Logging
  GetLogger: jest.fn().mockImplementation(() => Promise.resolve(logger)),

  // Service
  StartService: jest.fn().mockImplementation(() => Promise.resolve()),
  StopService: jest.fn().mockImplementation(() => Promise.resolve()),
  GetCurrentServiceInfo: jest.fn().mockImplementation(() =>
    Promise.resolve({
      url: 'http://localhost:1789',
      logFilePath: './',
      isRunning: true,
      latestHealthState: 'HEALTHY',
    })
  ),

  // API
  SendAPIRequest: jest.fn().mockImplementation(async (id: string) => {
    switch (id) {
      default: {
        return undefined
      }
    }
  }),
  EventsOn: jest.fn(),
  EventsOff: jest.fn(),
  RespondToInteraction: jest.fn().mockImplementation(() => Promise.resolve()),
}
