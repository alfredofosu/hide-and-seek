// Furniture.tsx
// Displays furniture items within the room.
// Handles rendering and positioning of furniture objects on the board.

import React from "react";
import type { Rect } from "../types";

interface FurnitureProps {
  rect: Rect;
  label: string;
}
const Furniture: React.FC<FurnitureProps> = ({ rect, label }) => (
  <g>
    <rect
      x={rect.x}
      y={rect.y}
      width={rect.w}
      height={rect.h}
      rx={10}
      className="furn-fill furn-stroke"
    />
    <text
      x={rect.x + rect.w / 2}
      y={rect.y + rect.h / 2}
      textAnchor="middle"
      dominantBaseline="central"
      className="user-select-none furn-text"
      style={{ fontSize: 11 }}
    >
      {label}
    </text>
  </g>
);

export default Furniture;
