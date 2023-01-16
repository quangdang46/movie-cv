import React from "react";
import StarRatings from "react-star-ratings";
import { IMAGE_URL } from "../../api/configApi";
import { Image } from "../Lazy";
import ReadMore from "../ReadMore/ReadMore";
import parse from "html-react-parser";
import { useViewportView } from "../../hooks/useViewportView";
import { StarIcon } from "../Icon";
import PropTypes from "prop-types";

const Review = ({ review }) => {
  const { isMobile } = useViewportView();
  return (
    <div className="flex items-center gap-7 mb-5">
      {!isMobile && (
        <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 mb-auto">
          <Image
            lazy_src={
              review?.author_details?.avatar_path &&
              review?.author_details?.avatar_path?.includes("https")
                ? "https://source.unsplash.com/random"
                : // ? "https://images.unsplash.com/photo-1671127310220-509dcf216e20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  `${IMAGE_URL}/w500${review?.author_details?.avatar_path}`
            }
            className="w-full h-full object-cover block rounded-full"
          ></Image>
        </div>
      )}
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-center">
          {isMobile && (
            <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 mb-auto">
              <Image
                lazy_src={
                  review?.author_details?.avatar_path &&
                  review?.author_details?.avatar_path?.includes("https")
                    ? "https://source.unsplash.com/random"
                    : // ? "https://images.unsplash.com/photo-1671127310220-509dcf216e20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      `${IMAGE_URL}/w500${review?.author_details?.avatar_path}`
                }
                className="w-full h-full object-cover block rounded-full"
              ></Image>
            </div>
          )}
          <span className="mt-2 md:mt-0 text-lg">
            {review?.author_details.username || review?.author || "Anonymous"}
          </span>
          {!isMobile && (
            <StarRatings
              rating={review?.author_details.rating || 0}
              starRatedColor="#e74c3c"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />
          )}
          {isMobile && (
            <div className="flex items-center gap-2">
              <span>{review?.author_details.rating || 0}</span>
              <StarIcon className="text-yellow-300"></StarIcon>
            </div>
          )}
        </div>
        <ReadMore limitTextLength={200} className="text-base">
          {review?.content ? parse(review?.content) : "No content"}
        </ReadMore>
        <p className="ml-auto">
          {new Date(review?.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) || "No date"}
        </p>
      </div>
    </div>
  );
};
Review.propTypes = {
  review: PropTypes.object,
};

export default Review;
