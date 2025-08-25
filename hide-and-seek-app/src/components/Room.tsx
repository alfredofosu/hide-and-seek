// Room.tsx
// Renders the room structure and layout.
// Manages the visual representation of the room in the game.

import React from "react";
import type { RoomProps } from "../types";

const Room: React.FC<RoomProps> = ({ x, y, w, h, label }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={16}
      className="room-fill room-stroke"
    />
    <text
      x={x + 12}
      y={y + 24}
      style={{ fontSize: 12 }}
      className="user-select-none"
      fill="#475569"
    >
      {label}
    </text>
  </g>
);

export default Room;
