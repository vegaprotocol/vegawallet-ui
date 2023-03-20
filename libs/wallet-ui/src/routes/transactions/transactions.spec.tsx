import { render, screen } from '@testing-library/react'
import { TransactionHome } from './transactions'

describe('Transactions', () => {
  it('renders header state', () => {
    render(<TransactionHome transactions={[]} />)
    expect(screen.getByTestId('transactions-header')).toHaveTextContent(
      'Transactions'
    )
  })
  it('renders empty state', () => {
    render(<TransactionHome transactions={[]} />)
    expect(screen.getByTestId('transactions-empty')).toHaveTextContent(
      'Transactions'
    )
  })
})
