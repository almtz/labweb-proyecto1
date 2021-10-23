import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebase";
import {
  Typography,
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import Image from 'next/image';
import Link from 'next/link';
import CommentForm from "../../components/CommentForm";
import StarsRating from "../../components/StarsRating";
import DuplicateListButton from "../../components/DuplicateListButton";
import DeleteButton from "../../components/DeleteButton";
import CasinoIcon from "@mui/icons-material/Casino";
import utilStyles from '../../styles/utils.module.css';

export async function getServerSideProps({ query }) {

  let lid = "";
  query.lid ? (lid = query.lid) : (lid = "empty");

  const docRef = doc(firestore, "TierLists", lid);
  const docData = await getDoc(docRef);

  if(docData.exists()){
    return{
        props: {
            listData : docData.data(),
        }
    }
  }
  else{
      return{
        props: {
            listData : null,
        }
      }
  } 
}

const ListDetail = ({listData}) => {
  const useStyles = makeStyles((theme) => ({
    vertical_center: {
      width: "100%",
      margin: "0",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    postContainer: {
        overflow: "auto",
    }
  }));

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <CasinoIcon className={classes.icon} />
          <Link href="/">
            <Typography variant="h6" style={{ flex: 1, paddingLeft: "20px" }}>
              TTop10
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={utilStyles.container}>
        <Typography variant="h2">{listData.name}</Typography>
        <Typography variant="h5">
          Por: <i>{listData.creator.username}</i>
        </Typography>
        <Typography variant="h7" className={classes.padding1px}>
          List Rating:
        </Typography>
        <StarsRating></StarsRating>

        {listData.items.map((item, index) => (
          <>
          <div className={classes.postContainer}>
            <Typography variant="h4" className={classes.padding1px}>
              {index + 1} - {item.name}
            </Typography>

            <Image
              src="/images/tierListimgPlaceholder.jpg" // Route of the image file
              height={200} // Desired size with correct aspect ratio
              width={320} // Desired size with correct aspect ratio
              alt="List element image placeholder"
              style={{float: "left", display: "block"}}
            />

            <Typography variant="body1" style={{marginBottom: "20px"}}>
              {item.desc}
            </Typography>
            </div>
          </>
        ))}

        <DuplicateListButton></DuplicateListButton>
        {/* <DeleteButton list={listData} /> */}
        <CommentForm></CommentForm>
      </div>
    </>
  );
};

export default ListDetail;