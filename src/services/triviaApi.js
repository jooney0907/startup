
export async function getOneQuestion() {
  await delay(200); // placeholding delay for now until we add some more things
  return null;      // adding some stuff later for trivia questions
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
