const express = require('express');
// Import db methods
const db = require('./data/db');

const server = express();

// Parsae the request from client
server.use(express.json());

server.post('/api/users', (req, res) => {
  if (req.body.name && req.body.bio) {
    db.insert(req.body)
      .then(newUserId => {
        res.status(201);
        res.json({
          id: newUserId.id,
          name: req.body.name,
          bio: req.body.bio
        });
      })
      .catch(err => {
        res.status(500);
        res.send({
        message: "There was an error while saving the user to the database",
        error: err,
        });
      });
  } else {
    res.status(400);
    res.send({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(err => {
      res.status(500);
      res.send({
        message: "There was an error while fetching users from the database",
        error: err,
      });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(users => {
      if (!users) {
        res.status(404);
        res.json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(users);
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        message: "The user information could not be retrieved.",
        error: err,
      });
    });
});



server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);
