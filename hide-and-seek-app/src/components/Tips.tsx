import React from "react";

const Tips: React.FC = () => (
  <div className="card">
    <div className="card-body">
      <div className="fw-semibold mb-2">Tips</div>
      <ul className="small mb-0">
        <li>Clicks inside the furniture count as a hit.</li>
        <li>Clicks near the exact spot also count (small radius).</li>
        <li>Use Reset anytime to start fresh.</li>
      </ul>
    </div>
  </div>
);

export default Tips;
