import React, { useEffect, useMemo, useRef, useState } from 'react';
  import type { GameStatus, Point, FurnitureItem } from '../types';
  import { rand, clamp, pointInRect, dist } from '../utils/geo';
  import { FUNNY_MISSES } from '../constants/messages';
  import Board from '../components/Board';
  import Controls from '../components/Controls';
  import HUD from '../components/HUD';
  import Tips from '../components/Tips';
  import { roomsData, WIDTH, HEIGHT } from '../data/rooms';

  const useObjects = (): FurnitureItem[] =>
    useMemo(
      () => [
        { id: 'table', label: 'Dining Table', x: 110, y: 80, w: 130, h: 70 },
        { id: 'sofa', label: 'Sofa', x: 460, y: 60, w: 170, h: 60 },
        { id: 'cabinet', label: 'Cabinet', x: 520, y: 280, w: 120, h: 70 },
        { id: 'coffee', label: 'Coffee Table', x: 260, y: 235, w: 100, h: 55 },
        { id: 'desk', label: 'Desk', x: 150, y: 290, w: 120, h: 60 },
      ],
      []
    );

  export default function HideAndSeekGame(): JSX.Element {
    const objects = useObjects();

    const [status, setStatus] = useState<GameStatus>('idle');
    const [countdown, setCountdown] = useState<number>(10);
    const [triesLeft, setTriesLeft] = useState<number>(3);
    const [message, setMessage] = useState<string>('Click Start to play hide & seek!');

    const [dot, setDot] = useState<Point>({ x: 60, y: 60 });
    const [hidden, setHidden] = useState<(Point & { objectId: string }) | null>(null);

    const moveTimerRef = useRef<number | null>(null);
    const countTimerRef = useRef<number | null>(null);

    const clearTimers = () => {
      if (moveTimerRef.current !== null) {
        clearInterval(moveTimerRef.current);
        moveTimerRef.current = null;
      }
      if (countTimerRef.current !== null) {
        clearInterval(countTimerRef.current);
        countTimerRef.current = null;
      }
    };

    const resetGame = () => {
      clearTimers();
      setStatus('idle');
      setCountdown(10);
      setTriesLeft(3);
      setMessage('Click Start to play hide & seek!');
      setDot({ x: 60, y: 60 });
      setHidden(null);
    };

    const start = () => {
      if (status === 'counting' || status === 'guessing') return;
      clearTimers();
      setStatus('counting');
      setCountdown(10);
      setTriesLeft(3);
      setMessage("I'm running around… get ready! ⏳");
      setHidden(null);

      // Random wandering movement (every 180ms)
      moveTimerRef.current = window.setInterval(() => {
        setDot((p) => {
          const step = 22;
          const nx = clamp(p.x + rand(-step, step), 10, WIDTH - 10);
          const ny = clamp(p.y + rand(-step, step), 10, HEIGHT - 10);
          return { x: nx, y: ny };
        });
      }, 180);

      // Countdown per second
      countTimerRef.current = window.setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearTimers();
            const obj = objects[Math.floor(Math.random() * objects.length)];
            const hx = rand(obj.x + 8, obj.x + obj.w - 8);
            const hy = rand(obj.y + 8, obj.y + obj.h - 8);
            setHidden({ x: hx, y: hy, objectId: obj.id });
            setStatus('guessing');
            setMessage("I'm hidden! You have 3 guesses. Click the map.");
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    };

    const handleGuess = (p: Point) => {
      if (status !== 'guessing' || !hidden) return;

      const obj = objects.find((o) => o.id === hidden.objectId)!;
      const hitRadius = 22;
      const isInRect = pointInRect(p.x, p.y, { x: obj.x, y: obj.y, w: obj.w, h: obj.h });
      const isNear = dist(p, hidden) <= hitRadius;

      if (isInRect || isNear) {
        setStatus('found');
        setMessage('🎉 Found You!');
        setDot({ x: hidden.x, y: hidden.y });
        setTimeout(() => {
          const again = window.confirm('Found You! Play again?');
          if (again) resetGame();
        }, 30);
        return;
      }

      const next = triesLeft - 1;
      setTriesLeft(next);
      setMessage(
        (FUNNY_MISSES[Math.floor(Math.random() * FUNNY_MISSES.length)] || 'Nope!') +
          (next > 0 ? ` — ${next} ${next === 1 ? 'try' : 'tries'} left.` : '')
      );

      if (next <= 0) {
        setStatus('lost');
        setDot({ x: hidden.x, y: hidden.y });
        setTimeout(() => {
          const again = window.confirm('Out of tries! Want to play again?');
          if (again) resetGame();
        }, 60);
      }
    };

    useEffect(() => () => clearTimers(), []);

    return (
      <div className="container py-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-3">
          <div>
            <h1 className="h3 mb-1">Hide & Seek</h1>
            <p className="text-muted mb-0">Find the dot hiding under the furniture!</p>
          </div>
          <Controls status={status} onStart={start} onReset={resetGame} />
        </div>

        <div className="row g-3 align-items-start">
          <div className="col-sm-8">
            <Board
              width={WIDTH}
              height={HEIGHT}
              rooms={roomsData}
              objects={objects}
              dot={dot}
              status={status}
              onGuess={handleGuess}
            />
          </div>
          <div className="col-sm-4">
            <div className="d-flex flex-column gap-3">
              <HUD countdown={countdown} triesLeft={triesLeft} message={message} />
              <Tips />
            </div>
          </div>
        </div>
      </div>
    );
  }