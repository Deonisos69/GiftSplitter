import {
  Button,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { usePresentStore } from "../db/usePresentStore";
import { useState } from "react";

export default function PresentAdder() {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const presents = usePresentStore((state) => state.presents);
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
  const deletePresent = usePresentStore(state => state.deletePresent)
  return (
    <>
      <div className="presentsDiv">
        <h1>PRESENTS</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>PaidBy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Select
                    variant="standard"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    multiple
                    label={"People"}
                    displayEmpty
                  >
                    {people.map((person) => (
                      <MenuItem key={person.id}>{person.name}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => addPresent(title, price, from, to, paidBy)}
                  >
                    Add Present
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            {presents.map((present) => (
              <TableRow key={present.id}>
                <TableCell>{present.from}</TableCell>
                <TableCell>{present.to}</TableCell>
                <TableCell>{present.name}</TableCell>
                <TableCell>{present.price}</TableCell>
                <TableCell>{present.paidBy}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => deletePresent(present.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
