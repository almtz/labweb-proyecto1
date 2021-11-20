import { Button, Snackbar } from "@material-ui/core";
import { useFirebaseAuth } from "../context/AuthContext";
import { useState } from "react";
import Link from "next/link";

const ModifyButton = (props) => {
  const { user, isAuthenticated } = useFirebaseAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {isAuthenticated && props.list.creator.uid === user.uid && (
        <Link href={`/list/modify?lid=${props.id}`} passHref>
          <Button variant="contained" color="error">
            Modificar
          </Button>
        </Link>
      )}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Solo el dueño de la lista la puede modificar"
      />
    </>
  );
};

export default ModifyButton;
