import { clearSpot, getSpotDetails } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './SpotDetails.css'
// import UpdateSpotFormPage from "../UpdateSpot";
import { deleteSpot } from "../../store/spots";
import SpotReviews from "../AllReviews";
// import { deleteReview } from "../../store/reviews";
import { Calendar, DateRange, DateRangePicker } from 'react-date-range';
import { addDays, parseISO, toDate } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { createBookingThunk, getAllBookingsThunk } from "../../store/bookings";


const SpotDetail = () => {
    const params = useParams();
    const { spotId } = params;
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const currentUser = useSelector(state => state.session.user);
    const spotDetails = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot)
    const allReviews = Object.values(reviews);
    const allSpotBookings = useSelector(state => state.bookings.spotBookings)

    let bookedRanges = [];

    // const getBookedDates = () => {
    //     bookedRanges = [];

    //     if (allSpotBookings.length > 0) {
    //         allSpotBookings?.forEach(booking => {
    //             bookedRanges.push({ startDate: parseISO(booking.startDate), endDate: parseISO(booking.endDate), key: "disabled", disabled: true })
    //         })
    //     }

    //     console.log('bookedRanges take 1', bookedRanges)
    //     return bookedRanges
    // }

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
        let books = dispatch(getAllBookingsThunk(spotId))
        return () => dispatch(clearSpot())
        // let grey = getBookedDates();
    }, [dispatch, spotId, currentUser])




    // calendar
    const [openCalendar, setOpenCalendar] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: addDays(new Date(), 1),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])



    //submit booking variables
    const [startDate, setStartDate] = useState(new Date(dateRange[0].startDate));
    const [endDate, setEndDate] = useState(new Date(dateRange[0].endDate));
    const [bookingErrors, setBookingErrors] = useState({})

    const newBookingSubmit = async (e) => {
        e.preventDefault();
        const newBooking = {
            startDate: startDate,
            endDate: endDate,
            spotId: spotId,
            userId: currentUser.id
        }
        const booking = await dispatch(createBookingThunk(newBooking)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setBookingErrors(data.errors);
            }
        })
        if (booking) {
            window.alert(`Your booking is set for ${startDate} - ${endDate}. We have taken care of the cost for this booking: $${((spotDetails.price * calculateNights(dateRange[0].startDate, dateRange[0].endDate)) + 140 + 229 + 7.77)}. Enjoy your trip!`)
            history.push('/')
        } else {
            window.alert('UH OH... Unfortunately, the desired booking dates conflict with an existing booking date. Please select a new date.')
        }
    }

    // useEffect(() => {
    //     if (bookingErrors.startDate || bookingErrors.endDate) {
    //         window.alert(bookingErrors.startDate ? bookingErrors.startDate : bookingErrors.endDate ? bookingErrors.endDate : "wtf")
    //     }

    // }, [bookingErrors])

    const calculateNights = (start, end) => {
        let startDate = new Date(start);
        let endDate = new Date(end);
        let timeDiff = endDate.getTime() - startDate.getTime()
        let daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff;
    }



    // useEffect for reserve button gradient effect
    useEffect(() => {
        if (!openCalendar && document.getElementById("reserve-booking")) {
            let btn = document.getElementById("reserve-booking")
            let editBtn = document.getElementById("edit-spot-btn")
            let deleteBtn = document.getElementById("delete-spot-btn")
            let reviewBtn = document.getElementById("create-review-btn")

            btn.onmousemove = function (e) {
                let size = e.target.getBoundingClientRect();
                let x = e.clientX - size.left;
                btn.style.setProperty("--x", x + "px");
            };

            reviewBtn.onmousemove = function (e) {
                let size = e.target.getBoundingClientRect();
                let x = e.clientX - size.left;
                reviewBtn.style.setProperty("--x", x + "px");
            };
        }

    }, [openCalendar])

    // useEffect for closing calendar on dateRange select
    useEffect(() => {
        if (new Date(dateRange[0].startDate).toLocaleDateString() !== new Date(dateRange[0].endDate).toLocaleDateString()
        ) {
            setStartDate(new Date(dateRange[0].startDate).toLocaleDateString());
            setEndDate(new Date(dateRange[0].endDate).toLocaleDateString());
            setOpenCalendar(false);
        }
    }, [dateRange])

    // const spotImg = useSelector(state => state.spots.singleSpot);
    // delete spotImages at the end of useSelector and then put it back in for the BUG to occur
    // const reviewUser = useSelector(state => state.reviews.spot);
    // console.log('goodbye', spotImg)
    // console.log('SPOT DETAILS', spotDetails.SpotImages)
    // console.log('hi')

    let reviewExists;
    if (!allReviews.length) {
        reviewExists = true;
    } else {
        for (let i = 0; i < allReviews.length; i++) {
            (allReviews[i].User?.id === currentUser?.id ? reviewExists = false : reviewExists = true)
        };
    }


    const updateRedirect = async (e) => {
        // let updatedSpot = await dispatch(getSpotDetails(spotId));
        // console.log('UPDATING SPOT', updatedSpot);
        // if(updatedSpot) {
        history.push(`/spots/update/${spotId}`)
        // }
    }


    const deleteHandler = async () => {
        await dispatch(deleteSpot(spotId));

        history.push(`/`)

    };

    // const reviewDeleteHandler = async () => {
    //     console.log('review user', reviewUser.userId)

    //     console.log( 'current user', currentUser.id)

    //     if (currentUser.id === reviewUser.userId) {
    //         dispatch(deleteReview(reviewUser[0].id))
    //         window.alert('Review deleted')
    //         history.push(`/spots/${spotId}`)
    //     }
    //     else {
    //         window.alert('This is not yours to delete')
    //         // history.push('/')
    //     }

    // }



    const newReviewRedirect = () => {
        history.push(`/spots/${spotId}/new-review`)
    }


    if (!Object.values(spotDetails).length) {
        // console.log('if NO spotDetails safety hitting')
        return null;
    }



    return (
        <div id='spot-outermost'>
            <div id='header-wrap'>
                <div id='spotName-header'>
                    <div style={{ fontWeight: 500, fontSize: '26px' }}> {spotDetails.name}</div>
                    <div id='spotName-header-mini-details'>
                        <span id='miniheader-reviews'
                            style={{ color: "black", paddingRight: '7px' }}
                        >
                            {spotDetails.avgRating === null ? 'NEW' : '★ ' + spotDetails.avgRating}
                        </span>
                        &#x2022;
                        <a
                            style={{ color: "black", paddingLeft: '7px', paddingRight: '7px' }}
                            href="#all_reviews_jump">
                            <span>
                                {spotDetails.numReviews} reviews
                            </span>
                        </a>
                        &#x2022;
                        <span style={{ color: "black", paddingLeft: '7px', paddingRight: '7px' }}>
                            {spotDetails.city},{spotDetails.state}
                        </span>

                        &#x2022;
                        <span style={{ color: "black", paddingLeft: '7px', paddingRight: '7px' }}>
                            {spotDetails.country}
                        </span>

                    </div>
                </div>

            </div>
            <div id='spotPage'>

                <div id='spotDetails-images-container'>
                    <div id='bigImg-div'>
                        <img id='big-img' alt='beautiful spotImage' src={spotDetails.SpotImages[0]?.url ||
                            'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg' } />
                    </div>
                    <div className="smallImage-column-divs">
                        <div>
                            <img className='small-img' src={spotDetails.SpotImages[1]?.url } alt='small house' />
                        </div>
                        <div>
                            <img className='small-img' src={spotDetails.SpotImages[2]?.url } alt='small house' />
                        </div>
                    </div>
                    <div className='smallImage-column-divs'>
                        <img id='small-img-TR' src={spotDetails.SpotImages[3]?.url } alt='small house' />
                        <div >
                            <img id='small-img-BR' src={spotDetails.SpotImages[4]?.url } alt='small house' />
                        </div>
                    </div>

                </div>

                <div className="details-container">

                    <div id='details-left'>

                        <div id='details-mini-header'>
                            <div id='mini-header-styling'>
                                <h2 id='h2header'>{spotDetails.name} hosted by {spotDetails.Owner?.firstName}</h2>
                                <span>Id #{spotDetails.id}</span>
                            </div>
                        </div>
                        <div id='host-info-div'>
                            <div id='host-info-container'>
                                <img
                                    alt='enter icon'
                                    src="https://www.pngrepo.com/png/318342/180/lock.png"
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        paddingTop: '20px',

                                    }}
                                />
                                <div className='host-information'>
                                    <div>
                                        Self check-in
                                    </div>
                                    <div id='Check-in-description'>
                                        Check yourself in with the keypad.
                                    </div>
                                </div>
                            </div>

                            <div id='host-superhost-div'>
                                <img
                                    src='https://www.pngrepo.com/png/128236/180/badge.png'
                                    alt='superhost-badge'
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        paddingTop: '23px',
                                        paddingLeft: '2px',
                                    }}
                                />
                                <div id='aa-guarantee-div' className='host-information'>

                                    <div>
                                        {spotDetails.Owner?.firstName} is a Superhost
                                    </div>
                                    <div id='superhost-description'>
                                        Superhosts are experienced, highly rated hosts who are committed to making money by catering to guests.
                                    </div>
                                </div>
                            </div>
                            <div id='free-cancel-div'>
                                <img
                                    src='https://www.pngrepo.com/png/56251/180/calendar.png'
                                    alt='superhost-badge'
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        paddingTop: '23px',
                                        paddingLeft: '4px'

                                    }}
                                />
                                <div className='host-information'
                                    style={{
                                        fontSize: '19px',
                                        fontWeight: '500',
                                        paddingTop: '3px'
                                    }}
                                >
                                    Free cancellation for 48 hours.
                                </div>
                            </div>
                        </div>

                        <div id='appAcademy-disclaimer'>
                            <div>
                                <img
                                    alt="app academy logo"
                                    style={{ width: '210px', height: '70px' }}
                                    src='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/6269b3a19f67fd137a262d0a_A%20Logo%20Main%20-%20Red.svg' />
                            </div>
                            <div style={{ paddingLeft: '3px', paddingBottom: '3px' }}>
                                Everything on this site is 1000% real, venmo: @Samsuhhh for donations cuz I'm broke.
                            </div>
                            <div>
                                <a style={{ color: 'rgb(34,34,34', paddingLeft: '3px', paddingBottom: '3px' }}
                                    href='https://www.appacademy.io/' target="_blank" rel="noreferrer">
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <div id='spot-description' >
                            Spot Description: {spotDetails.description}
                        </div>

                        <div id="basic-calendar-display">
                            <DateRange
                                ranges={dateRange}
                                moveRangeOnFirstSelection={false}
                                retainEndDateOnFirstSelection={true}
                                editableDateInputs={false}
                                showMonthAndYearPickers={false}
                                rangeColors={['black', 'pink']}
                                // showPreview={false}
                                onChange={(e) => { setDateRange([e.selection]) }}
                                showDateDisplay={false}
                                months={2}
                                minDate={addDays(new Date(), 1)}
                                direction={"horizontal"}
                                disabledDates={bookedRanges}
                                className="dateRange-calendar"
                                allowDisabledSelection={false}
                                disabledDay={(date) => {
                                    let parsedDate = new Date(date).toJSON().slice(0, 10)
                                    for (let i = 0; i < allSpotBookings.length; i++) {
                                        let booking = allSpotBookings[i]
                                        if (booking.startDate <= parsedDate && booking.endDate >= parsedDate) return true
                                    }
                                }}
                            />    
                        </div>


                    </div>

                    <div id='right-modal'>
                        <div id='right-modal-content'>
                            <div id='modal-header'>
                                <div id='header-price'>
                                    <span id='header-left-price'>
                                        {'$' + spotDetails.price}
                                    </span>
                                    <span id="header-left-night">
                                        night
                                    </span>
                                </div>
                                <div id='header-right-stars-reviews'>
                                    <span id='headerRight-reviews'>
                                        {spotDetails.avgRating === null ? 'NEW' : '★ ' + spotDetails.avgRating}
                                    </span>
                                    &#x2022;
                                    <a
                                        style={{ color: "grey" }}
                                        href="#all_reviews_jump">
                                        <span id='headerRight-stars'>
                                            {spotDetails.numReviews} reviews
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id='calendar-wrapper'>
                                <div id='bookings-header-right' className={openCalendar ? "hidden" : "not"} onClick={() => setOpenCalendar(!openCalendar)}>
                                    <div className="dateRange-display" id='check-in'>
                                        <span className='bookings-label'>CHECK-IN</span>
                                        <span className="date-display">
                                            {new Date(dateRange[0].startDate).toLocaleDateString() === (new Date(dateRange[0].endDate)).toLocaleDateString() ? <span className="add-date-style">Add date</span> : <span>{new Date(dateRange[0]?.startDate).toLocaleDateString()}</span>}
                                        </span>
                                    </div>
                                    <div className="dateRange-display" id='check-out'>
                                        <span className='bookings-label'>CHECKOUT</span>
                                        <span className="date-display">
                                            {new Date(dateRange[0].startDate).toLocaleDateString() === (new Date(dateRange[0].endDate)).toLocaleDateString() ? <span className="add-date-style">Add date</span> : <span>{new Date(dateRange[0]?.endDate).toLocaleDateString()}</span>}
                                        </span>
                                    </div>
                                </div>
                                {openCalendar && (
                                    <div id='dateRange-container'>
                                        <div id='custom-bookings-header-wrapper'>
                                            <div id='bookings-header-left'>
                                                <div id='qty-nights'>
                                                    {
                                                        calculateNights(dateRange[0].startDate, dateRange[0].endDate) === 0 ?
                                                            'Select dates' : calculateNights(dateRange[0].startDate, dateRange[0].endDate) + ' nights'
                                                    }
                                                </div>
                                                <div id='bookings-date-range'>
                                                    {new Date(dateRange[0].startDate).toLocaleDateString() === (new Date()).toLocaleDateString() ?
                                                        <span> Add your travel dates for exact pricing </span>
                                                        : <span> {new Date(dateRange[0].startDate).toLocaleDateString()} - {new Date(dateRange[0]?.endDate).toLocaleDateString()}</span>
                                                    }

                                                </div>
                                            </div>
                                            <div id='bookings-header-right'>
                                                <div className="dateRange-display" id='check-in'>
                                                    <span className='bookings-label'>CHECK-IN</span>
                                                    <span className="date-display">
                                                        {new Date(dateRange[0].startDate).toLocaleDateString() === (new Date(dateRange[0].endDate)).toLocaleDateString() ? <span className="add-date-style">Add date</span> : <span>{new Date(dateRange[0]?.startDate).toLocaleDateString()}</span>}
                                                    </span>
                                                </div>
                                                <div className="dateRange-display" id='check-out'>
                                                    <span className='bookings-label'>CHECKOUT</span>
                                                    <span className="date-display">
                                                        {new Date(dateRange[0].startDate).toLocaleDateString() === (new Date(dateRange[0].endDate)).toLocaleDateString() ? <span className="add-date-style">Add date</span> : <span>{new Date(dateRange[0]?.endDate).toLocaleDateString()}</span>}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <DateRange
                                            ranges={dateRange}
                                            moveRangeOnFirstSelection={false}
                                            retainEndDateOnFirstSelection={true}
                                            editableDateInputs={false}
                                            showMonthAndYearPickers={false}
                                            rangeColors={['black', 'pink']}
                                            showPreview={false}
                                            onChange={(e) => { setDateRange([e.selection]) }}
                                            showDateDisplay={false}
                                            months={2}
                                            minDate={addDays(new Date(), 1)}
                                            direction={"horizontal"}
                                            disabledDates={bookedRanges}
                                            className="dateRange-calendar"
                                            allowDisabledSelection={false}
                                            disabledDay={(date) => {
                                                let parsedDate = new Date(date).toJSON().slice(0, 10)
                                                for (let i = 0; i < allSpotBookings.length; i++) {
                                                    let booking = allSpotBookings[i]
                                                    if (booking.startDate <= parsedDate && booking.endDate >= parsedDate) return true
                                                }
                                            }}
                                        />
                                        <div id='close-bookings-wrapper'>
                                            <div id='clear-dates-btn'
                                                onClick={() => setDateRange([{
                                                    startDate: new Date(),
                                                    endDate: new Date(),
                                                    key: 'selection'
                                                }])}
                                            >Clear dates</div>
                                            <div onClick={() => setOpenCalendar(false)} id='close-bookings-btn'>Close</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div id='spot-owner-buttons'>

                                {currentUser && currentUser.id !== spotDetails.ownerId && openCalendar === false && (     // && booking for this spot does not exist for this user
                                    <div>
                                        {new Date(dateRange[0].startDate).toLocaleDateString() === (new Date(dateRange[0].endDate)).toLocaleDateString() ?
                                            <>
                                                <div className="noCharge-disclaimer">You won't be charged yet</div>
                                                <button id='reserve-booking' onClick={() => setOpenCalendar(!openCalendar)}>
                                                    <span className="reserve-inner-span">Check availability</span>
                                                </button>
                                            </>
                                            :
                                            <button id='reserve-booking' onClick={(e) => newBookingSubmit(e)}>
                                                {/* change onClick to pull up confirm booking modal */}
                                                <span className="reserve-inner-span">Reserve</span>
                                            </button>

                                        }
                                    </div>
                                )}

                                {currentUser && currentUser.id !== spotDetails.ownerId
                                    && new Date(dateRange[0].startDate).toLocaleDateString() !== (new Date(dateRange[0].endDate)).toLocaleDateString()
                                    && (
                                        <div>
                                            <div className="selected-booking-summary-container">
                                                {/* <div className="noCharge-disclaimer">You won't be charged yet</div> */}
                                                <div className="booking-summary-row">
                                                    <span className="bsr-left"> {'$' + spotDetails.price} x {calculateNights(dateRange[0].startDate, dateRange[0].endDate)} nights</span>
                                                    <span className="bsr-right">${spotDetails.price * calculateNights(dateRange[0].startDate, dateRange[0].endDate)} </span>
                                                </div>
                                                <br></br>
                                                <div className="booking-summary-row">
                                                    <span className="bsr-left">Cleaning fee</span>
                                                    <span className="bsr-right">$140</span>
                                                </div>
                                                <br></br>
                                                <div className="booking-summary-row">
                                                    <span className="bsr-left">Service fee</span>
                                                    <span className="bsr-right">$229</span>
                                                </div>
                                                <br></br>
                                                <div className="booking-summary-row">
                                                    <span className="bsr-left">Sam needs a job fee</span>
                                                    <span className="bsr-right">$7.77</span>
                                                </div>
                                            </div>
                                            <div className="bookings-total-sum">
                                                <span className="bts-left">Total before taxes</span>
                                                <span className="bts-right">${((spotDetails.price * calculateNights(dateRange[0].startDate, dateRange[0].endDate)) + 140 + 229 + 7.77)}</span>
                                            </div>
                                        </div>
                                    )}

                                {currentUser && currentUser.id === spotDetails.ownerId && openCalendar === false && (
                                    <div id='owner-auth-btns-container'>
                                        <div className="noCharge-disclaimer">This location belongs to you.</div>
                                        <button id='edit-spot-btn' onClick={updateRedirect}>Update your spot</button>
                                        <button id='delete-spot-btn' onClick={deleteHandler}>Delete your spot</button>
                                    </div>
                                )}

                                {/* COMMENT BACK IN AFTER DONE WITH BUTTON CSS */}
                                {currentUser && currentUser.id !== spotDetails.ownerId && reviewExists && openCalendar === false && (
                                    <div id='leave-review-container'>
                                        <div>Been here before?</div>
                                        <button
                                            // disabled={handleRepeatReview}
                                            id='create-review-btn'
                                            onClick={newReviewRedirect}>
                                            Leave a review
                                        </button>
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <section id='reviews-container'>
                <SpotReviews />
            </section>
        </div >

    )
}

export default SpotDetail;