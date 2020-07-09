const express = require('express');

const PostDb = require("./postDb.js")

const router = express.Router();


router.get('/', (req, res) => {
  // do your magic!
  PostDb.get(req.query)
  .then(postData => {
    res.status(200).json(postData)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There is an error while retrieving post data"});
  });
});

router.get('/:id', validatePostId,  (req, res) => {
  // do your magic!
  PostDb.getById(req.params.id)
  .then(postData => {
    if(postData){
      res.status(200).json(postData)
    }else{
      res.status(404).json({ message: "post with the id does not exist"})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There is an error while retrieving post data"});
  });
});

router.delete('/:id', validatePostId,  (req, res) => {
  // do your magic!
  PostDb.remove(req.params.id)
    .then(deleteData => {
      if(deleteData > 0){
        res.status(200).json({ message: "post is deleted"})
      }else {
        res.status(404).json({ message: "the post with the id could not be found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "there is an error removing post"})
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;

  PostDb.update(id, changes)
    .then(count => {
      if(count > 0) {
        res.status(200).json(count)
      } else {
        res.status(404).json({ message: "the post could not be found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "There is error updating post"})
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  PostDb.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post
        next()
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    })
    .catch(error => {
      res.status(400).json({ message: "invalid post id" })
    })
}

module.exports = router;
