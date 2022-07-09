import React from "react";
import "./Length.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

function BreakLength({ title, breakTime, handleCountChange, type, timerOn }) {
  return (
    <div className="TimerItem">
      <h3 id="break-label">{title}</h3>
      <span className="length-button-row">
        <button
          id="break-decrement"
          className="length-item"
          onClick={() => handleCountChange(-1, type)}
          disabled={timerOn}
        >
          <FontAwesomeIcon className="icon-arrow" icon={faArrowDown} />
        </button>
        <p className="length-item" id="break-length">
          {breakTime}
        </p>
        <button
          id="break-increment"
          className="length-item"
          onClick={() => handleCountChange(1, type)}
          disabled={timerOn}
        >
          <FontAwesomeIcon className="icon-arrow" icon={faArrowUp} />
        </button>
      </span>
    </div>
  );
}

export default BreakLength;
