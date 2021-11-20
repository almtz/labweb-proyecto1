import ReactStars from "react-rating-stars-component";

export default function StarsRating(props) {
  return (
    <div>
      <ReactStars size={"40"} count={"5"} isHalf value={props.value} />
    </div>
  );
}
