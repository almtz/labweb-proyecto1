import ReactStars from "react-rating-stars-component";

const ratingChanged = {
  size: 40,
  count: 5,
  isHalf: true,
  value: 4,
  color: "black",
  activeColor: "gold",
  onChange: (newValue) => {
    console.log(`nuevo valor es ${newValue}`);
  },
};

export default function StarsRating() {
  return (
    <div>
      <ReactStars {...ratingChanged} />
    </div>
  );
}
