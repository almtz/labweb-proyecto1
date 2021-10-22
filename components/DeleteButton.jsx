import { Button, Snackbar } from "@material-ui/core";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { useFirebaseAuth } from "../context/AuthContext";
import { useState } from "react";

const DeleteButton = (props) => {
  const { user, isAuthenticated } = useFirebaseAuth();
  const [open, setOpen] = useState(false);

  const deleteTierList = async () => {
    if (user.uid === props.list.creator.id) {
      await deleteDoc(doc(firestore, "TierLists", props.list.id));
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      {isAuthenticated && props.creator.uid === user.uid && (
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
