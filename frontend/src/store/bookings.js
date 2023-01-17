import { csrfFetch } from "./csrf";

const NEW_BOOKING = "bookings/NEW_BOOKING";
const SPOT_BOOKINGS = "bookings/SPOT_BOOKINGS";

const createBooking = (booking) => ({
    type: NEW_BOOKING,
    booking
})

const getSpotBookings = (bookings) => ({
    type: SPOT_BOOKINGS,
    bookings
})

// CREATE A BOOKING
export const createBookingThunk = (booking) => async dispatch => {
    console.log('new booking thunk hit', booking)
    const res = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    if (res.ok) {
        const newBooking = await res.json();
        dispatch(createBooking(newBooking));
        console.log('NEW BOOKING', newBooking);
        return newBooking;
    }
    return res;
}

export const getAllBookingsThunk = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/bookings`);
    if (res.ok) {
        const bookings = await res.json();  
        console.log('bookings from the thunk', bookings);
        dispatch(getSpotBookings(bookings));

        return bookings;
    }
    return res.errors
}


const initialState = {
    allBookings: {},
    spotBookings: {}
};

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case NEW_BOOKING:
            newState = {...state}
            newState.spotBookings = {...state.spotBookings,
                [action.booking.spotId]: action.booking
            }
            return newState
        case SPOT_BOOKINGS:
            newState = {...state}
            console.log('spot bookings reducer', action)
            newState.spotBookings = action.bookings.Bookings
            return newState
        default:
            return state
    }
}

export default bookingsReducer;