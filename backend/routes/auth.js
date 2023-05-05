const express = require('express');
const { body, validationResult } = require('express-validator');
const User =  require('../models/User');
const router = express.Router();


router.post('/', [

    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid mail').isEmail(),
    // password must be at least 5 chars long
    body('password', 'password must be at 5 characters').isLength({ min: 5 }),
   
],  (req, res)=>{
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err => {console.log(err)
        res.json({error : 'please enter a unique value for email', message : err.message})});

    // res.send(req.body);
});
module.exports = router;