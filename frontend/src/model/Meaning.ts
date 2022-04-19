import { Expose } from "class-transformer";

export class Meaning {
  @Expose({ name: "meaning" })
  meaning: String; 
  @Expose({ name: "_id" })
  id: String; 
}