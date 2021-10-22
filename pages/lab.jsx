import { Button, Typography } from "@mui/material";
import Link from "next/link";
import DuplicateListButton from "../components/DuplicateListButton";
import useStyles from "../utils/styles";

const Lab = () => {

    const classes = useStyles();

    return(
        <>
        <Typography>
            Este es el lab
        </Typography>
        <DuplicateListButton listId={"QMsaSYyTGvTRqZWoMBm5"}></DuplicateListButton>
        </>
    )
}

export default Lab;