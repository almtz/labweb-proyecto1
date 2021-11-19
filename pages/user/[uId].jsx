import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../utils/firebase";
import {
  AppBar,
  CssBaseline,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CasinoIcon from "@mui/icons-material/Casino";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import { useFirebaseAuth } from "../../context/AuthContext";
import ListElementCard from "../../components/ListElementCard";

const Profile = ({ userList }) => {
  const useStyles = makeStyles((theme) => ({
    vertical_center: {
      width: "100%",
      margin: "0",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    postContainer: {
      overflow: "auto",
    },
  }));

  const { isAuthenticated, user } = useFirebaseAuth();
  const classes = useStyles();

  console.log(isAuthenticated);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <CasinoIcon className={classes.icon} />
          <Link href="/" passHref>
            <Typography variant="h6" style={{ flex: 1, paddingLeft: "20px" }}>
              TTop10
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={utilStyles.container}>
        <Typography variant="h2">{user.displayName}</Typography>
        <br />
        <Typography variant="h4">Mis Listas:</Typography>
        <Grid container spacing={4}>
          {userList.map((doc) => (
            <ListElementCard key={doc.id} element={doc.data} id={doc.id} />
          ))}
        </Grid>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  let userList = [];

  let tierListRef = collection(firestore, "TierLists");
  let q = query(tierListRef, where("creator.uid", "==", context.query.uId));

  let querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    userList.push({ id: doc.id, data: doc.data() });
  });

  return {
    props: { userList },
  };
};

export default Profile;
