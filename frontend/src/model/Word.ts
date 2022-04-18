import { Expose, Type } from "class-transformer";
import { Mneumonic } from "./Mneumonic";
import { Meaning } from "./Meaning";
import { Sentence } from "./Sentence";

export class Word {
  @Expose({ name: "_id" })
  id: String;
  @Expose({ name: "title" })
  title: String;
  @Expose({ name: "status" })
  status: number;
  @Expose({ name: "sentences" })
  sentences: [Sentence];
  @Expose({ name: "func_fact" })
  funFact: String;
  @Expose({ name: "meanings" })
  meanings: [Meaning];
  @Expose({ name: "mneumonics" })
  mneumonics: [Mneumonic];
  @Expose({ name: "date_added" })
  dateAdded: String;
}