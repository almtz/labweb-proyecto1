import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import "@fontsource/roboto/400.css";

const FormExtension = ({ variant_id, sendToParent, submitFlag }) => {

  const [variantInfo, setVariantInfo] = useState({
    name: "",
    picture: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVariantInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (submitFlag && variantInfo) {
      sendToParent(variantInfo);
    }
  }, [submitFlag, variantInfo, sendToParent]);

  return (
    <>
    <Typography>
        Elemento - {variant_id}
    </Typography>
      <Grid item xs={12}>
            <TextField
              id="name"
              label="name"
              variant="filled"
              fullWidth="true"
              value={variantInfo.name}
              onChange={handleChange}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              id="picture"
              label="picture"
              variant="filled"
              fullWidth="true"
              value={variantInfo.picture}
              onChange={handleChange}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              id="description"
              label="description"
              variant="filled"
              fullWidth="true"
              value={variantInfo.description}
              onChange={handleChange}
            />
        </Grid>
    </>
  );
};

export default FormExtension;
