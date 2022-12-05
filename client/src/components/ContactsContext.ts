import { createContext } from "react";

export interface IContact {
  username: string;
  online: boolean;
}

const ContactsContext = createContext(null);

export default ContactsContext;
