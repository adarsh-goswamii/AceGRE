import { Expose } from "class-transformer";

export class Sentence {
  @Expose({ name: "sentence" })
  sentence: String; 
  @Expose({ name: "_id" })
  id: String; 
}