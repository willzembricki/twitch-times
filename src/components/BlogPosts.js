import React, { useState } from "react";
import ReactPlayer from "react-player";
import BlogPostComments from "./BlogPostComments";
// passes down the state function being called by map
// carries onNewComment down to BogPostComments
function BlogPosts({ blog, onNewComment }) {
  //  Deconstructing the blogObj from Map
  const {
    author,
    blogName,
    videoURL,
    blogContent,
    blogUpVote,
    blogDownVote,
    articleComments,
    id,
  } = blog;

  // setting state for Blog up/down vote Also the comment form states
  // toggle to show comments
  const [currentUpvote, setCurrentUpvote] = useState(blogUpVote);
  const [currentDownvote, setCurrentDownvote] = useState(blogDownVote);
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  //  fetch PATCH for when someone upvotes a blog
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
  // Same function as above just updating DownVote
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

  // passes down the comments array of nested main obj
  // maps through and builds the comments in BLogPostComments
  // Passes down on new Comment
  const blogCommentsArr = articleComments.map((comments) => {
    return (
      <BlogPostComments
        key={comments.id}
        comments={comments}
        onNewComment={onNewComment}
      />
    );
  });

  // Handles the submission of a new comment on one of the blogs
  // resets the input states
  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      articleId: id,
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
    })
      .then((r) => r.json())
      .then((newComment) => onNewComment(newComment));
    setNameInput("");
    setCommentInput("");
  }
  // This builds the indiviudal blogPost to be future cards
  // You have the blogs and their titles/ vote button with the event listener
  // form for the new comment
  // toggle for showing or hiding comments
  //helper function for hide/show
  function handleHideShow() {
    setShowComments(!showComments);
  }

  return (
    <div className="blogPosts">
      <h2>{blogName}</h2>
      <h3>Written By: {author}</h3>
      <ReactPlayer url={videoURL} />
      <p>{blogContent}</p>
      <span>
        <button onClick={upvoteIncrease}>{currentUpvote} 👍</button>
        <button onClick={downvoteIncrease}>{currentDownvote} 👎</button>
      </span>
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
        <br />
      </form>
      <button onClick={handleHideShow}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments ? <div>{blogCommentsArr}</div> : null}
    </div>
  );
}
export default BlogPosts;
