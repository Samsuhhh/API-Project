// backend/routes/api/users.js
// Create and export an Express router
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//phase 5 import
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// POST /api/users singup route expects req to have username, email, pw w/
//password of the user being created. ValidateSignup checks and validates these keys
// DO NOT REMOVE YET (as per end of Phase 5)

const validateSignup = [
    check('firstName')
        .exists({checkFalsy: true})
        .withMessage('Please provide your First Name'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your Last Name'),
    check('email')
    // checks if req.body.email exists and is an email
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
    // checks if req.body.username is a min length of 4, and is not an email
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
    // checks if req.body.password is not empty and has a min length of 6
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


// Sign up route handler
//"Add User signup backend endpoint"
router.post('/', validateSignup, async (req, res) => {
        const { email, password, username, firstName, lastName} = req.body;

        const emailExists = await User.findOne({where: {email}});
        const usernameExists = await User.findOne({where: {username}});

        if ( emailExists ) {
            return res
                .status(403)
                .json({
                    message: "User already exists",
                    statusCode: res.statusCode,
                    errors: [ "User with that email already exists."]
                    
                })
        };

        if ( usernameExists ) {
            return res
                .status(403)
                .json({
                    message: "User already exists",
                    statusCode: res.statusCode,
                    errors: [ "User with that username already exists"]
                    
                })
        }


        const user = await User.signup({ firstName, lastName, email, username, password });

        await setTokenCookie(res, user);

        return res.json(user);
    }

// router.post('/', validateSignup, async (req, res) => {
//     const { email, password, username, firstName, lastName } = req.body;

//     try {
//         const user = await User.signup({
//             firstName, lastName, email, username, password
//         });
//     }
//     catch {
//         res.statusCode = 403;
//         res.json({
//             message: 'User already exists',
//             statusCode: res.statusCode,
//             errors: {
//                 'email': 'User with that email already exists',
//                 'username': 'User with that username already exists'
//             }
//         })
//     }




);




module.exports = router;