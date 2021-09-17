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
    makeStyles
  } from "@material-ui/core";
import '@fontsource/roboto/400.css';

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
      }));

    const classes = useStyles();

    const [form, setForm] = useState({
        name: "",
        info: "",
        desc: "",
      });

    const handleChange = (e) => {
        const { value, id } = e.target;
        setForm({ ...form, [id]: value });
        e.preventDefault();
      };

    const submitNewList = async event => {
      event.preventDefault()
      console.log("TestFront");
  
      const res = await fetch('/api/registerTopList', {
        body: JSON.stringify({
          name: form.name,
          info: form.info,
          desc: form.desc
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
  
      const result = await res.json()
    }
  
    return (
    <Grid container rowSpacing={2} columnSpacing={1} justifyContent = "center" className={classes.vertical_center} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <FormControl>
            <Grid item xs={12}>
            <Typography variant="h4" component="div" gutterBottom>
                Nueva TopList
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <TextField 
              id="name" 
              label="name" 
              variant="filled" 
              fullWidth="true"
              value={form.name}
              onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField 
              id="info" 
              label="info" 
              variant="filled" 
              fullWidth="true"
              value={form.info}
              onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField 
              id="desc" 
              label="desc" 
              variant="filled" 
              fullWidth="true"
              value={form.desc}
              onChange={handleChange}
            />
            </Grid>
            <Button 
            onClick={submitNewList} 
            variant="contained" 
            color="primary">
                Submit
            </Button>
        </FormControl>
        </div>
    </Grid>
    )
  };
  
  export default NewTopList;