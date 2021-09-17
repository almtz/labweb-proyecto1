import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

export const AuthServices = {
  logInWithGoogle: async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        return {
          user: user,
          token: token,
        };
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        return {
          errorCode: errorCode,
          error: errorMessage,
        };
      });
  },
  logInWithEmail: async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },
  logOut: async () => {
    await getAuth().signOut();
  },
};
