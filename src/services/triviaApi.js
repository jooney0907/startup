// src/services/triviaApi.js

const API_URL = 'https://opentdb.com/api.php?amount=30&type=multiple';

/**
 * Fetch 30 questions from OpenTDB and normalize them
 */
export async function fetchQuestions() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Trivia API HTTP error: ${res.status}`);
  }

  const data = await res.json();

  if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
    throw new Error('Trivia API returned no results');
  }

  // Normalize each question into a nice shape
  return data.results.map((raw, index) => {
    const correct = raw.correct_answer;

    // Combine incorrect + correct answers, then shuffle
    const answers = [
      ...raw.incorrect_answers.map(a => ({ text: a, correct: false })),
      { text: correct, correct: true },
    ].sort(() => Math.random() - 0.5);

    return {
      id: index,
      question: raw.question,          // still HTML-encoded from API
      category: raw.category,
      difficulty: raw.difficulty,
      answers,                         // [{ text, correct }, ...]
      correctAnswer: correct,
    };
  });
}

/**
 * Convenience helper if your code is expecting getOneQuestion()
 * Returns ONE random question from the 30.
 */
export async function getOneQuestion() {
  const questions = await fetchQuestions();
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}
