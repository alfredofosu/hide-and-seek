// Board.tsx
// Renders the main game board, including the room layout and interactive elements.
// Handles drawing and user interactions within the game area.

import React from "react";
import type { Point, GameStatus, FurnitureItem, RoomProps } from "../types";
import SvgDefs from "./SvgDefs";
import Room from "./Room";
import Furniture from "./Furniture";

interface BoardProps {
  width: number;
  height: number;
  rooms: Array<RoomProps>;
  objects: FurnitureItem[];
  dot: Point;
  status: GameStatus;
  onGuess: (p: Point) => void;
}

const Board: React.FC<BoardProps> = ({
  width,
  height,
  rooms,
  objects,
  dot,
  status,
  onGuess,
}) => {
  const handleClick: React.MouseEventHandler<SVGSVGElement> = (evt) => {
    const svg = evt.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const inv = ctm.inverse();
    const sp = pt.matrixTransform(inv);
    onGuess({ x: sp.x, y: sp.y });
  };

  return (
    <div className="card">
      <div className="card-body p-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          onClick={handleClick}
          role="img"
          aria-label="Hide and seek floor plan"
          style={{ width: "100%", height: 380, cursor: "crosshair" }}
        >
          <SvgDefs />
          {/* Floor background */}
          <rect x={0} y={0} width={width} height={height} fill="#e0f2fe" />

          {/* Rooms */}
          {rooms.map((r, i) => (
            <Room key={`room-${i}`} {...r} />
          ))}

          {/* Furniture */}
          {objects.map((o) => (
            <Furniture
              key={o.id}
              rect={{ x: o.x, y: o.y, w: o.w, h: o.h }}
              label={o.label}
            />
          ))}

          {/* Seeker dot */}
          {(status === "counting" ||
            status === "found" ||
            status === "lost") && (
            <g>
              <circle
                cx={dot.x}
                cy={dot.y}
                r={10}
                className="dot-fill"
                stroke="#ffffff"
              />
            </g>
          )}

          {/* Subtle grid */}
          <g opacity={0.06}>
            {Array.from({ length: Math.floor(width / 20) }).map((_, i) => (
              <line
                key={`vx${i}`}
                x1={i * 20}
                y1={0}
                x2={i * 20}
                y2={height}
                stroke="black"
              />
            ))}
            {Array.from({ length: Math.floor(height / 20) }).map((_, i) => (
              <line
                key={`hy${i}`}
                x1={0}
                y1={i * 20}
                x2={width}
                y2={i * 20}
                stroke="black"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Board;
