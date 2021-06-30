const { default: axios } = require("axios");
const express = require("express");

const app = express();

let postData = [];

app.get("/getPosts", async (req, res) => {
  const { data } = await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .catch((err) => {
      res.status(500).json({ err: err });
    });
  if (data) {
    postData = data;
    return res.status(200).end();
  }
});

app.get("/getPostComments", async (req, res) => {
  if (!postData.length)
    return res.status(500).json({ err: "Retrive posts first" });
  const commentsArray = postData.map(
    (post) =>
      new Promise(async (res, rej) => {
        let commentForPost = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        if (commentForPost) {
          res(commentForPost.data);
        } else rej(false);
      })
  );
  Promise.all(commentsArray)
    .then((arr) => {
      postData.forEach((v, i) => {
        v.comments = arr[i];
      });
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

app.get("/getAllPostsWithComments", (req, res) => {
  res.status(200).json(postData);
});

app.listen(3100, () => {
  console.log("Listining on port 3000");
});
