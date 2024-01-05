const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authenticate = require('../middlewares/authenticate');

//signup route
router.post('/auth/signup',async(req,res)=>{
    
    try{

        const {username, password } = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({username});
        if(existingUser)
        {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        console.log('working',hashPassword);
        //create a new user
        const newUser = new User({username, password: hashPassword});
        const userInfo = await newUser.save();
        console.log('userinfo saved',userInfo);
        return res.status(201).json({message: 'User created successfully'});
    }

    catch(error)
    {
        console.log(error);
        return res.status(500).json({message: 'server error'});
    }
}
);



//Login route
router.post('/auth/login', async(req,res) => {
    try{
        const { username, password } = req.body;
        console.log(req.body);
        //finding username
        const user = await User.findOne({username});
        if(!user)
        {
            return res.status(404).json({message: 'user not found'});
        }
        console.log('user:',user);
        //checking the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
        {
            return res.status(401).json({message: 'Incorrect password!'});
        }

        //generate JWT token
        const token = jwt.sign({userId: user._id}, 'secretKey',{expiresIn:'1h'});
        
        return res.status(200).json({token});

    }

    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:'server error'});
    }
})
//CRUD operations for notes
//GET, POST, PUT, DELETE

// router.get('/notes', authenticate, async(req, res) => {
//     // Here, req.user contains user information decoded from the JWT
//     // Provide access to notes or perform actions based on user authentication
//     // Fetch notes from the database and send them in the response
//     res.json({ message: 'Access to notes granted' });
//   });


//share a note
// router.post('/notes/:id/share',async(req,res)=>{

// });

module.exports = router;