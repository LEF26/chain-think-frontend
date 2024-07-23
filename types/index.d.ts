import { Dispatch, SetStateAction } from "react";

//Task Types
type TaskType =
  | "Follow an account"
  | "Comment on Post"
  | "Like a Post"
  | "Suscribe to a channel"
  | "Watch a Youtube Video"
  | "Comment on Youtube Video"
  | "Like a Youtube Video";

export interface Task {
  id: string;
  type: TaskType;
  description: string;
}

//User Module Types
type Token = string;

export type User = {
  id: string;
  email: string;
  password: string;
  full_name:string,
  bank_account_number: string
  tron: string;
  eth: string;
  bsc: string;
};

export interface AuthenticationType {
  token: Token;
  user: User;
}

//ComponentsTypes
export interface FormButtonType {
  loading: boolean;
  onClick?: null | (() => void);
  text: string;
}

interface AuthContextType {
  authDetails: AuthenticationType | null;
  setAuthDetails: Dispatch<SetStateAction<AuthenticationType | null>>;
}

export type ErrorType = {
  message: string;
  error: string;
} | null;

export type StateErrorType = Dispatch<SetStateAction<ErrorType | null>>;
