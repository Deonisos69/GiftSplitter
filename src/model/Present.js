import { v4 } from "uuid";

export default class Present {
    constructor(name, price, from, to, paidBy) {
        this.name = name;
        this.price = price;
        this.from = from;
        this.to = to;
        this.paidBy = paidBy;
        this.id = v4();
    }
}