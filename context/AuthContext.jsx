import { auth } from "../utils/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthServices } from "../services/AuthServices";
import nookies from "nookies";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logInWithGoogle = async () => {
    await AuthServices.logInWithGoogle();
  };

  const logInWithEmailAndPassword = async (email, pass) => {
    await AuthServices.logInWithEmail(email, pass);
  };

  const logOut = async () => {
    await AuthServices.logOut();
    setUser(null);
  };

  // Listens for the changed in auth token from firebase
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }
      if (!user) {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isAuthenticated,
        logInWithGoogle,
        logInWithEmailAndPassword,
        logOut,
      }}
      {...props}
    />
  );
};

export const useFirebaseAuth = () => {
  const auth = useContext(AuthContext);
  return { ...auth };
};
