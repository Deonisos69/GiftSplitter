import { v4 } from "uuid"
// eslint-disable-next-line no-unused-vars
import Person from "./Person"

export default class Transaction {
    /**
     * Creates a new Transaction between two people
     * @param {Person} from 
     * @param {Person} to 
     * @param {number} amount 
     */
    constructor(from, to, amount) {
        this.from = from
        this.id = v4()
        this.to = to
        this.amount = amount
    }
}

// VIEL BESSER WENN ICH DIE TRANSACTIONS SEPERAT IN DEM PRESENT STORE SPEICHERE UND DA ALLE IDS VERGLEICHE