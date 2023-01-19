import fetch from 'node-fetch'
import { WalletClient, Identifier } from './'
import { MockWalletService } from './mocks'

const PORT = 5199
const HOSTNAME = `http://localhost:${PORT}`

// @ts-ignore Expected global fetch type doesn't match the lib for some reason
global.fetch = fetch

const service = new MockWalletService({ port: PORT })

beforeEach(() => {
  service.start()
})

afterEach(() => {
  service.stop()
})

describe('Wallet Client', () => {
  it('can connect to a wallet', async () => {
    const onTokenChange = jest.fn()
    const client = new WalletClient({ address: HOSTNAME, onTokenChange })
    const { result } = await client.ConnectWallet()
    expect(result).toBe('null')
    expect(onTokenChange).toHaveBeenCalledWith('VWT token')
  })

  it('returns a supported list of methods', async () => {
    const onTokenChange = jest.fn()
    const client = new WalletClient({ address: HOSTNAME, onTokenChange })

    const { registeredMethods } = await client.ListMethods()
    expect(registeredMethods).toEqual(Object.values(Identifier))
  })
})
