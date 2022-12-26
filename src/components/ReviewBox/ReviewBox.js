import React from "react";
import { useState } from "react";
import { v4 } from "uuid";
import { Dropdown } from "../Dropdown";
import Review from "./Review";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const ReviewBox = ({ reviews }) => {
  const [parent] = useAutoAnimate();
  const [reviewList, setReviewList] = useState(reviews || {});
  if (!reviewList || reviewList.length === 0)
    return (
      <div className="flex justify-center items-center h-52">
        <p className="text-2xl">No reviews</p>
      </div>
    );
  const options = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const handleChange = (option) => {
    if (option.value === "asc") {
      setReviewList((reviewList) =>
        Object.values(reviewList).sort(
          (a, b) => a.author_details.rating - b.author_details.rating
        )
      );
    } else if (option.value === "desc") {
      setReviewList((reviewList) =>
        Object.values(reviewList).sort(
          (a, b) => b.author_details.rating - a.author_details.rating
        )
      );
    }
  };
  return (
    <div>
      <div className="flex gap-4 justify-end mb-24 items-center">
        <p>Sort by rating:</p>
        <Dropdown options={options} onChange={handleChange} />
      </div>
      <div
        ref={parent}
        className="max-h-[400px] overflow-y-auto px-6 gap-12 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600"
      >
        {reviewList &&
          reviewList.map((review, _) => (
            <Review key={review.id || v4()} review={review} />
          ))}
      </div>
    </div>
  );
};

export default ReviewBox;
