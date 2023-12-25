import { useState } from "react";
import { usePresentStore } from "../db/usePresentStore";

export default function PeopleAdder() {
  // State
  const [personName, setPersonName] = useState("");

  // Zustand
  const people = usePresentStore((state) => state.people);
  const addPerson = usePresentStore((state) => state.addPerson);
  return (
    <>
      <input onChange={e => setPersonName(e.target.value)} value={personName} />
      <button onClick={() => addPerson(personName)}>Add Person</button>
      {people.map((person) => (<div key={person.id}>{person.name}</div>))}
    </>
  );
}
