import React from "react";
import "./game.css";
import { useNavigate } from "react-router-dom";
import { getOneQuestion } from "../services/triviaApi.js";
import { submitScore } from "../services/authClient.js";
import { Players } from "./players";                 // NEW
import { GameEvent, GameNotifier } from "./gameNotifier"; // NEW

export function Game() {
  const navigate = useNavigate();

  const [question, setQuestion] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [score, setScore] = React.useState(0);
  const [questionsAnswered, setQuestionsAnswered] = React.useState(0);

  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");

  const [userName, setUserName] = React.useState("Player"); // NEW

  // NEW: derive display name once
  React.useEffect(() => {
    const raw =
      localStorage.getItem("userName") ||
      localStorage.getItem("userEmail") ||
      "Player";
    setUserName(raw);
  }, []);

  // NEW: broadcast join / leave
  React.useEffect(() => {
    if (!userName) return;

    GameNotifier.broadcastEvent(
      userName,
      GameEvent.System,
      { msg: "joined the lobby" }
    );

    return () => {
      GameNotifier.broadcastEvent(
        userName,
        GameEvent.System,
        { msg: "left the lobby" }
      );
    };
  }, [userName]);

  async function loadQuestion() {
    try {
      setError("");
      setLoading(true);
      const q = await getOneQuestion();
      setQuestion(q);
    } catch (err) {
      console.error(err);
      setError("Failed to load trivia question.");
      setQuestion(null);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadQuestion();
  }, []);

  function handleAnswerClick(answer) {
    if (!question) return;

    if (answer.correct) {
      setScore((prev) => prev + 1);
      alert("Correct!");
    } else {
      alert(`Wrong! Correct answer was: ${question.correctAnswer}`);
    }

    setQuestionsAnswered((prev) => prev + 1);
    loadQuestion();
  }

  async function handleEndGame() {
    const rawName = localStorage.getItem("userName") || "Anonymous";
    const name = rawName.split("@")[0];
    const payload = {
      name,
      score,
      date: new Date().toLocaleDateString(),
    };

    try {
      setSaveError("");
      setSaving(true);
      await submitScore(payload);
      navigate("/scores");
    } catch (err) {
      console.error(err);
      setSaveError(
        err.message || "Could not save score. Make sure you are logged in."
      );
    } finally {
      setSaving(false);
    }
  }

  if (error) {
    return (
      <main className="game-page">
        <Players userName={userName} /> {/* NEW */}
        <section className="game-card text-center">
          <p>{error}</p>
          <button className="btn btn-primary mt-3" onClick={loadQuestion}>
            Try again
          </button>
        </section>
      </main>
    );
  }

  if (loading || !question) {
    return (
      <main className="game-page">
        <Players userName={userName} /> {/* NEW */}
        <section className="game-card text-center">
          <p>Loading question...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="game-page">
      <Players userName={userName} /> {/* NEW */}
      <section className="game-card">
        <header className="game-header">
          <h2 className="game-title">Quiztopia</h2>
          <div className="game-scoreboard">
            <div>
              Score: <strong>{score}</strong>
            </div>
            <div>
              Questions answered: <strong>{questionsAnswered}</strong>
            </div>
          </div>
        </header>

        <section className="game-question">
          <h3
            className="game-question-text"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />
          <p className="game-meta">
            Category: {question.category} &nbsp;|&nbsp; Difficulty:{" "}
            {question.difficulty}
          </p>
        </section>

        <ul className="answer-list">
          {question.answers.map((a, index) => (
            <li key={index}>
              <button
                className="answer-button"
                onClick={() => handleAnswerClick(a)}
                dangerouslySetInnerHTML={{ __html: a.text }}
              />
            </li>
          ))}
        </ul>

        <div className="endgame-footer">
          {saveError && <p className="endgame-error">{saveError}</p>}
          <button
            className="endgame-button"
            onClick={handleEndGame}
            disabled={saving}
          >
            {saving ? "Saving score..." : "End game & save score"}
          </button>
        </div>
      </section>
    </main>
  );
}
