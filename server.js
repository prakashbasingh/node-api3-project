const express = require('express');

const postsRouter = require("./posts/postRouter.js")
const usersRouter = require("./users/userRouter.js")

const server = express();
server.use(express.json())

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);


server.get('/', (req, res) => {
  res.send(`<h1> This is my third Backend project </h1>
            <h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
