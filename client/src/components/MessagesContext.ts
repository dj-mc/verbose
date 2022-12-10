import { createContext } from "react";

export interface IMessage {
  to: string;
  from: string;
  content: string;
}

const MessagesContext = createContext(null);

export default MessagesContext;
