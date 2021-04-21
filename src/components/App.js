import React, { useEffect, useState } from "react";
import BlogContainer from "./BlogContainer";
import Search from "./Search";
import NewBlogForm from "./NewBlogForm";
import Header from "./Header";

function App() {
  // Setting State of embedded JSON array
  const [blogsData, setBlogData] = useState([]);
  const [showHideForm, setShowHideForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(blogsData);
  useEffect(() => {
    fetch("http://localhost:4002/articles?_embed=articleComments")
      .then((resp) => resp.json())
      .then((blogsArr) => setBlogData(blogsArr));
  }, []);
  function handleAddBlog(newBlog) {
    const updatedBlogs = [...blogsData, newBlog];
    setBlogData(updatedBlogs);
  }
  // Handles when a new comment is added. is passed through to BlogPostComments
  function handleNewComment(newComment) {
    const updatedBlog = blogsData.map((blog) => {
      if (blog.id === newComment.articleId) {
        return {
          ...blog,
          articleComments: [...blog.articleComments, newComment],
        };
      } else {
        return blog;
      }
    });

    setBlogData(updatedBlog);
  }

  //help function for showing/hiding new blog form
  function handleShowHideForm() {
    setShowHideForm(!showHideForm);
  }

  function handleUpdateSearch(newSearch) {
    setSearchTerm(newSearch);
  }

  // App is the parent component. these are the three siblings. Search is not used yet but will end up here
  return (
    <div className="App">
      <div id="App-header">
        <Header />
      </div>

      <div id="sidebar">
        <button onClick={handleShowHideForm}>
          {showHideForm ? "Hide" : "Show"} Form
        </button>
        {showHideForm ? <NewBlogForm onAddBlog={handleAddBlog} /> : null}
        <Search searchTerm={searchTerm} onUpdateSearch={handleUpdateSearch} />
      </div>

      <div id="blog-container">
        <BlogContainer
          blogsData={blogsData}
          onNewComment={handleNewComment}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

export default App;
