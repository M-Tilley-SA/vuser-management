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
} = require('../db/client');

// GET, POST /users
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
    const userId = req.body.user_id;
    const createdUser = await createUser( userId );
    res.status(201).json(createdUser);
  } )
  // DELETE /
  // Clean the Db
  .delete('/',async (req, res) => {
    const deleteResponse = await deleteAllUsers();
    res.status(200).json(deleteResponse);
  });

// GET, PATCH, DELETE /users/:id
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
    const employeeData = req.body.employee;
    const user = await updateUser(userId, employeeData);
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
