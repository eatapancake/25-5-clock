import React, { useState } from "react";

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
          👇
        </button>
        <p id="session-length">{sessionTime}</p>
        <button
          className="length-item"
          id="session-increment"
          onClick={() => handleCountChange(1, type)}
          disabled={timerOn}
        >
          👆
        </button>
      </span>
    </div>
  );
}

export default SessionLength;
