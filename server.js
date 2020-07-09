const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h1> This is my third Backend project </h1>
            <h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
