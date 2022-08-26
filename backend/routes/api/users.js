// backend/routes/api/users.js
// Create and export an Express router
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// Sign up route handler
//"Add User signup backend endpoint"
router.post('/', async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    }
);




module.exports = router;