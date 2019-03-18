const express = require('express');
// Import db methods
const db = require('./data/db');

const server = express();

// Parse the request from client
server.use(express.json());

server.post('/api/users', (req, res) => {
  if (req.body.name && req.body.bio) {
    db.insert(req.body)
      .then(() => {
        res.status(201);
        db.findById(id)
          .then(newUser => res.json(newUser))
      })
      .catch(() => {
        res.status(500);
        res.send({ error: "There was an error while saving the user to the database" });
      });
  } else {
    res.status(400);
    res.send({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(() => {
      res.status(500);
      res.send({ error: "There was an error while fetching users from the database" });
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
      res.send({ error: "The user information could not be retrieved." });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(recordsDeleted => {
      if (recordsDeleted === 0) {
        res.status(404);
        res.json({ message: "The user with the specified ID does not exist." })
      } else {
        res.json(`User with id ${id} was deleted.`);
      }
    })
    .catch(() => {
      res.status(500);
      res.json({ error: "The user could not be removed" })
    })
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.update(id, req.body)
    .then(user => {
      if (user === 0) {
        res.status(404);
        res.json({ message: "The user with the specified ID does not exist." })
      } else if (req.body.name === undefined || req.body.bio === undefined) {
        res.status(400);
        res.json({ errorMessage: "Please provide name and bio for the user." })
      } else {
        res.status(200);
        db.findById(id)
          .then(newUser => res.json(newUser))
      }
    })
    .catch(() => {
      res.status(500);
      res.json({ error: "The user information could not be modified." });
    })
});

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);
