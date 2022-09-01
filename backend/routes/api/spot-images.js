const express = require('express');
const { SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('HELLO')
})



module.exports = router;