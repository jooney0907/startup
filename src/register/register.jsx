import React from 'react';
import './about.css'
export function About() {
  return (
  <main className="container text-center my-4">
    <div id="picture" className="picture-box mb-4">
      <img src="quiz.jpg" alt="Trivia game" className="img-fluid rounded shadow" style="max-width:400px;" />
    </div>

    <p className="lead">
      Quiztopia is a multiplayer trivia game where players can compete in real time.
      Trivia as a game format has been popular since the 20th century, and Quiztopia
      brings that tradition into a fun, competitive online space. Challenge friends and
      family and see who can answer the most questions!
    </p>
  </main>
  );
}