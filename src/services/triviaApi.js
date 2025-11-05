const API_URL = "https://opentdb.com/api.php?amount=30&type=multiple";

let cachedQuestions = [];

async function fetchQuestions() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Trivia API HTTP error: ${res.status}`);
  }

  const data = await res.json();

  if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
    throw new Error("Trivia API returned no results");
  }

  return data.results.map((raw, index) => {
    const correct = raw.correct_answer;

    const answers = [
      ...raw.incorrect_answers.map((a) => ({ text: a, correct: false })),
      { text: correct, correct: true },
    ].sort(() => Math.random() - 0.5);

    return {
      id: index,
      question: raw.question,
      category: raw.category,
      difficulty: raw.difficulty,
      answers,
      correctAnswer: correct,
    };
  });
}

async function ensureQuestions() {
  if (cachedQuestions.length > 0) {
    return;
  }

  const fresh = await fetchQuestions();
  cachedQuestions = fresh;
}

export async function getOneQuestion() {
  await ensureQuestions();

  if (cachedQuestions.length === 0) {
    throw new Error("No trivia questions available");
  }

  const randomIndex = Math.floor(Math.random() * cachedQuestions.length);
  const question = cachedQuestions[randomIndex];

  cachedQuestions.splice(randomIndex, 1);

  return question;
}
