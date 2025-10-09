import React from 'react';
import './lobby.css'
export function Lobby() {
  return (
<main class="container text-center py-5 lobby-main">
  <div class="d-flex justify-content-center align-items-center mb-4 gap-3">
    <h2 class="m-0">Lobby</h2>
    <h2 class="m-0"><strong>12</strong> Players</h2>
  </div>

  <section>
    <ul id="player-list" class="row list-unstyled">
      <li class="col-4 mb-3">Timmy</li>
      <li class="col-4 mb-3">Jeff</li>
      <li class="col-4 mb-3">Sangjoon</li>
      <li class="col-4 mb-3">Carlos</li>
      <li class="col-4 mb-3">Tyler</li>
      <li class="col-4 mb-3">Alyssa</li>
      <li class="col-4 mb-3">Christian</li>
      <li class="col-4 mb-3">Abigail</li>
      <li class="col-4 mb-3">Emma</li>
      <li class="col-4 mb-3">Gwen</li>
      <li class="col-4 mb-3">Izzy</li>
      <li class="col-4 mb-3">Emily</li>
    </ul>

    <a href="game.html">
      <button class="btn btn-primary mt-3">Start game</button>
    </a>
  </section>
</main>
  );
}