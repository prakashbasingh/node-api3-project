const express = require("express");
const morgan = require("morgan")

const postsRouter = require("./posts/postRouter.js")
const usersRouter = require("./users/userRouter.js")

const server = express();

server.use(express.json())
// server.use(morgan('dev'))

server.use(logger)

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);


server.get('/', (req, res) => {
  res.send(`<h1> This is my third Backend project </h1>
            <h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let todayDateAndTime = new Date();
  console.log( `${req.method} ${req.url} ${Math.floor(Date.now() /10000)} 
  ${todayDateAndTime.getMonth()+1}/${todayDateAndTime.getDate()}/${todayDateAndTime.getFullYear()} 
  ${todayDateAndTime.getHours()}:${todayDateAndTime.getMinutes()}:${todayDateAndTime.getSeconds()}`)
  next();
}

module.exports = server;






























// console.log(`${new Date().toISOString()} ${req.method} to ${req.url}`)
// next()