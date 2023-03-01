import { useMemo, useCallback } from 'react'

import { useCurrentKeypair } from '../../hooks/use-current-keypair'
import { useGlobal } from '../../contexts/global/global-context'
import { sortTransaction } from '../../lib/transactions'
import { TransactionItem } from './transaction-item'

export const TransactionHistory = () => {
  const { keypair } = useCurrentKeypair()
  const { state, dispatch } = useGlobal()
  const transactionList = useMemo(
    () =>
      Object.values(state.transactions || [])
        .filter((t) => t.publicKey === keypair?.publicKey)
        .sort(sortTransaction),
    [state.transactions, keypair?.publicKey]
  )

  const onViewDetailsHandler = useCallback(
    (id: string) => {
      dispatch({
        type: 'SHOW_TRANSACTION_DETAILS',
        id,
      })
    },
    [dispatch]
  )

  return (
    <>
      {transactionList.length === 0 && <div>No transactions in history.</div>}
      {transactionList.length > 0 &&
        transactionList.map((item) => (
          <TransactionItem
            key={item.id}
            transaction={item}
            viewDetails={() => onViewDetailsHandler(item.id)}
          />
        ))}
    </>
  )
}
