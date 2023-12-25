import { useState } from "react";
import { usePresentStore } from "../db/usePresentStore";
import { TextField, Button, Chip } from "@mui/material";

export default function PeopleAdder() {
  // State
  const [personName, setPersonName] = useState("");

  // Zustand
  const people = usePresentStore((state) => state.people);
  const addPerson = usePresentStore((state) => state.addPerson);
  const deletePerson = usePresentStore((state) => state.deletePerson);

  const handleAddPerson = () => {
    addPerson(personName)
    setPersonName("")
  }
  return (
    <>
    <h1>PEOPLE</h1>
    <div>
      <TextField
        variant="standard"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddPerson();
        }}
        onChange={(e) => setPersonName(e.target.value)}
        value={personName}
      />
      <Button variant="text" onClick={() => handleAddPerson()}>
        Add Person
      </Button>
    </div>
      <div className="people">
        {people.map((person) => (
          <Chip
            onDelete={() => deletePerson(person.id)}
            key={person.id}
            label={person.name}
          ></Chip>
        ))}
      </div>
    </>
  );
}
