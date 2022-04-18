import { Expose } from "class-transformer";

export class Mneumonic {
  @Expose({ name: "mneumonic" })
  mneumonic: String; 
  @Expose({ name: "_id" })
  id: String; 
}