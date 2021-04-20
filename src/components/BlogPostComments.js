import React, { useState } from "react";

function BlogPostComments({ comments, onNewComment }) {
  const {
    id,
    articleId,
    childComment,
    commentUpvotes,
    commentDownvotes,
    name,
  } = comments;

  const [currentUpvote, setCurrentUpvote] = useState(commentUpvotes);
  const [currentDownvote, setCurrentDownvote] = useState(commentDownvotes);
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      articleId: articleId,
      name: nameInput,
      childComment: commentInput,
      commentDownvotes: 0,
      commentUpvotes: 0,
    };
    fetch(`http://localhost:4002/articleComments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    .then((r) => r.json())
    .then(newComment => onNewComment(newComment))
  }

  return (
    <div>
      <h3>{name}</h3>
      <p>{childComment}</p>
      <button onClick={upvoteIncrease}> {currentUpvote} Upvotes</button>
      <button onClick={downvoteIncrease}>{currentDownvote} Downvotes</button>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />{" "}
        <br />
        <textarea
          type="text"
          placeholder="Comment"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />{" "}
        <br />
        <button>submit</button>
      </form>
    </div>
  );
}

export default BlogPostComments;
