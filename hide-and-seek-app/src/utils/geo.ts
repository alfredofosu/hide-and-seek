import type { Point, Rect } from "../types";

export const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;
export const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export const pointInRect = (px: number, py: number, rect: Rect) =>
  px >= rect.x &&
  px <= rect.x + rect.w &&
  py >= rect.y &&
  py <= rect.y + rect.h;

export const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
