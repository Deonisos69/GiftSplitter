import { create } from "zustand";
import Person from "../model/Person";
import Present from "../model/Present";

export const usePresentStore = create((set) => ({
  people: [],
  presents: [],
  transactions: [],
  addPerson: (name) => {
    const newPerson = new Person(name);
    set((state) => ({ people: [...state.people, newPerson] }));
  },
  deletePerson: (id) => {
    set((state) => ({
      people: state.people.filter((person) => person.id != id),
    }));
  },
  addPresent: (name, price, from, to, paidBy) => {
    const newPresent = new Present(name, price, from, to, paidBy);
    set((state) => ({ presents: [...state.presents, newPresent] }));
  },
  deletePresent: (id) => {
    set((state) => ({
      presents: state.presents.filter((present) => present.id != id),
    }));
  },
  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }));
  },
  reset: () => {
    set((state) => ({
      transactions: [],
      people: state.people.map((person) => {
        return { name: person.name, id: person.id, transactions: [] };
      }),
    }));
  },
}));
