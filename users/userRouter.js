const express = require('express');
const UserDb = require('./userDb.js')
const PostDb = require('../posts/postDb');
const { json } = require('express');

const router = express.Router();

//*********** POST ************\\

router.post('/',validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
    const postsById = {...req.body, user_id: req.params.id}

    PostDb.insert(postsById)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(error => {
        res.status(500).json({ message: "error posting post for the user"})
      })
});

//*********** GET ************\\

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

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  UserDb.getById(req.params.id)
    .then(users => {
      if(users){
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: " user with this id could not be found"})
      }
    })
    .catch(error => {
      console/log(error)
      res.status(500).json({message: "error retrieving user info"})
    })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  UserDb.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "error retrieving users post"})
    })
});

//*********** DELETE ************\\

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  UserDb.remove(req.params.id)
    .then(count => {
      if(count > 0) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: "user with this id does not exist"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "there is error deleting user"}) 
    })
});

//*********** PUT ************\\

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;

  UserDb.update(id, changes)
    .then(count => {
      if(count > 0){
        res.status(200).json(count)
      } else {
        res.status(404).json({ message: "the user with this id can not be updated"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "error updating user"})
    })
});


//*********** custom middleware ************\\

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  UserDb.getById(id)
    .then(user => {
      if(user) {
        req.user = user
        next()
      } else {
        res.status(404).json({message: "user not found"})
      }
    })
    .catch(error => {
      res.status(400).json({message: "invalid user id"})
    })
}

function validateUser(req, res, next) {
  // do your magic!
 
      if(!req.body){
        res.status(400).json({ message: "missing user data"})
      }else if (!req.body.name){
        res.status(400).json({ message: "missing required name field"})
      } else {
        next()
      }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text){
    res.status(400).json({message: "missing required text field"})
  } else{
    next()
  }
}

module.exports = router;
