import { v4 } from "uuid"

export default class Person {
    /**
     * Creates a new Person
     * @param {String} name 
     */
    constructor(name) {
        this.name = name
        this.id = v4()
        this.transactions = []
    }
}