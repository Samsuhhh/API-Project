const express = require('express');
const { Booking, User, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const sequelize = require('sequelize');


// GET All current User's BOOKINGS
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    // const findUser = await User.findByPk(req.user.id)
    const myBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }, 
        include:[
            {model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }}
        ],
    })

    return res.json({Bookings: myBookings})
})





router.delete('/:bookingId', requireAuth, async (req, res) => {
    const {bookingId} = req.params; 
    const findBooking = await Booking.findByPk(bookingId)

    if (!findBooking) {
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    };


    const newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    // cannot delete a booking that has already started
    if ( findBooking.startDate <= currentDate ){
        return res
            .status(404)
            .json({
                message: "Bookings that have been started can't be deleted",
                statusCode: 404
            })
    };

    await findBooking.destroy();

    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})





module.exports = router;