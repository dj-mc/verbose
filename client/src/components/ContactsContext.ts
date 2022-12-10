import { createContext } from "react";

export interface IContact {
  username: string;
  contact_id: string;
  online: boolean;
}

const ContactsContext = createContext(null);

export default ContactsContext;
