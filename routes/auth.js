const router = require('express').Router();
const User = require('../model/User');
// Creation of web token for session of users once logged in
const jwt = require('jsonwebtoken');
// This enables the hashing of passwords to disallow hacking
const bcrypt = require('bcryptjs');
// Validation functions enabled
const {registerValidation, loginValidation} = require ('../validation');

// REGISTER users
router.post('/register', async (req,res) =>  {
    // VALIDATE THE DATA BEFORE REGISTERING A USER
    const { error } = registerValidation(req.body);
    // if any input doesn't match  (status 400 is fail)
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in database
    const emailExist = await User.findOne({email: req.body.email});
    // If there is a duplicate email on database
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash password (10 is default)
    const salt = await bcrypt.genSalt(10);
    //input pw is hashed to salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword //req.body.password (this was used before hashing)
    });
    // try catch for said user above
    try{
      const savedUser = await user.save();
      res.send( {user: user._id});

    }catch(err){
      res.status(400).send(err);
    }
});

// LOGIN users
router.post('/login', async (req,res) =>  {
  // LETS VALIDATE THE DATA BEFORE WE LOGIN A USER
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Email is not found');

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password');

  // Create & assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  // This token can be used for front-end to enable multiple requests 
  res.header('auth-token', token).send(token);
});


module.exports = router;
