import React from "react";

function BlogPosts({ blog }) {
  const { blogName, videoUrl, blogContent, blogUpVote, blogDownVote } = blog;
  return (
    <div>
      <h1>{blogName}</h1>
      <iframe src={videoUrl}></iframe>
      <p>{blogContent}</p>
      <span>
        <button>{blogUpVote} Upvotes</button>
        <button>{blogDownVote} Downvotes</button>
      </span>
    </div>
  );
}
export default BlogPosts;
