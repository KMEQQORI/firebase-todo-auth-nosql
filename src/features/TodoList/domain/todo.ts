import { todoStatus } from "./todoStatus";

export interface Todo {
  id?: string;
  userId: string;
  text: string;
  status: todoStatus;
}
