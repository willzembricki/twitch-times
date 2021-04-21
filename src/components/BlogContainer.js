import React from "react";
import BlogPosts from "./BlogPosts";
// this is where all the blogs and their respective comments are stored.
// this function maps through the state array from APP
// carries onNewComment down to BogPostComments
function BlogContainer({ blogsData, onNewComment, searchTerm }) {
  const filteredBlogs = blogsData.filter((blog) => {
    // check the name of the blogs versus the search term
    return blog.blogName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const blogPosts = filteredBlogs.map((blog) => {
    return <BlogPosts key={blog.id} blog={blog} onNewComment={onNewComment} />;
  });

  return <div id="blog-collection">{blogPosts}</div>;
}

export default BlogContainer;
