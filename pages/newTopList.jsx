import { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputLabel,
  FormHelperText,
  FormControl,
  TextField,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "@fontsource/roboto/400.css";
import FormExtension from "../components/FormExtension";

const NewTopList = () => {
  const useStyles = makeStyles((theme) => ({
    vertical_center: {
      width: "100%",
      margin: "0",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    formElement: {
      margin: "5px",
      minWidth: "750px",
    },
  }));

  const classes = useStyles();

  const [form, setForm] = useState({
      tierListName: "",
  });

  const [variantInfoArray] = useState([]);

  const [submitStatus, setSubmitStatus] = useState(false);

  const [buttonState, setButtonDisabled] = useState(false);

  const [variantNumber, setVariants] = useState({
    variantNumber: 1,
  });

  const handleChange = (e) => {
    const { value, id } = e.target;
    setForm({ ...form, [id]: value });
    e.preventDefault();
  };

  const handleVariantChange = (variantInfo) => {
    variantInfoArray.push(variantInfo);
  };

  const addVariant = (e) => {
    e.preventDefault();
    setVariants((prevState) => ({
      ...prevState,
      variantNumber: variantNumber.variantNumber + 1,
    }));
  };

  const removeVariant = (e) => {
    e.preventDefault();
    if (variantNumber.variantNumber > 1) {
      setVariants((prevState) => ({
        ...prevState,
        variantNumber: variantNumber.variantNumber - 1,
      }));
    }
  };

  const submitNewList = async (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append("tierListName", form.tierListName);
    variantInfoArray.forEach((item) => {
      let stringify = JSON.stringify(item);
      data.append("variants", stringify);
    });

    const res = await fetch("/api/registerTopList", data, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitStatus(true);
      setButtonDisabled(true);
      if (variantNumber.variantNumber === variantInfoArray.length) {
        submitNewList();
      }
      else{
        setTimeout(function(){ 
          if (variantNumber.variantNumber === variantInfoArray.length) {
            submitNewList();
          }
          else{
            setButtonDisabled(false);
          }
        }, 2000);
      }
    };

    const result = await res.json();
  };

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={1}
      justifyContent="center"
      className={classes.vertical_center}
      component={Paper}
      elevation={6}
      square
    >
      <div className={classes.paper}>
        <FormControl className={classes.formElement}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div" gutterBottom>
              Nueva TopList
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="tierListName"
              label="Tierlist Name"
              variant="filled"
              fullWidth="true"
              value={form.tierListName}
              onChange={handleChange}
            />
          </Grid>
          <Typography variant="h6" component="div" gutterBottom>
            Lista de Elementos:
          </Typography>

          {/*
            Variants dyanmic-recursive form extensions.
          */}

          {[...Array(variantNumber.variantNumber)].map((value, index) => (
            <FormExtension
              variant_id={index + 1}
              key={index}
              sendToParent={handleVariantChange}
              submitFlag={submitStatus}
            />
          ))}

          <Grid item xs={12}>
            <Button
              color="primary"
              type="button"
              onClick={addVariant}>
                Añadir otro elemento
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
            color="secondary"
            type="button"
            onClick={removeVariant}>
              Remover último elemento
            </Button>
          </Grid>
          <Button onClick={submitNewList} variant="contained" color="primary">
            Submit
          </Button>
        </FormControl>
      </div>
    </Grid>
  );
};

export default NewTopList;
