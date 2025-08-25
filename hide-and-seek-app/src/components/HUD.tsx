import React from "react";

interface HUDProps {
  countdown: number;
  triesLeft: number;
  message: string;
}
const HUD: React.FC<HUDProps> = ({ countdown, triesLeft, message }) => (
  <div className="card">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="text-muted small">Countdown</div>
          <div className="fw-bold display-6">{countdown}</div>
        </div>
        <div>
          <div className="text-muted small">Tries Left</div>
          <div className="fw-bold display-6">{triesLeft}</div>
        </div>
      </div>
      <div className="mt-3" style={{ minHeight: 24 }}>
        {message}
      </div>
      <ul className="mt-3 small text-muted">
        <li>
          Click <span className="fw-semibold">Start</span> — the dot roams for
          10s.
        </li>
        <li>Then it hides under one piece of furniture.</li>
        <li>
          You get <span className="fw-semibold">3</span> clicks to find it.
        </li>
      </ul>
    </div>
  </div>
);

export default HUD;
