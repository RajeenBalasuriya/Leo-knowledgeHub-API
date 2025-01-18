export interface IUser {
    id?: string;   // Optional as MongoDB generates it automatically
    name: string;
    email: string;
    password:string;
    role: string;
    createdAt?: Date;   // Optional, as it has a default value
  }