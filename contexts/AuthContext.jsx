import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthServices } from "../services/AuthServices";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const logInWithGoogle = async () => {
    const { error, user } = await AuthServices.logInWithGoogle();
    setUser(user ?? null);
    setError(error ?? "");
  };

  const logOut = async () => {
    await AuthServices.logOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, error, logInWithGoogle, logOut }}
      {...props}
    />
  );
};

export const useFirebaseAuth = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != undefined };
};
