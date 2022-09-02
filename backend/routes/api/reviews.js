const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();



//GET ALL REVIEWS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const reviews = await Review.findAll({
        include: [
            {
                model: User, as: 'User',
                attributes:
                    { exclude: ['email', 'hashedPassword', 'username', 'createdAt', 'updatedAt'] }
            },
            {
                model: ReviewImage, as: "ReviewImages",
                attributes:
                    { exclude: ['reviewId', 'createdAt', 'updatedAt'] }
            },
            {
                model: Spot, as: "Spot",
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
                include: {
                    model: SpotImage,
                    where: { preview: true },
                    attributes: ['url']
                }
            },

        ],
        where: {
            userId: userId
        },
    });

    for (let i = 0; i < reviews.length; i++) {
        let resPreview = reviews[i].toJSON();
        let spotImageUrl = resPreview.Spot.SpotImages[0]

        if (spotImageUrl) {
            resPreview.Spot.previewImage = spotImageUrl.url
        } else {
            resPreview.Spot.previewImage = 'No Image Available'
        }
        delete resPreview.Spot.SpotImages;
        reviews[i] = resPreview;
    };

    return res.json({ Reviews: reviews })
});



//EDIT a REVIEW

router.put('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const findReview = await Review.findByPk(reviewId);
    const { review, stars } = req.body;

    if (!findReview) {
        return res
            .status(404)
            .json({
                message: "Review couldn't be found",
                statusCode: res.statusCode
            })
    };


    try {
        findReview.update({
            review: review,
            stars, stars
        });

        res.json({ findReview })

    } catch (error) {
        return res
            .status(400)
            .json({
                "message": "Validation error",
                statusCode: res.statusCode,
                errors: {
                    review: "Review text is required",
                    stars: "Stars must be an integer from 1 to 5",
                }
            });
    };
});




// create an image for a review

// NOT DONE; PICK UP HERE
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    const findReview = await Review.findByPk(reviewId);

    if (!findReview) {
        return res
            .status(404)
            .json({
                message: "Review couldn't be found",
                statusCode: res.statusCode
            })
    };

    const hasImages = await ReviewImage.findAll({
        where: { reviewId: reviewId },
        attributes: {
            include: ['url', 'id'],
            exclude: ['updatedAt', 'createdAt', 'reviewId']
        }
    });

    if (hasImages.length >= 10) {
        return res
            .status(403)
            .json({
                message: "Maximum number of images for this resource was reached",
                statusCode: res.statusCode
            })
    };

    const addImage = await ReviewImage.create({
        url,
        reviewId: reviewId
    });

    res.json(addImage);
});




// DELETE a REVIEW

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const deleteReview = await Review.findByPk(reviewId);
    const userId = req.user.id;

    if (!deleteReview) {
        return res
            .status(404)
            .json({
                message: "Review couldn't be found",
                statusCode: res.statusCode
            });
    };

    if (deleteReview.userId === userId) {
        deleteReview.destroy();
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    } else {
        return res.json({
            message: "You are not the owner of this Review",
        })
    }
});




module.exports = router;