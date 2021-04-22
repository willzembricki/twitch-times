import React, { useState } from "react";
// finally onNewComment finds its home
// The comments array BlogPosts line 59

function BlogPostComments({ comments }) {
  // destructing the comments prop
  const { id, childComment, commentUpvotes, commentDownvotes, name } = comments;
  // setting the states for the comments voting feature
  const [currentUpvote, setCurrentUpvote] = useState(commentUpvotes);
  const [currentDownvote, setCurrentDownvote] = useState(commentDownvotes);
  // similar to blogposts upvote just for each comment
  function upvoteIncrease() {
    fetch(`http://localhost:4002/articleComments/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        commentUpvotes: currentUpvote + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => setCurrentUpvote(data.commentUpvotes));
  }
  // just all the words on 18 but down
  function downvoteIncrease() {
    fetch(`http://localhost:4002/articleComments/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        commentDownvotes: currentDownvote + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => setCurrentDownvote(data.commentDownvotes));
  }
  // building the name and comment with buttons for voting

  return (
    <div>
      <h4>{name}</h4>
      <p>{childComment}</p>
      <button onClick={upvoteIncrease}> {currentUpvote} 👍</button>
      <button onClick={downvoteIncrease}>{currentDownvote} 👎</button>
      <br />
    </div>
  );
}

export default BlogPostComments;
