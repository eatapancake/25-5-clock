import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

function SessionLength({
  title,
  sessionTime,
  handleCountChange,
  type,
  timerOn,
}) {
  return (
    <div className="TimerItem">
      <h3 id="session-label">{title}</h3>
      <span className="length-button-row">
        <button
          className="length-item"
          id="session-decrement"
          onClick={() => handleCountChange(-1, type)}
          disabled={timerOn}
        >
          <FontAwesomeIcon className="icon-arrow" icon={faArrowDown} />
        </button>
        <p className="length-item" id="session-length">
          {sessionTime}
        </p>
        <button
          className="length-item"
          id="session-increment"
          onClick={() => handleCountChange(1, type)}
          disabled={timerOn}
        >
          <FontAwesomeIcon className="icon-arrow" icon={faArrowUp} />
        </button>
      </span>
    </div>
  );
}

export default SessionLength;
