const express = require('express');
const { Spot } = require('../../db/models');
const router = express.Router();



router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    res.json(spots)
});

router.post('/', async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.json(newSpot)
});



module.exports = router