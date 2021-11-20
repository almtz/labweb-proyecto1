import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { Button } from "@mui/material";
import useStyles from "../utils/styles";
import Link from "next/link";
import StarsRating from "./StarsRating";

const ListElementCard = (props) => {
  const classes = useStyles();
  return (
    <Grid item key={props.key} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          alt="random"
          title="Título de imagen"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {props.element.name}
          </Typography>
          <Typography>{props.element.creator.username}</Typography>
        </CardContent>
        <StarsRating value={props.rating} />
        <CardActions>
          <Button size="small" color="primary">
            Ver
          </Button>
          <Link href={`/list/detail?lid=${props.id}`} passHref>
            <Button size="small" color="primary">
              Editar
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ListElementCard;
