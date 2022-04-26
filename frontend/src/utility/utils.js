export function checkIfCorrect(submitted_ans, correct_ans) {
  return correct_ans.reduce((prev, id) => prev &&= submitted_ans.includes(id), true);
}