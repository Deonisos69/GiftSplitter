import { useState } from "react";
import "./App.css";
import PeopleAdder from "./Components/PeopleAdder";
import PresentAdder from "./Components/PresentAdder";
import Score from "./Components/Score";
import IconButton from '@mui/material/IconButton';
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function App() {
  const [currentWindow, setCurrentWindow] = useState("PeopleAdder");
  const [windows] = useState(["PeopleAdder","PresentAdder","Score"])

  const nextWindow = () => {
    let index = windows.findIndex(item => item === currentWindow)
    index === windows.length - 1 ? setCurrentWindow(windows[0]) : setCurrentWindow(windows[index + 1])
  }

  const previousWindow = () => {
    let index = windows.findIndex(item => item === currentWindow)
    index === 0 ? setCurrentWindow(windows[windows.length - 1]) : setCurrentWindow(windows[index - 1])
  }

  return (
    <>
      {currentWindow === "PeopleAdder" ? (
        <PeopleAdder />
      ) : currentWindow === "PresentAdder" ? (
        <PresentAdder />
      ) : (
        <Score />
      )}
      <IconButton id="back" size="large" onClick={() => previousWindow()} disabled={windows.findIndex(item => item === currentWindow) === 0}><ArrowBack fontSize="large"/></IconButton>
      <IconButton id="forward" size="large" onClick={() => nextWindow()} disabled={windows.findIndex(item => item === currentWindow) === windows.length - 1}><ArrowForward fontSize="large"/></IconButton>
    </>
  );
}

export default App;
