const express = require('express');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs'); // for generating hash with salt 
const jwt = require('jsonwebtoken'); // for generating web token

const User =  require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

const JWT_SECRET = 'atrika@show';

// ROUTE : 1  creating a user using : POST "api/auth/createuser". no login required
router.post('/createuser', [

    // adding validation
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid mail').isEmail(),
    body('password', 'password must be at 5 characters').isLength({ min: 5 }),
   
], async (req, res)=>{
    let success = false;
    // console.log(req.body);

    // If there are errors, return Bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    try {
            // Check whether the user with this email exist already
        let user = await User.findOne({email: req.body.email});
        if(user){
            success = false;
            return res.status(400).json({success, error : "a user with this email already exist"});
        }

        // creating a salt to add with user's password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt) ;

        // if user don't exist then create a user 
         user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        // generating jwtToken for new user
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        let success = true;
        console.log(success,authToken);
    
        res.json({success, authToken});
        // res.json({user});
        // res.send(req.body);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server Error");
    }
   
});


// ROUTE : 2 authenticate a user using : POST "api/auth/login". 
router.post('/login', [
    body('email', 'enter a valid mail').isEmail(),
    body('password', 'password cannot be blank').exists(),
   
], async (req, res)=>{
    let success = false;
    // If there are errors, return Bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // after getting valid mail & password
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error : "please try to login with correct credentials."});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error : "please try to login with correct credentials."});
        }
        // if it is correct
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        console.log(authToken);
    
        res.json({success ,authToken});

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server Error");
    }
})

// ROUTE : 3 Get loggedin User Details using : POST "api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }  catch (error) {
        console.log(error.message);
        res.status(500).send("internal server Error");
    }
});

module.exports = router;