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
    const client = new WalletClient({ address: HOSTNAME })
    const { result } = await client.ConnectWallet()
    expect(result).toBe('null')
  })

  it('returns a supported list of methods', async () => {
    const client = new WalletClient({ address: HOSTNAME })

    const { registeredMethods } = await client.ListMethods()
    expect(registeredMethods).toEqual(Object.values(Identifier))
  })
})
