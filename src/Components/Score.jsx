/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { usePresentStore } from "../db/usePresentStore"
import Transaction from "../model/Transaction"

export default function Score({animation = "animate__slideInRight"}) {

    /** @type {Transaction[]} */
    const transactions = usePresentStore(state => state.transactions)
  return (
    <div className={"scrollable score animate__animated " + animation} id="Score">
        {transactions.map(transaction => (
          <div key={transaction.id}>
            <div >{transaction.from.name} schuldet {transaction.to.name} {transaction.amount.toFixed(2)} €</div>
            <hr />
          </div>
        ))}
    </div>
  )
}
