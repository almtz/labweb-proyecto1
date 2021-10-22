import { useEffect, useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import "@fontsource/roboto/400.css";

const NewItemForm = ({ variant_id, sendToParent, submitFlag }) => {
  const [variantInfo, setVariantInfo] = useState({
    name: "",
    picture: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVariantInfo({ ...variantInfo, [id]: value });
  };

  useEffect(() => {
    if (submitFlag && variantInfo) {
      sendToParent(variantInfo);
    }
  }, [submitFlag, variantInfo, sendToParent]);

  return (
    <>
      <Typography>Elemento - {variant_id}</Typography>
      <TextField
        id="name"
        label="Nombre"
        variant="outlined"
        margin="normal"
        fullWidth="true"
        value={variantInfo.name}
        onChange={handleChange}
      />
      <TextField
        id="picture"
        label="Imagen"
        variant="outlined"
        margin="normal"
        fullWidth="true"
        value={variantInfo.picture}
        onChange={handleChange}
      />
      <TextField
        id="desc"
        label="Descripción"
        variant="outlined"
        multiline
        margin="normal"
        fullWidth="true"
        value={variantInfo.description}
        onChange={handleChange}
      />
    </>
  );
};

export default NewItemForm;
