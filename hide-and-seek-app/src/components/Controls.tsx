// Controls.tsx
// Provides UI controls for the game, such as buttons for starting, pausing, or resetting.
// Manages user input for game actions.

import React from "react";
import type { GameStatus } from "../types";

interface ControlsProps {
  status: GameStatus;
  onStart: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ status, onStart, onReset }) => (
  <div className="d-flex gap-2">
    <button
      onClick={onStart}
      disabled={status === "counting"}
      className="btn btn-success"
    >
      {status === "counting" ? "Running…" : "Start"}
    </button>
    <button onClick={onReset} className="btn btn-secondary">
      Reset
    </button>
  </div>
);

export default Controls;
