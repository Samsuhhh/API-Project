import { editSpot, getSpotDetails } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import './SpotDetails.css'
// import UpdateSpotFormPage from "../UpdateSpot";
import { deleteSpot } from "../../store/spots";
import SpotReviews from "../AllReviews";
// import { deleteReview } from "../../store/reviews";


const SpotDetail = () => {
    const params = useParams();
    const { spotId } = params;
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector(state => state.session.user);
    // const spotImg = useSelector(state => state.spots.singleSpot);
    // delete spotImages at the end of useSelector and then put it back in for the BUG to occur
    // const reviewUser = useSelector(state => state.reviews.spot);

    const spotDetails = useSelector(state => state.spots.singleSpot);
    // console.log('goodbye', spotImg)
    console.log('SPOT DETAILS', spotDetails.SpotImages)

    // console.log('hi')

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    if (!Object.keys(spotDetails).length) {
        console.log('if NO spotDetails safety hitting')
        return null;
    }

    const updateRedirect = async (e) => {
        // let updatedSpot = await dispatch(getSpotDetails(spotId));
        // console.log('UPDATING SPOT', updatedSpot);
        // if(updatedSpot) {
        history.push(`/spots/update/${spotId}`)
        // }
    }


    const deleteHandler = async () => {
        if (window.confirm('Are you sure you want to delete this spot?')) {
            await dispatch(deleteSpot(spotId));
            history.push('/')
        } else {
            history.push(`/spots/${spotId}`)
        }
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


    return (
        <div id='spot-outermost'>
            <div id='header-wrap'>
                <div id='spotName-header'>
                    <h2 style={{ fontWeight: 500 }}> Spot Name:  {spotDetails.name}</h2>
                </div>
            </div>
            <div id='spotPage'>

                <div id='spotDetails-content'>
                    {/* <div className='spotDetails-image'> */}
                    <img id='spotDetails-img' alt='beautiful spotImage' src={spotDetails.SpotImages[0]?.url ||
                        'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'} />
                    {/* </div> */}
                </div>

                <div className="details-container">

                    <div id='details-left'>

                        <div id='details-mini-header'>
                            <div id='mini-header-styling'>
                                <h2 id='h2header'>{spotDetails.name} hosted by {spotDetails.Owner?.firstName}</h2>
                                <span>Spot Id: {spotDetails.id}</span>
                                <span></span>
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
                                        Superhosts are experienced, highly rated hosts who are committed to making money by appealing to guests.
                                        hell yea I got a lump in throught yea and you're going to sing the words wrong
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
                            <logo>
                                <img
                                    alt="app academy logo"
                                    style={{ width: '210px', height: '70px' }}
                                    src='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/6269b3a19f67fd137a262d0a_A%20Logo%20Main%20-%20Red.svg' />
                            </logo>
                            <div style={{ paddingLeft: '3px', paddingBottom: '3px' }}>
                                Everything on this site is 1000% real, venmo: @Samsuhhh for payments.
                            </div>
                            <div>
                                <a style={{ color: 'black', paddingLeft: '3px', paddingBottom: '3px' }}
                                    href='/https://www.appacademy.io/'>
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <div id='spot-description' className='host-information'>
                            Spot Description: {spotDetails.description}
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
                            <div id='spot-owner-buttons'>

                                {currentUser && currentUser.id === spotDetails.ownerId && (
                                    <>
                                        <button
                                            id='edit-spot-btn'
                                            onClick={updateRedirect}
                                        >
                                            Update your spot
                                        </button>
                                        <button
                                            id='delete-spot-btn'
                                            onClick={deleteHandler}
                                        >
                                            Delete your spot
                                        </button>
                                    </>
                                )}
                                {currentUser && currentUser.id !== spotDetails.ownerId && (
                                    <div >
                                        <button
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
        </div>

    )
}

export default SpotDetail;