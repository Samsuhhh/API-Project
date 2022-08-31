const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


//const validateSpotCreation = VALIDATOR




router.put('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    };

    try {
        await spot.update({
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
        return res.json(spot);

    } catch (error) {
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
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
    }

});

// GET ALL REVIEWS BY SPOT ID
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const findSpot = await Spot.findByPk(spotId)

    const getReviews = await Review.findOne({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']
                }
            }
        ]
    });

    res.json({ Reviews: getReviews })

});




//GET ALL SPOTS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id

    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    });

    res.json({ Spots: spots })
});


//GET details of a spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const details = await Spot.findByPk(spotId);    //ADD THE INCLUDE MODEL:REVIEWS AND SPOTIMAGES AFTER ASSOCIATIONS

    if (!details) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    res.json(details)
});




// GET ALL SPOTS
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    res.json({ "Spots": spots })
});


// Create a Review for a Spot based on Spot's Id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    // if we cannot find spotbyPk
    if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    };

    // find if Review Exists and if so, throw the error
    const reviewExists = await Review.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (reviewExists) {
        res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        });
    };

    // Try to create a new review, if validation/constraints aren't met, throw an error
    try {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: Number(spotId),
            review: "This was an awesome spot!",
            stars: 5
        });
        res.json(newReview)

    } catch (error) {
        res.json({
            message: 'Validation error',
            statusCode: 400,
            errors: {
                review: 'Review text is required',
                stars: 'Stars must be an integer from 1 to 5'
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






module.exports = router