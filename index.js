const express = require('express');
// Import db methods
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(err => {
      res.status(500);
      res.send({
        error: "There was an error while saving the user to the database",
        message: err,
      });
    });
});





server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);
