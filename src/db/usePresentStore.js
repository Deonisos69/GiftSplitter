import { create } from "zustand";
import Person from "../model/Person";

export const usePresentStore = create((set) => ({
  people: [],
  addPerson: (name) => {
    const newPerson = new Person(name);
    set((state) => ({ people: [...state.people, newPerson] }));
  },
}));
