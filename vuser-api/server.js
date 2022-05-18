// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const port = 3000;
const { connectToDb } = require('./api/client');
// Config

/**
 * Use body parser to help parse data from form elements
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/**
 * use cors plugin to allow cross origin requests
 */
app.use(cors())
/**
 * Routes
 * @api {post} /auth/
 * @api {post, get} /users/
 * @api {get, put, delete} /users/:id
 */
app.use('/api', require('./routes'));

// listen on target port
app.listen(port, async () => {
  console.log(`App listening on ${port}`);
  try {
    console.log('Connecting to MongoDB...');
    await connectToDb().catch((err) =>
      console.error(`Connection to MongoDB failed: ERR - ' ${err}`)
    );
  } catch {
    console.error(`Connection to MongoDB failed`);
  }
});
