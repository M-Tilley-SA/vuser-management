// Dependencies
const express = require( 'express' )
const app = express();
const port = 3000;

// Config

/**
 * Routes
 * @api {get} /users/
 * @api {get} /auth/
 * @api {get, post, put, delete} /users/:id
 */
app.use( '/api', require( './routes' ) );

// listen on target port
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

