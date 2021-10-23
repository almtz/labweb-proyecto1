import { Button, Snackbar } from "@material-ui/core";
import { deleteDoc, doc, FieldValue } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { useFirebaseAuth } from "../context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";

const DeleteButton = (props) => {
  const router = useRouter();
  const { user, isAuthenticated } = useFirebaseAuth();
  const [open, setOpen] = useState(false);

  const deleteTierList = async () => {
    if (user.uid === props.list.creator.uid) {
      await deleteDoc(doc(firestore, "TierLists", props.id));
      router.push("/");
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      {isAuthenticated && props.list.creator.uid === user.uid && (
        <Button variant="contained" color="error" onClick={deleteTierList}>
          Borrar
        </Button>
      )}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Solo el dueño de la lista la puede borrar"
      />
    </>
  );
};

export default DeleteButton;
