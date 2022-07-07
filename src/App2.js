import { useEffect, useState } from "react";
import "./App.css";
import BreakLength from "./components/BreakLength.js";
import SessionLength from "./components/SessionLength";
import beep from "./beep.mp3";

function Session({
  timerOn,
  setTimerOn,
  formatTime,
  displayTime,
  handleReset,
  controlTime,
  onBreak,
}) {
  const toggleButton = () => {
    if (timerOn) {
      setTimerOn(false);
    } else {
      setTimerOn(true);
    }
    console.log("timerOn: " + timerOn);
  };

  return (
    <div>
      <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
      <p id="time-left">{formatTime(displayTime)}</p>
      <span>
        <button id="start_stop" onClick={controlTime}>
          {timerOn ? "▶" : "⏸"}
        </button>

        <button id="reset" onClick={handleReset}>
          🔃
        </button>
      </span>
    </div>
  );
}
function App() {
  //Session Timer
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  // const [timerType, setTimerType] = useState("session");
  const [timerOn, setTimerOn] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(new Audio(beep));

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.volume = 0.1;
    breakAudio.play();
    // setTimeout(() => {
    //   breakAudio.pause();
    // }, 5100);
  };
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let formattedSecs = seconds < 10 ? "0" + seconds : seconds;
    let formattedMins = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedMins}:${formattedSecs}`;
  };

  const handleCountChange = (num, type) => {
    switch (type) {
      case "break":
        if (breakTime + num < 1 || breakTime + num > 60) return;
        else {
          setBreakTime((prev) => prev + num);
          if (onBreak) {
            setDisplayTime((prev) => prev + num * 60);
          }
        }

        break;
      case "session":
        if (sessionTime + num < 1 || sessionTime + num > 60) return;
        setSessionTime((prev) => prev + num);
        if (!onBreak) {
          setDisplayTime((prev) => prev + num * 60);
        }

        break;
      default:
        return;
    }
  };

  const handleReset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setDisplayTime(25 * 60);
    setOnBreak(false);
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVar = onBreak;

    if (sessionTime < 1) {
      setSessionTime(1);
    }
    if (breakTime < 1) {
      setBreakTime(1);
    }
    if (displayTime < 0) {
      setDisplayTime(0);
    }

    if (timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVar) {
              playBreakSound();
              setOnBreak(true);
              return breakTime * 60;
            } else if (prev <= 0 && onBreakVar) {
              playBreakSound();
              setOnBreak(false);
              return sessionTime * 60;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }

    if (!timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  // useEffect(() => {
  //   controlTime();
  // }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>25 + 5 Clock</h1>
        <h3></h3>
        <span id="TimerContainer">
          <BreakLength
            title="Break Length"
            breakTime={breakTime}
            formatTime={formatTime}
            handleCountChange={handleCountChange}
            type="break"
            timerOn={timerOn}
          />
          <SessionLength
            title="Session Length"
            sessionTime={sessionTime}
            formatTime={formatTime}
            setDisplayTime={setDisplayTime}
            handleCountChange={handleCountChange}
            type="session"
            timerOn={timerOn}
          />
        </span>
        <Session
          timerOn={timerOn}
          setTimerOn={setTimerOn}
          formatTime={formatTime}
          displayTime={displayTime}
          handleReset={handleReset}
          controlTime={controlTime}
          onBreak={onBreak}
        />
      </header>
    </div>
  );
}

export default App;
