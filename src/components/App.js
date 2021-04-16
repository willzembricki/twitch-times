import React, { useEffect } from "react"
import BlogContainer from "./BlogContainer";
import Search from "./Search";
import NewBlogForm from "./NewBlogForm"
import BlogPosts from "./BlogPosts"

function App() {
  useEffect(()=>{
    fetch("http://localhost:4002/articles")
    .then(resp => resp.json())
    .then(atriclesArr => {
      const articleCards = atriclesArr.map((article)=>{
        console.log(article)
        return(
          <BlogContainer article = {article}/>
          
          
        )
      })

    })

  },[])
 
  return (
    <>
      <Search/>
      <BlogContainer/>
      <NewBlogForm/>

    <div className="App">
      <header className="App-header">
       
        
      </header>
    </div>
  </>
  );

}

export default App;
