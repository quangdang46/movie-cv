import React from "react";
import Skeleton from "../Skeleton/Skeleton";

const CommentUserData = ({
  id,
  media_type,
  commentLimit,
  isLoading,
  isError,
  commentData,
  sortType,
  role,
}) => {
  return (
    <>
      {isError ? (
        <p className="text-red-500 text-lg text-center mb-6">
          ERROR: Loading comment failed. Your free service exceeded the
          limitation already.
        </p>
      ) : isLoading ? (
        <ul>
          {new Array(5).fill("").map((_, index) => (
            <li key={index} className="mb-6 flex gap-4 items-start">
              <Skeleton className="w-11 h-11 !rounded-full" />
              <div>
                <Skeleton className="h-[72px] w-[850px]" />
                <div className="flex gap-3 mt-3">
                  <Skeleton className="h-[20px] w-[50px]" />
                  <Skeleton className="h-[20px] w-[50px]" />
                  <Skeleton className="h-[20px] w-[50px]" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : commentData?.size === 0 && role === "comment" ? (
        <div className="text-white text-center text-lg">
          There are no comments yet.
        </div>
      ) : (
        <CommentUserContent
          commentData={commentData}
          commentLimit={commentLimit}
          media_type={media_type}
          sortType={sortType}
          id={id}
          role={role}
        />
      )}
    </>
  );
};

export default CommentUserData;
