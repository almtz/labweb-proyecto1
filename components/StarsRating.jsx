import { getThemeProps } from "@mui/system";
import ReactStars from "react-rating-stars-component";

export default function StarsRating(props) {
  const ratingChanged = {
    size: 40,
    count: 5,
    isHalf: true,
    color: "black",
    activeColor: "gold",
    onChange: (newValue) => {
      console.log(`nuevo valor es ${newValue}`);
    },
    value: props.value,
  };
  return (
    <div>
      <ReactStars {...ratingChanged} />
    </div>
  );
}
