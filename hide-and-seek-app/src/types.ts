export type GameStatus = "idle" | "counting" | "guessing" | "found" | "lost";

export interface Point {
  x: number;
  y: number;
}
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface FurnitureItem extends Rect {
  id: string;
  label: string;
}

export type RoomProps = Rect & { label: string };
