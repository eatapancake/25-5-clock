import React, { useState } from "react";
import "./Length.css";

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
          👇
        </button>
        <p id="break-length">{breakTime}</p>
        <button
          id="break-increment"
          className="length-item"
          onClick={() => handleCountChange(1, type)}
          disabled={timerOn}
        >
          👆
        </button>
      </span>
    </div>
  );
}

export default BreakLength;
