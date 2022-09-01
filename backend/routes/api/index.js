// backend/routes/api/index.js
const router = require("express").Router();
const bookingsRouter = require('./bookings.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const reviewImagesRouter = require('./review-images.js');
const spotsRouter = require('./spots.js');
const spotImagesRouter = require('./spot-images.js');
const reviewsRouter = require('./reviews.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/bookings', bookingsRouter)

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/review-images', reviewImagesRouter)

router.use('/spots', spotsRouter);

router.use('/spot-images', spotImagesRouter)

router.use('/reviews', reviewsRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body});
});





module.exports = router;