import { render, screen } from '@testing-library/react'
import { TransactionLogs } from '.'
import type { LogContent } from '../../types/interaction'

const LOGS: Record<LogContent['type'], LogContent> = {
  Info: {
    type: 'Info',
    message: 'Information message',
  },
  Warning: {
    type: 'Warning',
    message: 'Warning message',
  },
  Error: {
    type: 'Error',
    message: 'Error message',
  },
  Success: {
    type: 'Success',
    message: 'Success message',
  },
}

describe('TransactionLogs', () => {
  it('renders info messages', () => {
    const logs = [LOGS.Info]
    render(<TransactionLogs logs={logs} />)

    const element = screen.getByText(LOGS.Info.message)
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('text-neutral-light')
  })

  it('renders warning messages', () => {
    const logs = [LOGS.Warning]
    render(<TransactionLogs logs={logs} />)

    const element = screen.getByText(LOGS.Warning.message)
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('text-warning-light')
  })

  it('renders error messages', () => {
    const logs = [LOGS.Error]
    render(<TransactionLogs logs={logs} />)

    const element = screen.getByText(LOGS.Error.message)
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('text-danger-light')
  })

  it('renders success messages', () => {
    const logs = [LOGS.Success]
    render(<TransactionLogs logs={logs} />)

    const element = screen.getByText(LOGS.Success.message)
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('text-success-light')
  })
})
