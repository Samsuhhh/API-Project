const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const sequelize = require('sequelize');
const { Op } = require('sequelize');

//const validateSpotCreation = VALIDATOR




router.put('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res
            .status(404)
            .json({
                "message": "Spot couldn't be found",
                "statusCode": res.statusCode
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
        res
            .status(400)
            .json({
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

    // error handler if error check invalid id
    if (!getReviews) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: res.statusCode
            })
    };

    return res.json({ Reviews: getReviews })

});


// GET All BOOKINGS for a Spot by ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    };

    const spotBookings = await Booking.findOne({
        where: {
            spotId: spotId
        },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
    });

    const nonOwnerFilter = await Booking.findOne({
        where: {
            spotId: spotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
    });

    if (userId === spot.ownerId) {
        return res.json({ Bookings: spotBookings })
    } else {
        return res.json({ Bookings: nonOwnerFilter })
    };

});




//GET ALL SPOTS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id

    const spots = await Spot.findAll({
        raw: true,
        where: {
            ownerId: ownerId
        },

    });

    let avgRating;
    for (let i = 0; i < spots.length; i++) {
        const reviewCount = await Review.count({ where: { spotId: spots[i].id } })
        const sumOfStars = await Review.sum('stars', {
            where: { spotId: spots[i].id }
        });

        if (!sumOfStars) {
            avgRating = 0;
        } else {
            avgRating = (sumOfStars / reviewCount).toFixed(1);
        }

        spots[i].avgRating = avgRating;

        const spotImage = await SpotImage.findOne({
            where: { spotId: spots[i].id },
            attributes: ['id', 'url', 'preview']
        });

        if (spotImage) spots[i].previewImage = spotImage.url;
        else spots[i].previewImage = 'No Image Available :('

    }

    return res.json({ Spots: spots })
});


//GET details of a spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const details = await Spot.findByPk(spotId, {
        include: {
            model: User, as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }
    });    //ADD THE INCLUDE MODEL:REVIEWS AND SPOTIMAGES AFTER ASSOCIATIONS


    if (!details) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: res.statusCode
            })
    };

    const reviewCount = await Review.count({ where: { spotId: spotId } })

    const sumOfStars = await Review.sum('stars', {
        where: { spotId: spotId }
    });

    const spotImage = await SpotImage.findAll({
        where: { spotId: spotId },
        attributes: ['id', 'url', 'preview'],

    });

    let avgRating = (sumOfStars / reviewCount).toFixed(1);

    const resDetails = details.toJSON();
    resDetails.numReviews = reviewCount;
    resDetails.SpotImages = spotImage;
    resDetails.avgRating = Number(avgRating);


    return res.json(resDetails)
});




// GET ALL SPOTS; ADDING PAGINATION
router.get('/', async (req, res) => {

    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice, page, size } = req.query;
    //PAGINATION and Query Filters
    page = parseInt(page);
    size = parseInt(size);

    if (page > 10) page = 10;
    if (!page || isNaN(page)) page = 1;
    if (!size || isNaN(size) || size > 20) size = 20;

    if (page < 0 || size < 0 || maxPrice < 0 || minPrice < 0) {
        return res
            .status(404)
            .json({
                message: "Validation Error",
                statusCode: res.statusCode,
                errors: {
                    "page": "Page must be greater than or equal to 0",
                    "size": "Size must be greater than or equal to 0",
                    "minPrice": "Maximum price must be greater than or equal to 0",
                    "maxPrice": "Minimum price must be greater than or equal to 0"
                }
            });
    };

    if (minPrice && typeof minPrice !== 'decimal' ||
        maxPrice && typeof maxPrice !== 'decimal' ||
        minLat && typeof minLat !== 'decimal' ||
        maxLat && typeof maxLat !== 'decimal'
    ) {
        return res
            .status(400)
            .json({
                message: "Validation Error",
                statuscode: res.statusCode,
                errors: {
                    "maxLat": "Maximum latitude is invalid",
                    "minLat": "Minimum latitude is invalid",
                    "minLng": "Maximum longitude is invalid",
                    "maxLng": "Minimum longitude is invalid"
                }
            })
    };

    let pagination = {};
    if (page >= 0 && size >= 0) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    };

    const spots = await Spot.findAll({
        raw: true,
        ...pagination
    });

    for (i = 0; i < spots.length; i++) {
        const image = await SpotImage.findOne({
            // raw: true,
            where: {
                [Op.and]: [
                    { spotId: spots[i].id },
                    { preview: true }
                ]
            }
        });
        console.log(image)
        if (image) {
            spots[i].previewImage = image.url
        } else {
            spots[i].previewImage = 'Sorry, there are no images for this spot :('
        }
    };

    return res.json({ "Spots": spots, page, size });
});


// Create a Review for a Spot based on Spot's Id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    // if we cannot find spotbyPk
    if (!spot) {
        return res
            .status(404)
            .json({
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
        return res
            .status(403)
            .json({
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
        return res.json(newReview)

    } catch (error) {
        return res
            .status(400)
            .json({
                message: 'Validation error',
                statusCode: 400,
                errors: {
                    review: 'Review text is required',
                    stars: 'Stars must be an integer from 1 to 5'
                }
            });
    };

});


// CREATE a BOOKING based on SPOT ID
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const findSpot = await Spot.findByPk(spotId);
    const userId = req.user.id

    if (!findSpot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: res.statusCode
            })
    };

    // find all existing bookings
    const allBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });

    // checks if proposed start/end date is conflicting with any existing bookings
    for (let i = 0; i < allBookings.length; i++) {
        if (
            // startDate >= allBookings[i].startDate && endDate <= allBookings[i].endDate ||
            Date.parse(startDate) <= Date.parse(allBookings[i].startDate) &&
            Date.parse(endDate) >= Date.parse(allBookings[i].endDate) ||

            Date.parse(startDate) >= Date.parse(allBookings[i].startDate) &&
            Date.parse(startDate) <= Date.parse(allBookings[i].endDate) ||

            Date.parse(endDate) >= Date.parse(allBookings[i].startDate) &&
            Date.parse(endDate) <= Date.parse(allBookings[i].endDate)
        ) {
            return res
                .status(403)
                .json({
                    message: "Sorry, this spot is already booked for the specificied dates",
                    statusCode: res.statusCode,
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                })
        }
    };


    // endDate cannot be on or before startDate
    if (endDate <= startDate) {
        return res
            .status(400)
            .json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    "endDate": "endDate cannot be on or before startDate"
                }
            })
    };

    const newBooking = await Booking.create({
        spotId: Number(spotId),
        userId: userId,
        startDate: startDate,
        endDate: endDate,
    });

    return res.json(newBooking)
});


// ADD AN IMAGE TO A SPOT
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { url } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: res.statusCode,
            })
    }

    const newSpotImg = await SpotImage.create({
        spotId: parseInt(spotId),
        url: url,
        preview: true,

    });
    res.json({
        id: newSpotImg.spotId,
        url: newSpotImg.url,
        preview: newSpotImg.preview
    });


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

        return res.json(newSpot)
    } catch {
        res.statusCode = 400;
        return res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
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


// DELETE A SPOT
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;
    const deleteSpot = await Spot.findByPk(spotId);

    if (!deleteSpot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
    };

    if (deleteSpot.ownerId === userId) {
        deleteSpot.destroy();
        return res
            .status(200)
            .json({
                message: "Successfully deleted",
                statusCode: 200
            });
    } else {
        return res.json({
            message: "You are not the owner of this location",
        })
    }
});





module.exports = router