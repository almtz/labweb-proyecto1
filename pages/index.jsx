import { useFirebaseAuth } from "../contexts/AuthContext";

const Home = () => {
  const { logOut } = useFirebaseAuth();
  return <button onClick={logOut}>Log Out</button>;
};

export default Home;
