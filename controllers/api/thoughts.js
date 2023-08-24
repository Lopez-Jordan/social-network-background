// thought routes go here
const router = require('express').Router();

// Get all thoughts '/'     //  /api/thoughts/

//  Get thought by _id ':id'        //    /api/thoughts/:id

//  Post create new thought '/'    //      /api/thoughts/

//  Put update a thought by _id  ':id'   //      /api/thoughts/:id

//  Delete a thought by _id   ':id'      //      /api/thoughts/:id

// Post add new reaction to `thoughtId`   '/:thoughtId/reactions'

// Delete reaction through reactionId to `thoughtId`   '/:thoughtId/reactions'
module.exports = router;