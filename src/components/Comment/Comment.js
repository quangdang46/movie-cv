import React from "react";
import { Image } from "../Image";

const Comment = ({ id, media_type }) => {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-[140px]">
          <p className="md:text-2xl text-xl text-white font-medium">Comments</p>
          {commentData && commentData.size > 0 && (
            <p className="absolute md:-top-1 md:-right-1 -top-2 right-5 bg-dark-lighten w-6 h-6 text-sm rounded-full tw-flex-center">
              {commentData.size}
            </p>
          )}
        </div>
        <div className="flex">
          <button
            onClick={() => setSortType("latest")}
            className={`border border-dark-lighten px-2 py-1 rounded-l-xl transition duration-300   hover:text-white ${
              sortType === "latest" && "bg-dark-lighten-2 text-white"
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setSortType("popular")}
            className={`border border-dark-lighten px-2 py-1 rounded-r-xl transition duration-300   hover:text-white ${
              sortType === "popular" && "bg-dark-lighten-2 text-white"
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      <div className="md:px-4 px-1">
        <div className="mb-12">
          {!currentUser && (
            <p className="text-lg text-center">
              You need to
              <Link
                to={`/auth?redirect=${encodeURIComponent(location.pathname)}`}
                className="text-primary font-medium"
              >
                {" login "}
              </Link>
              to comment.
            </p>
          )}
          <form
            onSubmit={commentSubmitHandler}
            className="flex gap-4 items-center"
          >
            <Image
              src={currentUser.photoURL}
              alt=""
              className="w-12 h-12 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
            ></Image>
            <input
              value={commentInputValue}
              onChange={(e) => setCommentInputValue(e.target.value)}
              type="text"
              className="py-3 flex-1 bg-dark-lighten outline-none rounded-full px-4 text-white"
              placeholder="Write comment..."
            />
            {isSendingComment ? (
              <div className="w-10 h-10 rounded-full border-[3px] border-t-transparent border-primary animate-spin"></div>
            ) : (
              <button>
                <MdSend size={30} className="text-primary " />
              </button>
            )}
          </form>
        </div>

        <CommentUserData
          isLoading={isLoading}
          isError={isError}
          sortType={sortType}
          // @ts-ignore
          commentData={commentData}
          commentLimit={commentLimit}
          media_type={media_type}
          id={id}
          role="comment"
        />
      </div>

      {commentData && commentData.size > commentLimit && (
        <button
          className="font-medium"
          onClick={() => setCommentLimit((prev) => prev + 5)}
        >
          Load more comments ({commentLimit}/{commentData.size})
        </button>
      )}
    </div>
  );
};

export default Comment;
