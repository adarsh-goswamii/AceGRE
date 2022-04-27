import { Expose } from "class-transformer";
import { Option } from "./Quiz";

class QuizQuestion {
  @Expose({ name: "id"})
  id: String;
  @Expose({ name: "word" })
  word: String;
  @Expose({ name: "options" })
  options: Option;
  @Expose({ name: "correct_ans"})
  correctAns: [String]
  @Expose({ name: "submitted_ans" })
  submittedAns: [String]
};

export default QuizQuestion;
