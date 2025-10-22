import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./game.css";
import { RealtimeBus, Events } from "../services/realtime.js";
import { getOneQuestion } from "../services/triviaApi.js";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function Game() {
  const navigate = useNavigate();
  const query = useQuery();
  const isHost = query.get("host") === "1";
  const room = query.get("room") || "default";

  const userName = localStorage.getItem("userName") || "Anonymous";

  const busRef = React.useRef(null);
  React.useEffect(() => {
    const bus = new RealtimeBus(room);
    busRef.current = bus;
    const unsub = bus.subscribe(handleEvent);
    return () => {
      unsub();
      bus.close();
    };
  }, [room]);

  const [question, setQuestion] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(16);
  const [locked, setLocked] = React.useState(true);
  const [selected, setSelected] = React.useState(null);
  const [correctIdx, setCorrectIdx] = React.useState(null);

  React.useEffect(() => {
    if (!question || locked) return;
    const id = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [question, locked]);

  React.useEffect(() => {
    if (timeLeft === 0) setLocked(true);
  }, [timeLeft]);

  function handleEvent(msg) {
    const { type, payload } = msg || {};
    if (type === Events.NEW_QUESTION) {
      setQuestion(payload);
      setSelected(null);
      setCorrectIdx(payload?.correctIndex ?? null);
      setLocked(false);
      setTimeLeft(16);
    } else if (type === Events.RESET) {
      softReset();
    } else if (type === Events.END) {
      navigate("/scores");
    }
  }

  function softReset() {
    setQuestion(null);
    setSelected(null);
    setCorrectIdx(null);
    setLocked(true);
    setTimeLeft(16);
  }

  async function hostSendNewQuestion() {
    const q = await getOneQuestion();
    const payload =
      q || {
        id: crypto.randomUUID(),
        prompt: "",
        answers: ["", "", "", ""],
        correctIndex: null,
        img: "einstein.jpg",
      };
    busRef.current?.send(Events.NEW_QUESTION, payload);
  }

  function endGame() {
    busRef.current?.send(Events.END, {});
    navigate("/scores");
  }

  function resetAll() {
    busRef.current?.send(Events.RESET, {});
  }

  function handleAnswer(i) {
    if (locked || !question) return;
    setSelected(i);
    setLocked(true);
  }

  const imgSrc = (question && question.img) || "einstein.jpg";

  return (
    <main className="position-relative">
      <div className="flex-row">
        <div id="picture" className="picture-box">
          <img
            width="400"
            src={imgSrc}
            alt="question"
            style={{ marginRight: "60px" }}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />
        </div>

        <div className="flex-column" style={{ gap: "0.5rem" }}>
          <h3>
            Q:{" "}
            {question ? (
              question.prompt || (
                <span className="text-secondary">(awaiting content)</span>
              )
            ) : (
              <span className="text-secondary">(3rd Party API)</span>
            )}
          </h3>

          {["A", "B", "C", "D"].map((letter, i) => {
            const isSelected = selected === i;
            const isCorrect = correctIdx === i;

            let className = "btn btn-outline-light text-start";
            if (locked && isCorrect) className = "btn btn-success text-start";
            else if (locked && isSelected && correctIdx !== null && !isCorrect)
              className = "btn btn-danger text-start";

            const label =
              question && question.answers ? (
                question.answers[i]
              ) : (
                <em className="text-secondary">answer {letter}</em>
              );

            return (
              <button
                key={letter}
                className={className}
                style={{ fontSize: "1.25rem" }}
                onClick={() => handleAnswer(i)}
                disabled={locked || !question}
              >
                <span className="fw-bold me-2">{letter}:</span> {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 mt-3">
        <h3 className="m-0">
          {question ? (
            `${timeLeft} (timer)`
          ) : (
            <span className="text-secondary">timer</span>
          )}
        </h3>

        <div className="ms-auto d-flex gap-2">
          {isHost && (
            <>
              <button className="btn btn-primary" onClick={hostSendNewQuestion}>
                New question
              </button>
              <button className="btn btn-outline-light" onClick={resetAll}>
                Reset
              </button>
            </>
          )}
          <button className="btn btn-light" onClick={endGame}>
            End game
          </button>
        </div>
      </div>
    </main>
  );
}
