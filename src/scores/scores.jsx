import React from "react";
import { NavLink } from "react-router-dom";
import "./scores.css";

export function Scores() {
  const [scores, setScores] = React.useState([]);

  // Load scores from localStorage (same storage key/shape as Simon)
  React.useEffect(() => {
    const scoresText = localStorage.getItem("scores");
    if (scoresText) {
      try {
        setScores(JSON.parse(scoresText));
      } catch {
        // If something weird is in localStorage, reset gracefully
        setScores([]);
      }
    }
  }, []);

  // Build rows dynamically; show a friendly empty state if none
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.name?.split("@")[0] ?? "Anonymous"}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key="empty">
        <td colSpan="4">Be the first to score</td>
      </tr>
    );
  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <table className="table table-dark table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id="scores">{scoreRows}</tbody>
      </table>

      <NavLink to="/" className="btn btn-light">
        New Game
      </NavLink>
    </main>
  );
}
