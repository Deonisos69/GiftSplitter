import { MenuItem, Select, TextField, Alert, InputAdornment } from "@mui/material";
import { usePresentStore } from "../db/usePresentStore";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Add, Check } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
export default function PresentAdder({ animation = "animate__slideInRight" }) {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");

  /** @type {Array} */
  const people = usePresentStore((state) => state.people);
  const addPresentStore = usePresentStore((state) => state.addPresent);
  const addPresent = (name, price, from, to, paidBy) => {
    addPresentStore(name, cleanPrice(price), from, to, paidBy);
    setAlertTitle(title);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    setFrom([]);
    setTo("");
    setTitle("");
    setPrice("");
    setPaidBy("");
  };

  /**
   * Replaces commas with dots for javascript compatibility.
   * @param {string} price 
   * @returns {string}
   */
  function cleanPrice(price) {
    return price.replace(",",".")
  }

  return (
    // eslint-disable-next-line react/prop-types
    <div className={"animate__animated  animate__faster animate__faster " + animation} id="PresentAdder">
      {showAlert ? (
        <Alert className="animate__animated animate__faster animate__slideInDown success" icon={<Check fontSize="inherit" />} severity="success">
          {alertTitle} hinzugefügt.
        </Alert>
      ) : (
        <></>
      )}
      <div className="presentsDiv">
        <h1>WELCHE GESCHENKE WURDEN VERTEILT?</h1>
        <div className="presentInputs">
          <div className="presentInput">
            <h4>Von</h4>
            <Select variant="standard" value={from} onChange={(e) => setFrom(e.target.value)} multiple label={"People"} displayEmpty>
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
            <h4>Geschenktitel</h4>
            <TextField className="input" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="presentInput">
            <h4>Preis</h4>
            <TextField
              className="input"
              variant="standard"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
            />
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
            id="addButton"
            size="large"
          >
            <Add />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
