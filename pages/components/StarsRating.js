import ReactStars from "react-rating-stars-component";

const ratingChanged = {
  size: 40,
  count: 5,
  isHalf: true,
  value: 4,
  color: "black",
  activeColor: "gold",
  onChange: (newValue) => {
    console.log(`Example 3: new value is ${newValue}`);
  },
};

export default function StarsRating() {
  return (
    <div>
      <h4>Full stars rating only, a11y and other colors</h4>
      <ReactStars {...ratingChanged} />
    </div>
  );
}
