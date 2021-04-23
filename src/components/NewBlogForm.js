import React, { useState } from "react";

function NewBlogForm({ onAddBlog }) {
  //Setting states for controlled forms
  const [authorInput, setAuthorInput] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [blogContent, setBlogContent] = useState("");
  // handles a new blog being added
  function formSubmission(e) {
    e.preventDefault();
    const formData = {
      author: authorInput,
      blogName: blogTitle,
      videoURL: inputUrl,
      blogContent: blogContent,
      blogUpVote: 0,
      blogDownVote: 0,
    };
    fetch(`http://localhost:4002/articles`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newBlog) => {
        // this adds a blank array in the front end to stop errors.
        newBlog.articleComments = [];
        onAddBlog(newBlog);
      });
    setAuthorInput("");
    setBlogTitle("");
    setInputUrl("");
    setBlogContent("");
  }
  // Builds the Form
  return (
    <div>
      <h2>New Blog Form</h2>
      <form onSubmit={formSubmission}>
        <input
          onChange={(e) => setAuthorInput(e.target.value)}
          value={authorInput}
          type="text"
          placeholder="Author"
          required
        ></input>
        <input
          onChange={(e) => setBlogTitle(e.target.value)}
          value={blogTitle}
          type="text"
          placeholder="Blog Title"
          required
        ></input>
        <br />
        <input
          onChange={(e) => setInputUrl(e.target.value)}
          value={inputUrl}
          type="URL"
          placeholder="Video URL"
          required
        ></input>
        <br />
        <textarea
          onChange={(e) => setBlogContent(e.target.value)}
          value={blogContent}
          rows="5"
          cols="40"
          placeholder="Blog away..."
          required
        ></textarea>{" "}
        <br />
        <button type="submit">Submit Blog</button>
      </form>
    </div>
  );
}
export default NewBlogForm;
