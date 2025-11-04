// src/services/triviaApi.js
export async function getQuestions(amount = 30) {
  const res = await fetch(`https://opentdb.com/api.php?amount=${amount}`);
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  const data = await res.json();
  if (data.response_code !== 0) {
    throw new Error(`OpenTDB error code ${data.response_code}`);
  }

  return data.results; // array of { question, correct_answer, incorrect_answers, ... }
}
