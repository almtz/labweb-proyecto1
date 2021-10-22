import "../scss/main.scss";
import { app } from "../utils/firebase";
import Head from "next/head";
import { AuthContextProvider } from "../context/AuthContext";

app;

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
};

export default MyApp;
