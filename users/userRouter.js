const express = require('express');
const UserDb = require('./userDb.js')
const PostDb = require('../posts/postDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  UserDb.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "error posting user info"})
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  UserDb.get(req.query)
    .then (users => {
      if(users) {
        res.status(200).json(users)
      } else {
        res.status(404).json({message: "users are not found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "there is error while retrieving users info"})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
