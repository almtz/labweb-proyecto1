import { useFirebaseAuth } from "../context/AuthContext";
import {
  AppBar,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CasinoIcon from "@mui/icons-material/Casino";
import { Button, Pagination } from "@mui/material";
import Link from "next/link";
import { firestore } from "../utils/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

import useStyles from "../utils/styles";
import ListElementCard from "../components/ListElementCard";
import visibilityEnum from "../utils/visibilityEnum";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

const Home = ({ listItems }) => {
  const router = useRouter();
  const { user, isAuthenticated, logOut } = useFirebaseAuth();
  const classes = useStyles();

  const [visibleList, setVisibleLists] = useState([]);

  const [offset] = useState(6);
  const [totalPages, setTotalPages] = useState();
  const [itemsPag, setItemPag] = useState([]);

  const [filter, setFilter] = useState();

  useEffect(() => {
    let tmpArray = [];

    if (isAuthenticated) {
      tmpArray = listItems.filter(
        (e) =>
          e.data.visibility === visibilityEnum.publica ||
          e.data.creator.uid === user.uid
      );
    } else {
      tmpArray = listItems.filter(
        (e) => e.data.visibility === visibilityEnum.publica
      );
    }

    setTotalPages(Math.ceil(tmpArray.length / offset));
    setVisibleLists(tmpArray);

    setItemPag(tmpArray.slice(0, 6));
  }, []);

  const getPagItems = (e, pagNum) => {
    let endOfList = pagNum * offset;
    let startOfList = endOfList - offset;

    let tmpArray = visibleList.slice(startOfList, endOfList);

    setItemPag(tmpArray);
  };

  useEffect(() => {
    if (router.query.order !== filter) {
      router.push({ pathname: "/", query: { order: filter } });
    }
  }, [filter]);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <CasinoIcon className={classes.icon} />
          <Typography variant="h6" style={{ flex: 1, paddingLeft: "20px" }}>
            TTop10
          </Typography>
          {isAuthenticated && user !== null && (
            <>
              <Button
                variant="outlined"
                color="primary"
                style={{ backgroundColor: "black", marginRight: "10px" }}
              >
                <Link href="/list/new">
                  <a className={classes.authButton}>Nueva Lista</a>
                </Link>
              </Button>
              <Button
                variant="oulined"
                color="primary"
                style={{ backgroundColor: "black" }}
              >
                <Link href={`/user/${user.uid}`}>
                  <a className={classes.authButton}>Mi Perfil</a>
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.container}>
          <Container
            maxWidth="sm"
            style={{ marginTop: "100px", marginBottom: "40px" }}
          >
            <Typography
              variant="h3"
              align="center"
              className={classes.landingText}
              gutterBottom
            >
              Trascendiendo Top 10
            </Typography>
            <Typography
              variant="h5"
              align="justify"
              className={classes.landingText}
              paragraph
            >
              Bienvenido a la Trascendiendo Top 10 donde podrás realizar tus
              top10 de lo que más te guste. Anime, música, películas, libros,
              juegos, perros, ¡tú dilo! Se bienvenido a esta gran comunidad y
              comparte tus top10 favoritos de toda la vida.
            </Typography>
            {!isAuthenticated && (
              <div className={classes.button}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      <Link href="/auth/login">
                        <a className={classes.authButton}>Iniciar Sesión</a>
                      </Link>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ backgroundColor: "white" }}
                    >
                      <Link href="auth/register">
                        <a className={classes.registerButton}>Registrarme</a>
                      </Link>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </Container>
        </div>
        <div>
          <Container
            className={classes.cardGrid}
            maxWidth="md"
            style={{ marginTop: "30px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h5" paragraph>
                  ¡Checa las listas más populares!
                </Typography>
              </Grid>
              <Grid item xs={6} justifyContent="flex-end">
                <FormControl variant="outlined">
                  <InputLabel id={"order-by"}>Order</InputLabel>
                  <Select
                    labelId={"order-by"}
                    value={filter}
                    label="Order"
                    onChange={(e) => setFilter(e.target.value)}
                    autoWidth
                  >
                    <MenuItem value={"rating"}>Rating</MenuItem>
                    <MenuItem value={"createdOn"}>Creation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              {itemsPag.map((item, index) => (
                <ListElementCard key={index} element={item.data} id={item.id} />
              ))}
            </Grid>
            <br />
            <Grid container justifyContent="center">
              <Pagination
                count={totalPages}
                variant="outlined"
                onChange={getPagItems}
              />
            </Grid>
          </Container>
        </div>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Trascendiendo Top 10
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          ¡Gracias por apoyarnos!
        </Typography>
        {isAuthenticated && (
          <Grid>
            <Grid container spacing={1} justifyContent="center">
              <Button onClick={logOut} variant="rounded" color="primary">
                Log Out
              </Button>
            </Grid>
          </Grid>
        )}
      </footer>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const listItems = [];

  const docRef = collection(firestore, "TierLists");
  if (context.query.order) {
    const querySnapShot = await getDocs(
      query(docRef, orderBy(context.query.order, "desc"))
    );
    querySnapShot.forEach((doc) => {
      listItems.push({ id: doc.id, data: doc.data() });
    });
  } else {
    const querySnapShot = await getDocs(collection(firestore, "TierLists"));
    querySnapShot.forEach((doc) => {
      listItems.push({ id: doc.id, data: doc.data() });
    });
  }

  return {
    props: { listItems },
  };
};

export default Home;
