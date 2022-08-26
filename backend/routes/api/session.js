// backend/routes/api/session.js
// create and export an express router
const express = require('express');

//phase 4 import
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

//phase 5 import
const { check } = require('express-validator'); //used with handleValidationErrors to VALIDATE body of a req
const { handleValidationErrors } = require('../../utils/validation');


//phase 5; is composed of the check and handleValidationErrors middleware
// checks to see if req.body.credentials and req.body.password are EMPTY
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];



// Log in route handler
// "Add User login backend endpoint"
router.post('/', validateLogin, async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    }
);

// Log out route handler
// "Add User logout backend endpoint"
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user route handlers
// "Add a backend endpoint to get the current user session"
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);





module.exports = router;
