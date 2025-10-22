// src/services/triviaApi.js
// Placeholder that returns NO real data yet.
// Later: fetch from your 3rd-party API and adapt to this shape:
/*
  {
    id: string,
    prompt: string,
    answers: string[4],      // A,B,C,D
    correctIndex: 0|1|2|3,   // or null if unknown
    img?: string             // optional
  }
*/

export async function getOneQuestion() {
  await delay(200); // tiny fake latency
  return null;      // intentionally empty for now
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
