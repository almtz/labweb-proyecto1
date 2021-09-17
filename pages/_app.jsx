import "../scss/main.scss";
import { firebaseInit } from "../utils/firebase";
import Head from "next/head";
import { AuthContextProvider } from "../contexts/AuthContext";

firebaseInit();

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Lab Web Proyecto 1</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />;
      </AuthContextProvider>
    </>
  );
};

export default MyApp;
