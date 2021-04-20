import React from "react";
import BlogPosts from "./BlogPosts";

function BlogContainer({ blogsData }) {
  const blogPosts = blogsData.map((blog) => {
    return (
      <BlogPosts key={blog.id} blog={blog} onNewComment={handleNewComment} />
    );
  });

  function handleNewComment(newComment) {
    const updatedComments = [...blogsData, newComment];
    setBlogData(updatedComments);
  }

  return <div id="blog-collection">{blogPosts}</div>;
}

export default BlogContainer;
