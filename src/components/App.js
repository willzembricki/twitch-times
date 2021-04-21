import React, { useEffect, useState } from "react";
import BlogContainer from "./BlogContainer";
import Search from "./Search";
import NewBlogForm from "./NewBlogForm";
import Header from "./Header";

function App() {
  // Setting State of embedded JSON array
  const [blogsData, setBlogData] = useState([]);
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

  // App is the parent component. these are the three siblings. Search is not used yet but will end up here
  return (
    <>
      <Header />

      <BlogContainer blogsData={blogsData} onNewComment={handleNewComment} />

      <NewBlogForm onAddBlog={handleAddBlog} />

      <div className="App">
        <header className="App-header"></header>
      </div>
    </>
  );
}

export default App;
