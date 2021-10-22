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

import useStyles from "../utils/styles";
import { auth } from "../utils/firebase";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// export function getServerSideProps(){

//   const auth = getAuth();
//   let loggedState = false;
//   console.log("Important info! - " + auth.currentUser);
//   if(auth.currentUser != null){
//     loggedState = true;
//   }
//   return {
//     props: {
//       loggedState
//     }
//   }
// }

const Home = () => {
  const { isAuthenticated, logOut } = useFirebaseAuth();
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <CasinoIcon className={classes.icon} />
          <Typography variant="h6" style={{ flex: 1 }}>
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
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      alt="random"
                      title="Título de imagen"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5">
                        Título de top10
                      </Typography>
                      <Typography>Descripción</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Ver
                      </Button>
                      <Button size="small" color="primary">
                        Editar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
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

export default Home;
