import { createContext, useState } from "react";

const AuthContext = createContext(null);

interface props {
  children?: React.ReactNode;
}

function UserContext({ children }: props) {
  const [user, set_user] = useState({ logged_in: false });

  return (
    <AuthContext.Provider value={{ user, set_user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, UserContext };
