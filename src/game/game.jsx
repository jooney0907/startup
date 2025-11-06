import React from "react";
import "./game.css";
import { getOneQuestion } from "../services/triviaApi.js";

export function Game() {
  const [question, setQuestion] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [score, setScore] = React.useState(0);
  const [questionsAnswered, setQuestionsAnswered] = React.useState(0);

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

  if (error) {
    return (
      <main className="game-page">
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
        <section className="game-card text-center">
          <p>Loading question...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="game-page">
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
      </section>
    </main>
  );
}
