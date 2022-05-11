const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Check if the user exists
  // If the user exists, return a JWT token
  // If the user does not exist, return an error
  res.send('Got a GET request at /auth');
});

module.exports = router;
