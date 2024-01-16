/* eslint-disable no-unused-vars */
import { usePresentStore } from "../db/usePresentStore"
import Transaction from "../model/Transaction"

export default function Score() {

    /** @type {Transaction[]} */
    const transactions = usePresentStore(state => state.transactions)
  return (
    <div>
        {transactions.map(transaction => (
            <div key={transaction.id}>{transaction.from.name} schuldet {transaction.to.name} {transaction.amount} €</div>
        ))}
    </div>
  )
}
