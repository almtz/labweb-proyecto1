import { doc, addDoc, getDoc, collection } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { Button } from "@mui/material";
import useStyles from "../utils/styles";

const DuplicateListButton = ({listId}) => {

    const classes = useStyles();

    const CopyList = async () => {

        const docRef = doc(firestore, "TierLists", listId);

        //Retrieve document data
        const docData = await getDoc(docRef);

        if (docData.exists()) {

            console.log(docData.data());

            await addDoc(collection(firestore, "TierLists"), {
                creator: docData.data().creator,
                items: docData.data().items,
                name: docData.data().name + " (copy)",
                rating: docData.data().rating,
                visibility: docData.data().visibility,
            });

            console.log("List duplicated succesfully");

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    }
    
    return(
        <Button
            variant="contained"
            color="primary"
            onClick={CopyList}
          >
              Duplicar Lista - {listId}
          </Button>
    )
}

export default DuplicateListButton;