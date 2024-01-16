import {
  Button,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TextField,
} from "@mui/material";
import { usePresentStore } from "../db/usePresentStore";
import { useState } from "react";
import Transaction from "../model/Transaction";

export default function PresentAdder() {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const presents = usePresentStore((state) => state.presents);
  /** @type {Array} */
  const people = usePresentStore((state) => state.people);
  const addPresentStore = usePresentStore((state) => state.addPresent);
  const addTransaction = usePresentStore((state) => state.addTransaction);
  const addPresent = (name, price, from, to, paidBy) => {
    addPresentStore(name, price, from, to, paidBy);
    setFrom([]);
    setTo("");
    setTitle("");
    setPrice("");
    setPaidBy("");
  };
  const addTransactions = () => {
    for (const present of presents) {
      for (var i = 0; i < present.from.length; i++) {
        if (present.from[i].id === present.paidBy.id) continue;
        people
          .find((person) => person.id === present.from[i].id)
          .transactions.push({
            to: present.paidBy,
            amount: present.price / present.from.length,
          });
      }
    }
  };
  const calculateTransactions = () => {
    addTransactions();

    for (var i = 0; i < people.length; i++) {
      for (var j = i + 1; j < people.length; j++) {
        var amount = 0;
        for (var k = 0; k < people[i].transactions.length; k++) {
          if (people[i].transactions[k].to.id === people[j].id) {
            amount += people[i].transactions[k].amount;
          }
        }
        for (var l = 0; l < people[j].transactions.length; l++) {
          if (people[j].transactions[l].to.id === people[i].id) {
            amount -= people[j].transactions[l].amount;
          }
        }
        if (amount === 0) continue;
        const transTest = amount > 0 ? new Transaction(people[i], people[j], amount) : new Transaction(people[j], people[i], amount * -1) ;
        addTransaction(transTest);
        console.log(transTest);
      }
    }
  };
  const deletePresent = usePresentStore((state) => state.deletePresent);
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
                      <MenuItem key={person.id} value={person}>
                        {person.name}
                      </MenuItem>
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
                  <Select
                    variant="standard"
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                    label={"People"}
                    displayEmpty
                  >
                    {from.map((person) => (
                      <MenuItem key={person.id} value={person}>
                        {person.name}
                      </MenuItem>
                    ))}
                  </Select>
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
            <TableBody>
              {presents.map((present) => (
                <TableRow key={present.id}>
                  <TableCell>
                    {present.from.map((from) => from.name).join(", ")}
                  </TableCell>
                  <TableCell>{present.to}</TableCell>
                  <TableCell>{present.name}</TableCell>
                  <TableCell>{present.price}</TableCell>
                  <TableCell>{present.paidBy.name}</TableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={() => calculateTransactions()}>Calculate</Button>
      </div>
    </>
  );
}
