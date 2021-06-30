import React, { useEffect, useState } from "react";
import PostCard from "./Components/PostCard";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    //proxy set in package.json for base route and cors
    axios
      .get("/getPosts")
      .then(() => {
        axios.get("/getPostComments").then(() => {
          axios.get("/getAllPostsWithComments").then((res) => {
            setLoading(false);
            setPostData(res.data);
          });
        });
      })
      .catch(console.error);
  }, []);
  return (
    <div className="container">
      <h1>Posts</h1>
      {loading && <h1>Loading Posts</h1>}
      {postData.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}

export default App;
