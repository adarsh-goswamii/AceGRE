export function checkIfCorrect(submitted_ans, correct_ans) {
  if (!submitted_ans || !correct_ans) return false;
  if (submitted_ans.length !== correct_ans.length) return false;
  return correct_ans.reduce(
    (prev, id) => (prev &&= submitted_ans.includes(id)),
    true
  );
}

export const generateRandomPassword = () => {
  let password = "";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = lowercase.toLocaleUpperCase();
  const digits = "0123456789";

  for (let i = 0; i < 10; i++) {
    let c = "";
    if (i < 5) c = lowercase.charAt(generateRandomNumber(lowercase.length));
    else if (i < 8)
      c = uppercase.charAt(generateRandomNumber(uppercase.length));
    else c = digits.charAt(generateRandomNumber(digits.length));

    password += c;
  }

  return password;
};

export const generateRandomNumber = (max = 10) => {
  return Math.floor(Math.random() * max);
};

export const getTimeStamp = () => {
  const date = new Date();
  return date.getTime();
};
