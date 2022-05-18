const express = require('express');
const router = express.Router();
const {
  client,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require('../api/client');

/**
 * @api {get} /users Get all users
 * @api {post} /users Create a new user
 * @api {delete} /users Delete all users
 * 
 * @api {get} /users/:id Get a user
 * @api {put} /users/:id Update a user
 * @api {delete} /users/:id Delete a user
 */

/**
 * users
 */
router
  // GET
  // Fetch all users
  .get('/', async (req, res) => {
    const users = await getAllUsers().toArray();
    res.status(200).json(users);
  })
  // POST /
  // Create a new user
  .post( '/', async ( req, res ) => {
    const userData = req.body.user;
    const createdUser = await createUser( userData );
    res.status(201).json(createdUser);
  } )
  // DELETE /
  // Clean the Db
  .delete('/',async (req, res) => {
    const deleteResponse = await deleteAllUsers();
    res.status(200).json(deleteResponse);
  });

/**
 * users/:id
 */
router
  // GET /users/:id
  // Fetch a user by id
  .get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await getUser(userId);
    res.status(200).json(user);
  })
  // PATCH /:id
  // Update a user
  .patch( '/:id', async ( req, res ) => {
    const userId = req.params.id;
    const userData = req.body.user;
    const user = await updateUser(userId, userData);
    res.status(204).json(user);
  })
  // DELETE /:id
  // Delete a user
  .delete('/:id',async (req, res) => {
    const userId = req.params.id;
    const user = await deleteUser(userId);
    res.status(200).json(user);
  });

module.exports = router;
