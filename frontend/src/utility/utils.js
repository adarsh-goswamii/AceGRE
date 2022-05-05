export function checkIfCorrect(submitted_ans, correct_ans) {
  if (!submitted_ans || !correct_ans) return false;
  if (submitted_ans.length !== correct_ans.length) return false;
  return correct_ans.reduce(
    (prev, id) => (prev &&= submitted_ans.includes(id)),
    true
  );
}
