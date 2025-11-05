// src/services/triviaApi.js

const API_URL = "https://opentdb.com/api.php?amount=30&type=multiple";

// Cache questions so we don't have to hit the API on every click
let cachedQuestions = [];

/**
 * Fetch a fresh batch of questions from Open Trivia DB
 */
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
      // incorrect answers
      ...raw.incorrect_answers.map((a) => ({ text: a, correct: false })),
      // correct one
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

/**
 * Ensure we have a batch of questions in cache
 */
async function ensureQuestions() {
  if (cachedQuestions.length > 0) {
    return;
  }

  const fresh = await fetchQuestions();
  cachedQuestions = fresh;
}

/**
 * Get a single random question from cache.
 * If cache is empty, fetch a new batch first.
 */
export async function getOneQuestion() {
  await ensureQuestions();

  if (cachedQuestions.length === 0) {
    throw new Error("No trivia questions available");
  }

  // Pick a random question
  const randomIndex = Math.floor(Math.random() * cachedQuestions.length);
  const question = cachedQuestions[randomIndex];

  // Remove it from the cache so it doesn’t repeat too fast
  cachedQuestions.splice(randomIndex, 1);

  return question;
}
