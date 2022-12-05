import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

interface props {
  children?: React.ReactNode;
}

function UserContext({ children }: props) {
  const [user, set_user] = useState({ logged_in: null });
  const navigate = useNavigate();

  useEffect(() => {
    // Request if a user is already logged in
    fetch("http://localhost:4242/auth/login", {
      credentials: "include",
    })
      .catch((error) => {
        console.error(error);
        set_user({ logged_in: false });
        return;
      })

      .then((response) => {
        if (!response || !response.ok || response.status >= 400) {
          set_user({ logged_in: false });
          return; // Bad server response
        } else {
          return response.json(); // Return then-able promise
        }
      })

      .then((data) => {
        if (!data) {
          set_user({ logged_in: false });
        } else {
          set_user({ ...data });
          // Logged in user found, so
          // navigate to their dashboard
          // instead of the login page
          navigate("/dashboard");
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, set_user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default UserContext;
