import React from "react"

function BlogPosts(props){
    console.log(props)
    return(
        <div> 

        <h1>{props.blogName}</h1>
        {/* <iframe src = {props.videoUrl} ></iframe> */}
        <p>{props.blogContent}</p>
        <span>
            <button>{props.blogUpVote} Upvotes</button>
            <button>{props.blogDownVote} Downvotes</button>
        </span>
        </div>
    )

}
export default BlogPosts