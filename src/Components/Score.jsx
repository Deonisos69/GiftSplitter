/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { usePresentStore } from "../db/usePresentStore"
import Transaction from "../model/Transaction"

export default function Score({animation = "animate__slideInRight"}) {

    /** @type {Transaction[]} */
    const transactions = usePresentStore(state => state.transactions)
  return (
    <div className={"animate__animated animate__faster " + animation} id="Score">
      <div className="scrollable center">
        {transactions.map(transaction => (
          <div className="score"  key={transaction.id}>
            <div >{transaction.from.name} schuldet {transaction.to.name} {transaction.amount.toFixed(2)} €</div>
          </div>
        ))}
      </div>
    </div>
  )
}
