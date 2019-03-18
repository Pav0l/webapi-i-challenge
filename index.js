const express = require('express');
// Import db methods
const db = require('./data/db');

const server = express();

// Parsae the request from client
server.use(express.json());

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

server.post('/api/users', (req, res) => {
  if (req.body.name && req.body.bio) {
    db.insert(req.body)
      .then(newUserId => {
        res.json(newUserId)
      })
      .catch(err => ({
        message: "There was an error while saving the user to the database",
        error: err,
      }));
  } else {
    res.status(400);
    res.send({ errorMessage: "Please provide name and bio for the user." })
  }
});





server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);
