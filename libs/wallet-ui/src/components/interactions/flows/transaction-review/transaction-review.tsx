export type TransactionReviewProps = {
  traceID: string
  workflow: 'TRANSACTION_REVIEW'
}

export const TransactionReview = ({ workflow }: TransactionReviewProps) => {
  return <div>{workflow}</div>
}
