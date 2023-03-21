import { render, screen, within } from '@testing-library/react'
import { TransactionKeys, TransactionStatus } from '../../lib/transactions'
import { TransactionHome } from './transactions'

describe('Transactions', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(0)
  })
  afterEach(() => {
    jest.useRealTimers()
  })
  it('renders header state', () => {
    render(<TransactionHome transactions={[]} />)
    expect(screen.getByTestId('transactions-header')).toHaveTextContent(
      'Transactions'
    )
  })
  it('renders empty state', () => {
    render(<TransactionHome transactions={[]} />)
    expect(screen.getByTestId('transactions-empty')).toHaveTextContent(
      'You have no transactions this session.'
    )
  })
  it('renders an list of items for each transaction', () => {
    render(
      <TransactionHome
        transactions={[
          {
            id: '1',
            type: TransactionKeys.WITHDRAW_SUBMISSION,
            wallet: 'wallet',
            publicKey: 'publicKey',
            txHash: 'txHashtxHashtxHashtxHashtxHash',
            status: TransactionStatus.SUCCESS,
            receivedAt: new Date(),
            hostname: 'something.com',
            logs: [],
            payload: {},
          },
          {
            id: '2',
            type: TransactionKeys.VOTE_SUBMISSION,
            wallet: 'wallet',
            publicKey: 'publicKey',
            txHash: null,
            status: TransactionStatus.PENDING,
            receivedAt: new Date(),
            hostname: 'something.com',
            logs: [],
            payload: {},
          },
        ]}
      />
    )

    const successfulTransaction = screen.queryAllByTestId(
      'transactions-transaction'
    )[0]
    const pendingTransaction = screen.queryAllByTestId(
      'transactions-transaction'
    )[1]
    expect(
      within(successfulTransaction).getByTestId('transaction-status')
    ).toHaveTextContent('Approved')
    expect(
      within(successfulTransaction).getByTestId('transactions-type')
    ).toHaveTextContent('Withdraw')
    expect(
      within(successfulTransaction).getByTestId('transactions-hash')
    ).toHaveTextContent('txHash…Hash')
    expect(
      within(successfulTransaction).getByTestId('transactions-sender')
    ).toHaveTextContent('wallet, public…cKey')
    expect(
      within(successfulTransaction).getByTestId('transactions-date')
    ).toHaveTextContent('1/1/1970, 12:00:00 AM')

    expect(
      within(pendingTransaction).getByTestId('transaction-status')
    ).toHaveTextContent('In progress')
    expect(
      within(pendingTransaction).getByTestId('transactions-type')
    ).toHaveTextContent('Vote submission')
    expect(
      within(pendingTransaction).queryByTestId('transactions-hash')
    ).toHaveTextContent('')
    expect(
      within(pendingTransaction).getByTestId('transactions-sender')
    ).toHaveTextContent('wallet, public…cKey')
    expect(
      within(pendingTransaction).getByTestId('transactions-date')
    ).toHaveTextContent('1/1/1970, 12:00:00 AM')
  })
})
