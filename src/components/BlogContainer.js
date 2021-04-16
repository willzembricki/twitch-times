import React from "react";
import BlogPosts from "./BlogPosts";

function BlogContainer({ blogsData }) {
  const blogPosts = blogsData.map((blog) => {
    return <BlogPosts key={blog.id} blog={blog} />;
  });

  return <div id="blog-collection">{blogPosts}</div>;
}

export default BlogContainer;
