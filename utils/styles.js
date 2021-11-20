import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: "url(/images/moviesWallpaper.jpg)",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    marginRight: "20px",
  },
  buttons: {
    marginTop: "40px",
  },
  cardGrid: {
    padding: "20px 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  carMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: "50px 0",
  },
  authButton: {
    textDecoration: "none",
    color: "white",
  },
  registerButton: {
    textDecoration: "none",
    color: theme.palette.secondary,
  },
  landingText: {
    color: "white",
  },
}));

export default useStyles;
