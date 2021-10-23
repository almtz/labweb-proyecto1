import { useFirebaseAuth } from "../context/AuthContext";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
} from "@material-ui/core";
import CasinoIcon from "@mui/icons-material/Casino";
import { Button } from "@mui/material";
import Link from "next/link";
import { firestore } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import useStyles from "../utils/styles";
import ListElementCard from "../components/ListElementCard";
import visibilityEnum from "../utils/visibilityEnum";

const Home = ({ listItems }) => {
  const { user, isAuthenticated, logOut } = useFirebaseAuth();
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <CasinoIcon className={classes.icon} />
          <Typography variant="h6" style={{ flex: 1, paddingLeft: "20px" }}>
            TTop10
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "black" }}
          >
            <Link href="/list/new">
              <a className={classes.authButton}>Nueva Lista</a>
            </Link>
          </Button>
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
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      <Link href="auth/login">
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
            <Typography variant="h5" align="center" paragraph>
              ¡Checa las listas más populares!
            </Typography>
            <Grid container spacing={4}>
              {isAuthenticated
                ? listItems.map((item, index) => {
                    if (
                      item.data.visibility === visibilityEnum.publica ||
                      item.data.creator.uid === user.uid
                    ) {
                      return (
                        <ListElementCard
                          key={index}
                          element={item.data}
                          id={item.id}
                        />
                      );
                    }
                  })
                : listItems.map((item, index) => {
                    return (
                      item.data.visibility === visibilityEnum.publica && (
                        <ListElementCard
                          key={index}
                          element={item.data}
                          id={item.id}
                        />
                      )
                    );
                  })}
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
            <Grid container spacing={1} justify="center">
              <Button onClick={logOut} variant="outlined" color="primary">
                Log Out
              </Button>
            </Grid>
          </Grid>
        )}
      </footer>
    </>
  );
};

export const getServerSideProps = async () => {
  const listItems = [];
  const querySnapShot = await getDocs(collection(firestore, "TierLists"));
  querySnapShot.forEach((doc) => {
    listItems.push({ id: doc.id, data: doc.data() });
  });

  return {
    props: { listItems },
  };
};

export default Home;
