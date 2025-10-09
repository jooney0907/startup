import React from "react";
export function Lobby() {
  return (
<main className="container text-center py-5 lobby-main">
  <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
    <h2 className="m-0">Lobby</h2>
    <h2 className="m-0"><strong>12</strong> Players</h2>
  </div>

  <section>
    <ul id="player-list" class="row list-unstyled">
      <li className="col-4 mb-3">Timmy</li>
      <li className="col-4 mb-3">Jeff</li>
      <li className="col-4 mb-3">Sangjoon</li>
      <li className="col-4 mb-3">Carlos</li>
      <li className="col-4 mb-3">Tyler</li>
      <li className="col-4 mb-3">Alyssa</li>
      <li className="col-4 mb-3">Christian</li>
      <li className="col-4 mb-3">Abigail</li>
      <li className="col-4 mb-3">Emma</li>
      <li className="col-4 mb-3">Gwen</li>
      <li className="col-4 mb-3">Izzy</li>
      <li className="col-4 mb-3">Emily</li>
    </ul>

    <a href="game.html">
      <button class="btn btn-primary mt-3">Start game</button>
    </a>
  </section>
</main>
  );
}
