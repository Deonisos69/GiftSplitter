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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Presents from "./Components/Presents";

function App() {
  const [currentWindow, setCurrentWindow] = useState({ position: 0, title: "PeopleAdder" });
  const [windows] = useState(["PeopleAdder", "PresentAdder", "Presents", "Score"]);
  const [animations, setAnimations] = useState(["animate__slideInRight", "animate__slideInRight", "animate__slideInRight", "animate__slideInRight"]);

  const reset = usePresentStore((state) => state.reset);
  const presents = usePresentStore((state) => state.presents);
  /** @type {Array} */
  const people = usePresentStore((state) => state.people);
  const addTransaction = usePresentStore((state) => state.addTransaction);

  const theme = createTheme({
    palette: {
      primary: { main: "#7572B8" },
      secondary: { main: "#D5C784" },
    },
  });

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
        const transTest = amount > 0 ? new Transaction(people[i], people[j], amount) : new Transaction(people[j], people[i], amount * -1);
        addTransaction(transTest);
      }
    }
  };

  const nextWindow = () => {
    const element = document.querySelector("#" + currentWindow.title);
    let newAnimations = [...animations];
    newAnimations[currentWindow.position] = "animate__bounceOutLeft";
    setAnimations(newAnimations);

    
    element.addEventListener("animationend", () => {
      newAnimations[currentWindow.position + 1] = "animate__slideInRight";
      setAnimations(newAnimations);
      if (currentWindow.title === "Presents") calculateTransactions();
      setCurrentWindow({ position: currentWindow.position + 1, title: windows[currentWindow.position + 1] });
    });
  };

  const previousWindow = () => {
    const element = document.querySelector("#" + currentWindow.title);
    let newAnimations = [...animations];
    newAnimations[currentWindow.position] = "animate__bounceOutRight";
    setAnimations(newAnimations);

    
    
    element.addEventListener("animationend", () => {
      newAnimations[currentWindow.position - 1] = "animate__slideInLeft";
      setAnimations(newAnimations);
      if (currentWindow.title == "Score") reset();
      setCurrentWindow({ position: currentWindow.position - 1, title: windows[currentWindow.position - 1] });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {currentWindow.title === "PeopleAdder" ? (
        <PeopleAdder animation={animations[0]} />
      ) : currentWindow.title === "PresentAdder" ? (
        <PresentAdder animation={animations[1]} />
      ) : currentWindow.title === "Presents" ? (
        <Presents animation={animations[2]} />
      ) : (
        <Score animation={animations[3]} />
      )}
      <IconButton id="back" size="large" onClick={() => previousWindow()} disabled={currentWindow.position == 0}>
        <ArrowBack fontSize="large" />
      </IconButton>
      <IconButton
        id="forward"
        size="large"
        onClick={() => nextWindow()}
        disabled={
          currentWindow.position == windows.length - 1 ||
          (currentWindow.title == "PeopleAdder" && people.length == 0) ||
          (currentWindow.title == "PresentAdder" && presents.length == 0) ||
          (currentWindow.title == "Presents" && presents.length == 0)
        }
      >
        <ArrowForward fontSize="large" />
      </IconButton>
    </ThemeProvider>
  );
}

export default App;
