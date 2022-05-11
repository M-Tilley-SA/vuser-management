var express = require('express');
var router = express.Router();

const USER_ROUTES = require('./routes/users');
const AUTH_ROUTES = require('./routes/auth');

router
  .use('/users', USER_ROUTES)
  .use('/auth', AUTH_ROUTES);

module.exports = router;
