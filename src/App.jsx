import { useState } from "react";
import "./App.css";
import PeopleAdder from "./Components/PeopleAdder";
import PresentAdder from "./Components/PresentAdder";
import Score from "./Components/Score";
import IconButton from "@mui/material/IconButton";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "animate.css";
import { usePresentStore } from "./db/usePresentStore";
import Transaction from "./model/Transaction";

function App() {
  const [currentWindow, setCurrentWindow] = useState("PeopleAdder");
  const [windows] = useState(["PeopleAdder", "PresentAdder", "Score"]);

  const reset = usePresentStore((state) => state.reset);
  const presents = usePresentStore((state) => state.presents);
  /** @type {Array} */
  const people = usePresentStore((state) => state.people);
  const addTransaction = usePresentStore((state) => state.addTransaction);

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
        const transTest =
          amount > 0
            ? new Transaction(people[i], people[j], amount)
            : new Transaction(people[j], people[i], amount * -1);
        addTransaction(transTest);
      }
    }
  };

  const nextWindow = () => {
    let index = windows.findIndex((item) => item === currentWindow);
    if (index === windows.length - 2) calculateTransactions();
    index === windows.length - 1
      ? setCurrentWindow(windows[0])
      : setCurrentWindow(windows[index + 1]);
  };

  const previousWindow = () => {
    let index = windows.findIndex((item) => item === currentWindow);
    if (index === windows.length - 1) reset();
    index === 0
      ? setCurrentWindow(windows[windows.length - 1])
      : setCurrentWindow(windows[index - 1]);
  };

  return (
    <>
      {currentWindow === "PeopleAdder" ? (
        <PeopleAdder />
      ) : currentWindow === "PresentAdder" ? (
        <PresentAdder />
      ) : (
        <Score />
      )}
      <IconButton
        id="back"
        size="large"
        onClick={() => previousWindow()}
        disabled={windows.findIndex((item) => item === currentWindow) === 0}
      >
        <ArrowBack fontSize="large" />
      </IconButton>
      <IconButton
        id="forward"
        size="large"
        onClick={() => nextWindow()}
        disabled={
          windows.findIndex((item) => item === currentWindow) ===
          windows.length - 1 || presents.length == 0
        }
      >
        <ArrowForward fontSize="large" />
      </IconButton>
    </>
  );
}

export default App;
