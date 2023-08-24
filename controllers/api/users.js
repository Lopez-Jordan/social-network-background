// user routes go here
const router = require('express').Router();

// Get All Users    '/'          //  /api/users/

// Get single user by Id '/:id'     //  /api/users/:id

// Post create new user    '/'             //  /api/users

// Put update user by _id   '/:id'       //  /api/users/:id

// Delete user by _id   '/:id'       //  /api/users/:id

// Post add new friend by `friendId` to `userId` friends list '/:userId/friends/:friendId'

// Delete friend by `friendId` to `userId` friends list '/:userId/friends/:friendId'
module.exports = router;