import { getAuth } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthServices } from "../services/AuthServices";
import nookies from "nookies";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const logInWithGoogle = async () => {
    await AuthServices.logInWithGoogle();
  };

  const logOut = async () => {
    await AuthServices.logOut();
    setUser(null);
  };

  // Listens for the changed in auth token from firebase
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  // Force the refresh of the token cookie depending on firebase session refresh
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getAuth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
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
  return { ...auth, isAuthenticated: auth.user !== undefined };
};
