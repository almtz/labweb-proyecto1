import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebase";
import {
  Button,
  FormControl,
  TextField,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "@fontsource/roboto/400.css";
import NewItemForm from "../../components/NewItemForm";
import { useFirebaseAuth } from "../../context/AuthContext";
import Link from "next/link";

export async function getServerSideProps({ query }) {
  let lid = "";
  query.lid ? (lid = query.lid) : (lid = "empty");

  const docRef = doc(firestore, "TierLists", lid);
  const docData = await getDoc(docRef);

  if (docData.exists()) {
    return {
      props: {
        listData: docData.data(),
        listId: lid,
      },
    };
  } else {
    return {
      notFound,
    };
  }
}

const Modify = ({ listData, listId }) => {
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
  const router = useRouter();
  const { user, isAuthenticated } = useFirebaseAuth();

  const [tierListName, setTierListName] = useState("");
  const [variantInfoArray] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [buttonState, setButtonDisabled] = useState(false);

  const [variantNumber, setVariants] = useState(1);

  const handleVariantChange = (variantInfo) => {
    variantInfoArray.push(variantInfo);
  };

  const handleVariants = (e, action) => {
    if (action === "add") setVariants(variantNumber + 1);
    if (action === "remove") {
      if (variantNumber > 1) setVariants(variantNumber - 1);
    }
    e.preventDefault();
  };

  const uploadList = async () => {
    await updateDoc(collection(firestore, "TierLists"), {
      name: tierListName,
    });
    router.push("/");
  };

  const submitNewList = async (event) => {
    event.preventDefault();

    setSubmitStatus(true);
    setButtonDisabled(true);

    uploadList();
    /* if (variantNumber === variantInfoArray.length) {
      uploadList();
    } else {
      setTimeout(function () {
        if (variantNumber === variantInfoArray.length) {
          uploadList();
        } else {
          setButtonDisabled(false);
        }
      }, 1200);
    }*/
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVariantInfo({ ...variantInfo, [id]: value });
  };

  const [variantInfo, setVariantInfo] = useState({
    name: "",
    picture: "",
    desc: "",
  });

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
              Modificar TopList
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="tierListName"
              label={listData.name}
              variant="outlined"
              fullWidth="true"
              value={tierListName}
              onChange={(e) => setTierListName(e.target.value)}
            />
          </Grid>
          <Typography variant="h6" component="div" gutterBottom>
            Lista de Elementos:
          </Typography>

          {listData.items.map((item, index) => (
            <>
              <Typography>Elemento - {index + 1}</Typography>
              <TextField
                id="name"
                label={item.name}
                variant="outlined"
                margin="normal"
                fullWidth="true"
                value={variantInfo.name}
                onChange={handleChange}
              />
              <TextField
                id="picture"
                label={item.picture}
                variant="outlined"
                margin="normal"
                fullWidth="true"
                value={variantInfo.picture}
                onChange={handleChange}
              />
              <TextField
                id="desc"
                label={item.desc}
                variant="outlined"
                multiline
                margin="normal"
                fullWidth="true"
                value={variantInfo.description}
                onChange={handleChange}
              />
            </>
          ))}

          <Grid item xs={12}>
            <Button
              color="primary"
              type="button"
              onClick={(e) => handleVariants(e, "add")}
            >
              Añadir otro elemento
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              type="button"
              onClick={(e) => handleVariants(e, "remove")}
            >
              Remover último elemento
            </Button>
          </Grid>
          <Button
            disabled={buttonState}
            onClick={submitNewList}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </FormControl>
      </div>
    </Grid>
  );
};

export default Modify;
