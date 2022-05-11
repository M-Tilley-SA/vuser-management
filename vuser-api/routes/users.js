const express = require('express');
const router = express.Router();

// GET /users
// Fetch all users
router.get('/', (req, res) => {
  res.send('GET /users');
}),
  // POST /:id
  // Create a new user
  router.post('/', (req, res) => {
    res.send('POST /users');
  });

// GET /users/:id
// Fetch a user by id
router.get('/:id', (req, res) => {
  res.send('GET /users/:id');
}),
  // PATCH /:id
  // Update a user
  router.patch('/:id', (req, res) => {
    res.send('Got a PATCH request at /users/:id');
  }),
  // DELETE /:id
  // Delete a user
  router.delete('/:id', (req, res) => {
    res.send('Got a DELETE request at /users/:id');
  });

module.exports = router;
