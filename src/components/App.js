import React, { useEffect, useState } from "react";
import BlogContainer from "./BlogContainer";
import Search from "./Search";
import NewBlogForm from "./NewBlogForm";
import Header from "./Header";

function App() {
  const [blogsData, setBlogData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4002/articles")
      .then((resp) => resp.json())
      .then((blogsArr) => setBlogData(blogsArr));
  }, []);

  return (
    <>
      <Header />
      <Search />
      <BlogContainer blogsData={blogsData} />
      <NewBlogForm />
      <div className="App">
        <header className="App-header"></header>
      </div>
    </>
  );
}

export default App;
