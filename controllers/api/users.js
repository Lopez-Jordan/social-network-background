// user routes go here
const router = require('express').Router();
const {User, Thought} = require('../../models');

// Get All Users    '/'          //  /api/users/
router.get('/', async (req,res)=>{
    try{
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    }
    catch (error){
        res.status(500).json(error);
    }
});

// Get single user by Id '/:id'     //  /api/users/:id

router.get('/:id', async (req,res)=>{
    try{
        const foundUser = await User.findOne({
            _id: req.params.id
        })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

        if (!foundUser){
            res.status(400).json({message: "No user found :/"})
        }
        res.json(foundUser);
    }
    catch (error){
        res.status(500).json(error);
    }
});

// Post create new user    '/'             //  /api/users

router.post('/', async (req,res)=>{
    try{
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.json(newUser);
    }   
    catch (error){
        res.status(500).json(error);
    }
});

// Put update user by _id   '/:id'       //  /api/users/:id

router.put('/:id', async (req,res)=>{
    try{
        const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
        );

        if(!updatedUser){
            res.status(400).json({message: "No user found :/"})
        }
        res.json(updatedUser);
    }
    catch (error){
        res.status(500).json(error);
    }
});

// Delete user by _id   '/:id'       //  /api/users/:id

router.delete('/:id', async (req,res)=>{
    try{
        const deletedUser = await User.findOneAndDelete({
            _id: req.params.id
        });
        
        if(!deletedUser){
            res.status(400).json({message: "no user found :/"});
        }

        const deletedThoughts = Thought.deleteMany({
            _id: { $in: deletedUser.thoughts}
        })
        res.json({message: "successful deletion!"})
    }
    catch (error){
        res.status(500).json(error);
    }
})


// Post add new friend by `friendId` to `userId` friends list '/:userId/friends/:friendId'

router.post('/:userId/friends/:friendId', async (req,res)=>{
    try{
        const foundUser = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
        );

        if (!foundUser){
            res.status(400).json({message: "No user found :/"})
        }
        res.json(foundUser);
    }
    catch (error){
        res.status(500).json(error);
    }
});

// Delete friend by `friendId` to `userId` friends list '/:userId/friends/:friendId'

router.delete('/:userId/friends/:friendId', async (req,res)=>{
    try{
        const foundUser = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $pull: { friends: req.params.friendId } },
        );

        if (!foundUser){
            res.status(400).json({message: "No user found :/"})
        }
        res.json(foundUser);
    }
    catch (error){
        res.status(500).json(error);
    }
});
module.exports = router;