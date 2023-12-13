import React from "react";
import { Link } from "react-router-dom";
import heart from "../heart.svg";

const Posts = (props, user) => {
  const { posts } = props;
  const handleClick = (e) => {
    e.preventDefault();
    alert("like");
  };
  return (
    <div className="list-group p-3">
      {posts.map((post) => (
        <Link
          className="list-group-item list-group-item-action flex-column align-items-start"
          to={`/post/${post._id}`}
          key={post._id}
        >
          <div
            className="d-flex w-100 justify-content-between"
            style={{ color: "rgba(103,105,109,255)" }}
          >
            <h6 className="mb-1">{post.title}</h6>
            {user && (
              <button className="btn" onClick={handleClick}>
                <img
                  className="heart"
                  alt="heart"
                  src={heart}
                  style={{ width: 20 + "px" }}
                />
              </button>
            )}
          </div>
          <small>Created by {post?.author?.name || ""}</small>
          <br />
          <small className="overflow-hidden">{post.description}</small>
          <br />
          <small className="mt-1">
            Related Topics:
            {post.tags.map((tag, idx) => (
              <span key={idx} className="badge badge-secondary m-1 p-2">
                {tag.name}
              </span>
            ))}
            <h6 className="mt-2">
              {post.upvotes.length} Likes | {post.views} Views
            </h6>
          </small>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
