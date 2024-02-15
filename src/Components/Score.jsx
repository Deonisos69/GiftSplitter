/* eslint-disable no-unused-vars */
import { usePresentStore } from "../db/usePresentStore"
import Transaction from "../model/Transaction"

export default function Score() {

    /** @type {Transaction[]} */
    const transactions = usePresentStore(state => state.transactions)
  return (
    <div id="scrollable">
        {transactions.map(transaction => (
            <div className="score animate__animated animate__backInRight" key={transaction.id}>{transaction.from.name} schuldet {transaction.to.name} {transaction.amount.toFixed(2)} €</div>
        ))}
    </div>
  )
}
