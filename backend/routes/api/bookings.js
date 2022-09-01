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
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
    })

    return res.json({ Bookings: myBookings })
});




// EDIT a Booking with all conflicting date checks
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const findBooking = await Booking.findByPk(bookingId);

    if (!findBooking) {
        return res
            .status(404)
            .json({
                message: "Booking couldn't be found",
                statusCode: res.statusCode
            })
    };

    let currentDate = new Date();

    if (findBooking.endDate < currentDate) {
        return res
            .status(403)
            .json({
                message: "Past bookings can't be modified",
                statusCode: res.statusCode
            });
    };

    const currentBookings = await Booking.findAll({
        where: { spotId: findBooking.spotId }
    });

    for (let i = 0; i < currentBookings.length; i++) {
        if (
            // startDate >= currentBookings[i].startDate && endDate <= currentBookings[i].endDate ||
            Date.parse(startDate) <= Date.parse(currentBookings[i].startDate) &&
            Date.parse(endDate) >= Date.parse(currentBookings[i].endDate) ||

            Date.parse(startDate) >= Date.parse(currentBookings[i].startDate) &&
            Date.parse(startDate) <= Date.parse(currentBookings[i].endDate) ||

            Date.parse(endDate) >= Date.parse(currentBookings[i].startDate) &&
            Date.parse(endDate) <= Date.parse(currentBookings[i].endDate)
        ) {
            return res
                .status(403)
                .json({
                    message: "Sorry this spot is already booked for the specified dates",
                    statusCode: res.statusCode,
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                });
        };
    };

    try {
        await findBooking.update({
            startDate: startDate,
            endDate: endDate
        });

        return res.json(findBooking);

    } catch (error) {
        return res
            .status(400)
            .json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot come before startDate"
                }
            });
    }
});






// DELETE a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const findBooking = await Booking.findByPk(bookingId)

    if (!findBooking) {
        return res
            .status(404)
            .json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    };


    const newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    // cannot delete a booking that has already started
    if (findBooking.startDate <= currentDate) {
        return res
            .status(404)
            .json({
                message: "Bookings that have been started can't be deleted",
                statusCode: res.statusCode
            })
    };

    await findBooking.destroy();

    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
});





module.exports = router;