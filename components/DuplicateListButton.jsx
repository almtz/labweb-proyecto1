import { doc, addDoc, getDoc, collection } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { Button } from "@mui/material";
import useStyles from "../utils/styles";
import { useFirebaseAuth } from "../context/AuthContext";
import { useRouter } from "next/dist/client/router";

const DuplicateListButton = ({ listId }) => {
  const classes = useStyles();
  const router = useRouter();
  const { user } = useFirebaseAuth();

  const CopyList = async () => {
    const docRef = doc(firestore, "TierLists", listId);

    //Retrieve document data
    const docData = await getDoc(docRef);

    if (docData.exists()) {
      await addDoc(collection(firestore, "TierLists"), {
        creator: {
          uid: user.uid,
          username: user.displayName,
        },
        items: docData.data().items,
        name: docData.data().name + " (copy)",
        rating: 0,
        visibility: "public",
      });

      router.push("/");
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={CopyList}>
      Duplicar Lista
    </Button>
  );
};

export default DuplicateListButton;
