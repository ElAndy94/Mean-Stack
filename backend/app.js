const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://andy:N2LcfyylMOLfsbel@cluster0-hhltm.mongodb.net/node-angular?retryWrites=true")
.then(() => {
  console.log('Connected to the database!')
})
.catch(() => {
  console.log('Connection failed')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
);
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"
);
  next();
});
// N2LcfyylMOLfsbel
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added succesfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: 'fd2343534l',
      title: 'First server-side post',
      content: 'This is coming from the server'
  },
    {
      id: 'kjsd334543',
      title: 'Second server-side post',
      content: 'This is coming from the server!'
  }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
