import { useState } from "react";
import { usePresentStore } from "../db/usePresentStore";
import { TextField, Chip } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Add } from "@mui/icons-material";

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
    <div className="animate__animated animate__slideInLeft animate__faster" id="PeopleAdder">
    <h1>WER HAT SICH AN DEN GESCHENKEN BETEILIGT?</h1>
    <div>
      <TextField
        variant="standard"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !(personName == "" || personName == " ")) handleAddPerson();
        }}
        onChange={(e) => setPersonName(e.target.value)}
        value={personName}
        label={"Name"}
      />
      <IconButton disabled={!personName || personName == " "} variant="text" onClick={() => handleAddPerson()}>
        <Add fontSize="medium"/>
      </IconButton>
    </div>
      <div className="people">
        {people.map((person) => (
          <Chip
            onDelete={() => deletePerson(person.id)}
            key={person.id}
            label={person.name}
            className="animate__animated animate__bounceIn person"
            variant="filled"
            size="medium"
            color="secondary"
          ></Chip>
        ))}
      </div>
    </div>
  );
}
