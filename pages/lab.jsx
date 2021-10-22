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
        <DuplicateListButton listId={"pffVK6683Jdhrh3FCXSz"}></DuplicateListButton>
        </>
    )
}

export default Lab;