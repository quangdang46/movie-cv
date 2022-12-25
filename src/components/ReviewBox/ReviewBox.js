import React from "react";
import { v4 } from "uuid";
import { Dropdown } from "../Dropdown";
import Review from "./Review";

const ReviewBox = ({ reviews }) => {
  const [reviewList, setReviewList] = React.useState(reviews || {});
  const options = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const handleChange = (option) => {
    if (option.value === "asc") {
      setReviewList(
        reviewList.sort(
          (a, b) => a.author_details.rating - b.author_details.rating
        )
      );
    } else {
      setReviewList(
        reviewList.sort(
          (a, b) => b.author_details.rating - a.author_details.rating
        )
      );
    }
  };
  return (
    <div>
      <div className="flex gap-4 justify-end mb-24 items-center">
        <p>Sort by time comment:</p>
        <Dropdown options={options} onChange={handleChange} />
      </div>
      <div className="max-h-[400px] overflow-y-auto px-6 gap-12 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600">
        {reviewList &&
          reviewList.map((review, _) => (
            <Review key={review.id || v4()} review={review} />
          ))}
      </div>
    </div>
  );
};

export default ReviewBox;
