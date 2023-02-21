import nodefetch from 'node-fetch'
import { WalletClient, Identifier } from './'
import { MockWalletService } from './mocks'

const PORT = 5199
const HOSTNAME = `http://localhost:${PORT}`

const service = new MockWalletService({ port: PORT })

const mockRuntime = {
  sendMessage: jest.fn().mockImplementation(() => Promise.resolve(null)),
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
      expect(result).toBe(null)
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
    beforeEach(() => {
      mockRuntime.sendMessage.mockClear()
    })

    describe('Chrome', () => {
      beforeEach(() => {
        // @ts-ignore Typescript doesn't allow this override
        globalThis.chrome = {
          // @ts-ignore To prevent mocking the whole runtime object
          runtime: mockRuntime as typeof chrome.runtime,
        }

        // @ts-ignore Need only this property to be mocked
        globalThis.navigator.__defineGetter__('userAgent', function () {
          return 'Chrome'
        })
      })

      afterEach(() => {
        // @ts-ignore Typescript doesn't allow this override
        global.chrome = undefined
      })

      it('can connect to a wallet', async () => {
        const client = new WalletClient({
          type: 'browser',
          firefoxId: 'TEST_FIREFOX_ID',
          chromeId: 'TEST_CHROME_ID',
        })
        const result = await client.ConnectWallet()
        expect(result).toBe(undefined)
        expect(mockRuntime.sendMessage).toHaveBeenCalledTimes(1)
        const [arg1, arg2] = mockRuntime.sendMessage.mock.calls[0]
        expect(arg1).toBe('TEST_CHROME_ID')
        expect(arg2.method).toBe(Identifier.ConnectWallet)
        expect(arg2.params).toEqual({})
      })
    })

    describe('Firefox', () => {
      beforeEach(() => {
        // @ts-ignore Typescript doesn't allow this override
        globalThis.browser = {
          // @ts-ignore To prevent mocking the whole runtime object
          runtime: mockRuntime,
        }

        const eventQueue: ((m: unknown) => void)[] = []

        globalThis.window.addEventListener = jest
          .fn()
          .mockImplementation((msg: string, handler: (m: unknown) => void) => {
            if (msg === 'message') {
              eventQueue.push(handler)
            }
          })

        globalThis.window.postMessage = jest.fn().mockImplementation((msg) => {
          eventQueue.forEach((handler) => {
            handler({
              data: msg.data,
            })
          })
        })

        // @ts-ignore Need only this property to be mocked
        globalThis.navigator.__defineGetter__('userAgent', function () {
          return 'Firefox'
        })
      })

      afterEach(() => {
        // @ts-ignore Typescript doesn't allow this override
        globalThis.browser = undefined
      })

      it('can connect to a wallet', async () => {
        const client = new WalletClient({
          type: 'browser',
          firefoxId: 'TEST_FIREFOX_ID',
          chromeId: 'TEST_CHROME_ID',
        })
        const result = await client.ConnectWallet()
        expect(result).toBe(undefined)
        expect(globalThis.window.postMessage).toHaveBeenCalledTimes(1)
        // @ts-ignore Typescript refuses to acknowledge this mock
        const [arg1] = globalThis.window.postMessage.mock.calls[0]
        expect(arg1.extensionId).toBe('TEST_FIREFOX_ID')
        expect(arg1.data.method).toBe(Identifier.ConnectWallet)
        expect(arg1.data.params).toEqual({})
      })
    })
  })
})
