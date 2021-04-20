import React, { useState } from "react";
import ReactPlayer from "react-player";
import BlogPostComments from "./BlogPostComments";

function BlogPosts({ blog, onNewComment }) {
  const {
    author,
    blogName,
    videoURL,
    blogContent,
    blogUpVote,
    blogDownVote,
  } = blog;
  const [currentUpvote, setCurrentUpvote] = useState(blogUpVote);
  const [currentDownvote, setCurrentDownvote] = useState(blogDownVote);

  function upvoteIncrease() {
    fetch(`http://localhost:4002/articles/${blog.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        blogUpVote: currentUpvote + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => setCurrentUpvote(data.blogUpVote));
  }

  function downvoteIncrease() {
    fetch(`http://localhost:4002/articles/${blog.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        blogDownVote: currentDownvote + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => setCurrentDownvote(data.blogDownVote));
  }

  const blogCommentsArr = blog.articleComments.map((comments) => {
    return (
      <BlogPostComments
        key={comments.id}
        comments={comments}
        onNewComment={onNewComment}
      />
    );
  });

  return (
    <div className="blogPosts">
      <h2>{blogName}</h2>
      <h3>Written By: {author}</h3>
      <ReactPlayer url={videoURL} />
      <p>{blogContent}</p>
      <span>
        <button onClick={upvoteIncrease}>{currentUpvote} Upvotes</button>
        <button onClick={downvoteIncrease}>{currentDownvote} Downvotes</button>
      </span>
      <br />
      {blogCommentsArr}
    </div>
  );
}
export default BlogPosts;
