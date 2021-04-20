import React, { useEffect, useState } from "react";
import BlogContainer from "./BlogContainer";
import Search from "./Search";
import NewBlogForm from "./NewBlogForm";
import Header from "./Header";

function App() {
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

  return (
    <>
      <Header />
      {/* <Search /> */}
      <BlogContainer blogsData={blogsData} />

      <NewBlogForm onAddBlog={handleAddBlog} />

      <div className="App">
        <header className="App-header"></header>
      </div>
    </>
  );
}

export default App;
