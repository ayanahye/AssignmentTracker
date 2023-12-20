const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');

// register new user
// POST method to /api/users
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields.')
    }
    // check if user exists
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    // hash the password
    // salt needed to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})

// authenticate user
// POST method to /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // check for user email
    const user = await User.findOne({email});

    // compare plain text pass and encrypted pass using bcrypt
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials.');
    }
})

// get user data
// GET method for /api/users/me
// private
// middleware for sending req to a route/endpoint, this function will run to check the token
const getUser = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
}