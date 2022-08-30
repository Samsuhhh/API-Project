const express = require('express');
const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


//GET ALL SPOTS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id

    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    });

    res.json({Spots: spots})
})




// GET ALL SPOTS
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    res.json({ "Spots": spots })
});



// CREATE A SPOT
router.post('/', async (req, res) => {
    const user = req.user
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    try {
        const newSpot = await Spot.create({
            ownerId: user.id,
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
    } catch {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });

    };

});


// ADD AN IMAGE TO A SPOT
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { url } = req.body
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res
        .json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    const newSpotImg = await SpotImage.create({
        // spotId: parseInt(spotId),
        url: url,
        preview: true,

    })
    res.json(newSpotImg)
    
    
})



module.exports = router