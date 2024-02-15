import { MenuItem, Select, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, TextField } from "@mui/material";
import { usePresentStore } from "../db/usePresentStore";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Add, Delete } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
export default function PresentAdder({ animation = "animate__slideInRight" }) {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const presents = usePresentStore((state) => state.presents);
  /** @type {Array} */
  const people = usePresentStore((state) => state.people);
  const addPresentStore = usePresentStore((state) => state.addPresent);
  const addPresent = (name, price, from, to, paidBy) => {
    addPresentStore(name, price, from, to, paidBy);
    setFrom([]);
    setTo("");
    setTitle("");
    setPrice("");
    setPaidBy("");
  };

  const deletePresent = usePresentStore((state) => state.deletePresent);
  return (
    // eslint-disable-next-line react/prop-types
    <div className={"animate__animated  animate__faster " + animation} id="PresentAdder">
      <div className="presentsDiv">
        <h1>WELCHE GESCHENKE WURDEN VERTEILT?</h1>
        <div className="presentInputs">
          <div className="presentInput">
            <h4>Von</h4>
            <Select
              variant="standard"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              multiple
              label={"People"}
              displayEmpty
              className="input"
            >
              {people.map((person) => (
                <MenuItem key={person.id} value={person}>
                  {person.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="presentInput">
            <h4>An</h4>
            <TextField className="input" variant="standard" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="presentInput">
            <h4>Geschenkname</h4>
            <TextField className="input" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="presentInput">
            <h4>Preis</h4>
            <TextField className="input" variant="standard" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="presentInput">
            <h4>Bezahlt von</h4>
            <Select className="input" variant="standard" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} label={"People"} displayEmpty>
              {from.map((person) => (
                <MenuItem key={person.id} value={person}>
                  {person.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <IconButton
            variant="text"
            onClick={() => addPresent(title, price, from, to, paidBy)}
            disabled={!from || !to || !title || !price || !paidBy}
          >
            <Add />
          </IconButton>
        </div>
        <TableContainer className={"table"}>
          <Table size="small" padding="none">
            <TableHead>
              <TableRow className="tableTop">
                <TableCell>Von</TableCell>
                <TableCell>An</TableCell>
                <TableCell>Titel</TableCell>
                <TableCell>Preis</TableCell>
                <TableCell>Bezahlt von</TableCell>
                <TableCell />
              </TableRow>
              <TableRow className="tableSecond"></TableRow>
            </TableHead>
            <TableBody>
              {presents.map((present) => (
                <TableRow key={present.id} className="animate__animated animate__fadeIn tableElement">
                  <TableCell>{present.from.map((from) => from.name).join(", ")}</TableCell>
                  <TableCell>{present.to}</TableCell>
                  <TableCell>{present.name}</TableCell>
                  <TableCell>{present.price}</TableCell>
                  <TableCell>{present.paidBy.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => deletePresent(present.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
