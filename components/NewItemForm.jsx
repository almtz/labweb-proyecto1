import { useEffect, useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import "@fontsource/roboto/400.css";

const NewItemForm = ({ category, variant_id, sendToParent, submitFlag }) => {
  const [variantInfo, setVariantInfo] = useState({
    name: "",
    picture: "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=",
    desc: "",
  });

  const [showPicture, setShow] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVariantInfo({ ...variantInfo, [id]: value });
  };

  const fetchImageURL = async () => {

    if(category == "otros"){
      console.log("No image fecth (using default)");
    }
    else if(category == "peliculas"){
      //Using utelly API
      const res = await fetch("/api/findMovie?searchParam=" + variantInfo.name);
      const data = await res.json();
      setVariantInfo({
        picture: data.url,
      })
    }
    else if(category == "videojuegos"){
      //Using psimavel's Steam2 API
      const res = await fetch("/api/findGame?searchParam=" + variantInfo.name);
      const data = await res.json();
      setVariantInfo({
        picture: data.url,
      })
    }
    setShow(true);
  }

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
      {/* <TextField
        id="picture"
        label="Imagen"
        variant="outlined"
        margin="normal"
        fullWidth="true"
        value={variantInfo.picture}
        onChange={handleChange}
      /> */}
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
      <Button
        onClick={fetchImageURL}
        variant="contained"
        size="small"
        style={{width: "200px", margin: "10px"}}
      >
        Fetch Image
      </Button>
      {showPicture ? (
        <div>
          <img src={variantInfo.picture} style={{maxHeight: "256px", maxWidth: "256px"}}></img>
        </div>
      ) : null}
    </>
  );
};

export default NewItemForm;
