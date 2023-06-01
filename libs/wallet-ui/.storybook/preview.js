// @ts-check
import './styles.css'
import classnames from 'classnames'
import { TransactionKeys, TransactionStatus } from '@vegaprotocol/wallet-types'

import { TRANSACTION_STORAGE_KEY } from '../src/contexts/global/global-reducer'

/** @type {Record<string, import('../src/lib/transactions').Transaction>} */
const transactions = {
  1: {
    id: '1',
    type: TransactionKeys.ORDER_SUBMISSION,
    hostname: 'vega.xyz',
    wallet: 'wallet-1',
    publicKey:
      'b5fd9d3c4ad553cb3196303b6e6df7f484cf7f5331a572a45031239fd71ad8a0',
    payload: {
      marketId: '1',
      price: '1000',
      size: 2,
      side: 1,
      timeInForce: 0,
      expiresAt: Date.parse('2049-01-01'),
      type: 0,
    },
    status: TransactionStatus.SUCCESS,
    receivedAt: new Date('2023-01-02 17:45'),
    logs: [
      {
        type: 'Info',
        message: 'This happened',
      },
      {
        type: 'Info',
        message: 'And then this happened',
      },
      {
        type: 'Warning',
        message: "This doesn't look that great",
      },
      {
        type: 'Error',
        message: 'Things almost crashed because of this error',
      },
      {
        type: 'Success',
        message: 'But then it was all fine',
      },
      {
        type: 'Info',
        message: 'So back to boring messages now',
      },
      {
        type: 'Warning',
        message: 'But be prepared for anything',
      },
      {
        type: 'Info',
        message: 'Just kidding, nothing to worry about',
      },
      {
        type: 'Success',
        message: 'Green is the prettiest colour',
      },
      {
        type: 'Success',
        message: 'Closing notes, curtain please',
      },
      {
        type: 'Info',
        message: 'The end',
      },
    ],
    txHash: '0x0',
    blockHeight: 1234,
  },
}

localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions))

/** @param p { {children?: import('react').ReactNode, fill?: boolean }} */
const StoryWrapper = ({ children, fill }) => {
  const classes = classnames(
    'bg-black text-white font-sans overflow-y-scroll',
    {
      'w-screen h-screen': fill,
    }
  )
  return <div className={classes}>{children}</div>
}

export const parameters = {
  layout: 'fullscreen',
  backgrounds: { disable: true },
}

/** @param Story {import('@storybook/react').Story} */
const Wrapper = (Story) => {
  return (
    <StoryWrapper fill={true}>
      <Story />
    </StoryWrapper>
  )
}

export const decorators = [Wrapper]
