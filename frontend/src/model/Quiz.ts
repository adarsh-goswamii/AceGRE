import { Expose } from "class-transformer";

export class Option {
  @Expose({ name: "meaning" })
  meaning: String; 
  @Expose({ name: "id" })
  id: String;
}

export class Quiz {
  @Expose({ name: "word" })
  word: String; 
  @Expose({ name: "options" })
  options: Array<Option>;
}