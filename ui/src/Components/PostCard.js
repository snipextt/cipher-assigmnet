import React from "react";
import "./index.css";

function PostCard(props) {
  return (
    <div className="card">
      <div className="header">{props.title}</div>
      <div className="body">
        <p
          style={{
            marginBottom: "8px",
          }}
        >
          {props.body}
        </p>
        <p className="info">User ID - {props.userId}</p>
        <p className="info">Post ID - {props.id}</p>
      </div>
      <h5>Comments on this post</h5>
      <div className="comments">
        {props.comments.map((comment) => (
          <div key={comment.id}>
            <p>Name - {comment.name}</p>
            <p>Email - {comment.email}</p>
            <p>Body - {comment.body}</p>
            <p>Post ID - {comment.postId}</p>
            <p>Comment ID - {comment.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
