import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteReview, getSpotReviews } from "../../store/reviews";
import './AllReviews.css'
import { getSpotDetails } from "../../store/spots";



const SpotReviews = () => {

    const params = useParams();
    const { spotId } = params;
    // const history = useHistory();
    const dispatch = useDispatch();
    const history = useHistory();

    // const spot = useSelector(state => state.spots.singleSpot);
    const spotReviews = useSelector(state => state.reviews.spot);
    const currentUser = useSelector(state => state.session.user);
    const singleSpot = useSelector(state => state.spots.singleSpot)

    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    };

    function parseDate(date) {
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        // const day = date.split('-')[2];

        return `${months[month]} ${year}`
    };

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId]);

    const deleteHandler = async (reviewId) => {

        await dispatch(deleteReview(reviewId))
        dispatch(getSpotDetails(spotId))
        history.push(`/spots/${spotId}`)
    }


    return (
        <a id='all_reviews_jump'>
            <div id='review-container-style'>
                <div id='reviews-header'>
                    {singleSpot.avgRating === null ? `NEW • ${singleSpot.numReviews} reviews` : `★  ${singleSpot.avgRating} • ${singleSpot.numReviews} reviews `}
                    {/* <h1 >★ {singleSpot.avgRating} &#x2022; {singleSpot.numReviews} reviews</h1> */}

                </div>
                <div id='existing-reviews'>
                    {Object.values(spotReviews).map(review => {
                        return (

                            <div key={review.id} id='review-card'>

                                <div id='review-profile-details'>
                                    <div id="review-header-left">
                                        <img
                                            src='https://i.imgur.com/XzcfzIP.png'
                                            alt='superhost-badge'
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                            }}
                                        />

                                        <div id='review-name-date'>
                                            <div className='review-detail-spacing' id='review-firstName'>
                                                <span>{review.User?.firstName} </span>
                                                <span> • (★ {review.stars})</span>
                                            </div>
                                            <div id='review-time'>
                                                {review.createdAt ? parseDate(review.createdAt) : "Just visited!"}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {currentUser && currentUser.id === review.userId && (
                                            <button id='delete-review-btn' onClick={() => deleteHandler(review.id)}> Delete review </button>
                                        )}
                                    </div>
                                </div>
                                <div className='review-detail-spacing' id='user-review'>
                                    {review.review}
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </a>
    )
}

export default SpotReviews;