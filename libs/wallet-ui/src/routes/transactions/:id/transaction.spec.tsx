import { render } from '@testing-library/react'
import { TransactionKeys, TransactionStatus } from '@vegaprotocol/wallet-types'
import type { LogContent } from '../../../types/interaction'
import { TransactionPage } from './transaction'

const DUMMY_TRANSACTION = {
  id: '1',
  type: TransactionKeys.ORDER_SUBMISSION,
  hostname: 'vega.xyz',
  wallet: 'Wallet 1',
  publicKey: 'c1d9b39e5148b14d694020572cb591a8af971b9c5a4a185f3afa47bd9247c0da',
  payload: {
    nonce: '18290134391243719184',
    blockHeight: '39347',
    orderSubmission: {
      marketId:
        '10c7d40afd910eeac0c2cad186d79cb194090d5d5f13bd31e14c49fd1bded7e2',
      price: '0',
      size: '62',
      side: 'SIDE_BUY',
      timeInForce: 'TIME_IN_FORCE_GTT',
      expiresAt: '1679416294197900655',
      type: 'TYPE_LIMIT',
      reference: 'traderbot',
      peggedOrder: {
        reference: 'PEGGED_REFERENCE_BEST_BID',
        offset: '9',
      },
    },
  },
  status: TransactionStatus.SUCCESS,
  receivedAt: new Date(),
  logs: [
    {
      type: 'Info',
      message: 'Withdrawal submitted to the network',
    } as LogContent,
    {
      type: 'Warning',
      message: 'Withdrawal submitted to the network',
    } as LogContent,
    {
      type: 'Error',
      message: 'Withdrawal submitted to the network',
    } as LogContent,
    {
      type: 'Success',
      message: 'Withdrawal submitted to the network',
    } as LogContent,
  ],
  txHash: '9BD4215DCDA4DC87F05305BBEF2544261771E9BC2986F78D96B86FD03ACAD4C0',
  blockHeight: 123456,
  signature: 'signature',
  error: undefined,
}

const renderComponent = () => {
  return render(<TransactionPage transaction={DUMMY_TRANSACTION} />)
}

describe('Transaction', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(0)
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders header, status and all items in list', () => {
    renderComponent()
    expect(false).toBeTruthy()
  })
  it('allows details and event log to be expanded', () => {
    renderComponent()
    expect(false).toBeTruthy()
  })
  it('renders txHash and view on block explorer button if present', () => {
    renderComponent()
    expect(false).toBeTruthy()
  })
})
