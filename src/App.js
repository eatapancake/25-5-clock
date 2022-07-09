import { useEffect, useState } from "react";
import BreakLength from "./components/BreakLength.js";
import SessionLength from "./components/SessionLength";
import beep from "./beep.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function Session({
  timerOn,
  formatTime,
  displayTime,
  handleReset,
  onBreak,
  handlePlay,
}) {
  const playIcon = <FontAwesomeIcon className="icon" icon={faPlay} />;
  const pauseIcon = <FontAwesomeIcon className="icon" icon={faPause} />;
  const refreshIcon = (
    <FontAwesomeIcon className="icon" icon={faArrowsRotate} />
  );
  return (
    <div id="display-container">
      <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
      <p id="time-left">{formatTime(displayTime)}</p>
      <span>
        <button id="start_stop" onClick={handlePlay}>
          {!timerOn ? playIcon : pauseIcon}
        </button>
        <button id="reset" onClick={handleReset}>
          {refreshIcon}
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
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

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
    clearTimeout(timeout);
    setTimerOn(false);
    setDisplayTime(1500);
    setBreakTime(5);
    setSessionTime(25);
    setOnBreak(false);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const timeout = () =>
    setTimeout(() => {
      if (displayTime > 0 && timerOn) {
        setDisplayTime((prev) => prev - 1);
      }
    }, 1000);

  const handlePlay = () => {
    clearTimeout(timeout());
    setTimerOn(!timerOn);
  };

  useEffect(() => {
    const clock = () => {
      if (timerOn) {
        timeout();
        resetTimer();
      } else {
        clearTimeout(timeout);
      }
    };

    const resetTimer = () => {
      const audio = document.getElementById("beep");

      if (sessionTime < 0) {
        setSessionTime(1);
        if (!onBreak) setDisplayTime(1);
      }
      if (sessionTime > 60) {
        setSessionTime(60);
        if (!onBreak) setDisplayTime(60);
      }
      if (breakTime > 60) {
        setBreakTime(60);
        if (onBreak) setDisplayTime(60);
      }
      if (breakTime < 0) {
        setBreakTime(1);
        if (onBreak) setDisplayTime(1);
      }
      if (displayTime <= 0 && !onBreak) {
        setDisplayTime(breakTime * 60);
        setOnBreak(true);
        audio.volume = 0.2;
        audio.play();
      }
      if (displayTime <= 0 && onBreak) {
        setDisplayTime(sessionTime * 60);
        setOnBreak(false);
        audio.volume = 0.2;
        audio.play();
      }
    };
    clock();

    console.log("timer On: " + timerOn);
  }, [timerOn, displayTime, onBreak, breakTime, sessionTime]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>♥ 25 + 5 Clock ♥</h1>
        <Session
          timerOn={timerOn}
          formatTime={formatTime}
          displayTime={displayTime}
          handleReset={handleReset}
          handlePlay={handlePlay}
          onBreak={onBreak}
        />

        <span id="TimerContainer">
          <BreakLength
            title="Break Length"
            breakTime={breakTime}
            type="break"
            timerOn={timerOn}
          />
          <SessionLength
            title="Session Length"
            sessionTime={sessionTime}
            handleCountChange={handleCountChange}
            type="session"
            timerOn={timerOn}
          />
        </span>
      </header>
      <audio
        id="beep"
        preload="auto"
        // src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        src={beep}
        volume={0.25}
      ></audio>
    </div>
  );
}

export default App;
