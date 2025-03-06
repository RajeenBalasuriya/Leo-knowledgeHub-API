import { Action } from "src/enums/action.enum";

  export interface IPolicy {
    action: Action;
    subject: string;
    fields?: string[];
  }
