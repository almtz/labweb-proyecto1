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

import useStyles from "./styles";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CasinoIcon className={classes.icon} />
          <Typography variant="h6">TTop10</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.container}>
          <Container maxWidth="sm" style={{ marginTop: "100px" }}>
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Trascendiendo Top 10
            </Typography>
            <Typography
              variant="h5"
              align="justify"
              color="textSecondary"
              paragraph
            >
              Bienvenido a la Trascendiendo Top 10 donde podrás realizar tus
              top10 de lo que más te guste. Anime, música, películas, libros,
              juegos, perros, ¡tú dilo! Se bienvenido a esta gran comunidad y
              comparte tus top10 favoritos de toda la vida.
            </Typography>
            <div className={classes.button}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Iniciar Sesión
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Registrarme
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <div>
          <Typography
            variant="h5"
            align="justify"
            color="textSecondary"
            paragraph
          >
            ¡Checa las listas más populares!
          </Typography>
          <Container className={classes.cardGrid} maxWidth="md">
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
      </footer>
    </>
  );
};

export default Home;
