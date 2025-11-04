import React from "react";
import "./game.css";
import { getOneQuestion } from "../services/triviaApi.js";

export function Game() {
  const [question, setQuestion] = React.useState(null);
  const [error, setError] = React.useState("");

  async function loadQuestion() {
    try {
      setError("");
      const q = await getOneQuestion();
      console.log("Loaded question:", q);  // 👈 check DevTools to see it's working
      setQuestion(q);
    } catch (err) {
      console.error(err);
      setError("Failed to load trivia question.");
    }
  }

  React.useEffect(() => {
    loadQuestion();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <main className="game-container">
      <h2>Trivia</h2>

      {/* OpenTDB returns HTML entities, so use dangerouslySetInnerHTML */}
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      <ul className="answers">
        {question.answers.map((a, idx) => (
          <li key={idx}>
            <button
              className="answer-button"
              onClick={() => {
                if (a.correct) {
                  alert("Correct!");
                } else {
                  alert(`Wrong! Correct answer was: ${question.correctAnswer}`);
                }
                // after answering, load a fresh random question
                loadQuestion();
              }}
              dangerouslySetInnerHTML={{ __html: a.text }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
