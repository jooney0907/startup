import React from "react";
import { NavLink } from "react-router-dom";
import "./scores.css";
import { fetchScores } from "../services/authClient.js";

export function Scores() {
  const [scores, setScores] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    async function loadScores() {
      try {
        setError("");
        const serverScores = await fetchScores();
        setScores(serverScores || []);
      } catch (err) {
        console.error(err);
        if (err.message.includes("Unauthorized")) {
          setError("You must be logged in to view high scores.");
        } else {
          setError("Failed to load scores.");
        }
        setScores([]);
      }
    }
    loadScores();
  }, []);

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
      <h2 className="my-3">High Scores</h2>

      {error && <div className="alert alert-warning">{error}</div>}

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

