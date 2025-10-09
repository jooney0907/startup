import React from "react";
import { NavLink } from "react-router-dom";

export function Game() {
  return (
    <main>
      <div className="flex-row">
        <div id="picture" className="picture-box">
          <img
            width="400px"
            src="einstein.jpg"
            alt="random"
            style={{ marginRight: "60px" }}
          />
        </div>
        <div className="flex-column">
          <h3>Q: Who was the first President of the United States?</h3>
          <h2>A:</h2>
          <h2>B:</h2>
          <h2>C:</h2>
          <h2>D:</h2>
        </div>
      </div>

      <h3>16 (timer)</h3>
      <NavLink to="/scores" className="btn btn-light">
        End game
      </NavLink>
    </main>
  );
}
