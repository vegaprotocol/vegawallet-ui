import { useMemo, useCallback } from 'react'

import { useGlobal } from '../../contexts/global/global-context'
import { Dialog } from '../dialog'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { TransactionDetails } from '../transaction-details'
import { TRANSACTION_TITLES } from '@vegaprotocol/wallet-types'

export const TransactionDetailsDialog = () => {
  const { state, dispatch } = useGlobal()
  const transaction = useMemo(() => {
    return (
      state.showTransactionDetails !== '' &&
      state.showTransactionDetails !== null &&
      state.transactions[state.showTransactionDetails]
    )
  }, [state.transactions, state.showTransactionDetails])

  const changeHandler = useCallback(() => {
    dispatch({
      type: 'SHOW_TRANSACTION_DETAILS',
      id: null,
    })
  }, [dispatch])

  return (
    <Dialog
      size="lg"
      open={!!transaction}
      title={transaction ? TRANSACTION_TITLES[transaction.type] : ''}
      onChange={changeHandler}
    >
      <div className="p-[20px]">
        {transaction && <TransactionDetails transaction={transaction} />}
        <ButtonGroup inline className="pt-[20px]">
          <ButtonUnstyled onClick={() => changeHandler()}>Close</ButtonUnstyled>
        </ButtonGroup>
      </div>
    </Dialog>
  )
}
