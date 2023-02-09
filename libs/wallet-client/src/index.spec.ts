import nodefetch from 'node-fetch'
import { WalletClient, Identifier } from './'
import { MockWalletService } from './mocks'

const PORT = 5199
const HOSTNAME = `http://localhost:${PORT}`

const service = new MockWalletService({ port: PORT })

declare global {
  interface browser {
    runtime: Runtime
  }
  interface chrome {
    runtime: Runtime
  }
}

type Runtime = {
  sendMessage: () => void
}

const mockRuntime = {
  sendMessage: jest.fn(),
}

// @ts-ignore imported fetch type is different from the one sitting in the types of jest dom
global.fetch = nodefetch

describe('Wallet Client', () => {
  describe('HTTP', () => {
    beforeEach(() => {
      mockRuntime.sendMessage.mockReset()
      service.start()
    })

    afterEach(() => {
      service.stop()
    })

    it('can connect to a wallet', async () => {
      const onTokenChange = jest.fn()
      const client = new WalletClient({
        type: 'http',
        address: HOSTNAME,
        onTokenChange,
      })
      const result = await client.ConnectWallet()
      expect(result).toBe('null')
      expect(onTokenChange).toHaveBeenCalledWith('VWT token')
    })

    it('returns a supported list of methods', async () => {
      const onTokenChange = jest.fn()
      const client = new WalletClient({
        type: 'http',
        address: HOSTNAME,
        onTokenChange,
      })

      const { registeredMethods } = await client.ListMethods()
      expect(registeredMethods).toEqual(Object.values(Identifier))
    })
  })

  describe('Browser', () => {
    describe('Chrome', () => {
      beforeEach(() => {
        // @ts-ignore ts fails to recognise this
        global.chrome = {
          runtime: mockRuntime,
        }
      })

      afterEach(() => {
        // @ts-ignore ts fails to recognise this
        global.chrome = undefined
      })

      it('can connect to a wallet', async () => {
        const onTokenChange = jest.fn()
        const client = new WalletClient({
          type: 'browser',
          firefoxId: 'TEST_FIREFOX_ID',
          chromeId: 'TEST_CHROME_ID',
        })
        const { result } = await client.ConnectWallet()
        expect(result).toBe('null')
        expect(onTokenChange).toHaveBeenCalledWith('VWT token')
      })
    })

    describe('Firefox', () => {
      beforeEach(() => {
        // @ts-ignore ts fails to recognise this
        globalThis.browser = {
          runtime: mockRuntime,
        }
      })

      afterEach(() => {
        // @ts-ignore ts fails to recognise this
        globalThis.browser = undefined
      })

      it('can connect to a wallet', async () => {
        const onTokenChange = jest.fn()
        const client = new WalletClient({
          type: 'browser',
          firefoxId: 'TEST_FIREFOX_ID',
          chromeId: 'TEST_CHROME_ID',
        })
        const result = await client.ConnectWallet()
        expect(result).toBe('null')
        expect(onTokenChange).toHaveBeenCalledWith('VWT token')
      })
    })
  })
})
