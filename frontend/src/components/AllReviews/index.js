import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteReview, getSpotReviews } from "../../store/reviews";
import './AllReviews.css'


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



    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch]);

    const deleteHandler = async (reviewId) => {
        await dispatch(deleteReview(reviewId))
        // window.alert('Review deleted')
        history.push(`/spots/${spotId}`)
    }

    const newReviewRedirect = () => {
        history.push(`/spots/${spotId}/new-review`)
    }

    
    return (
        <div id='review-container-style'>
            <div id='reviews-header'>
                <h1 >{singleSpot.avgRating} &#x2022; {singleSpot.numReviews} reviews</h1>
                <div>
                    <button onClick={newReviewRedirect}>
                        CREATE NEW REVIEW
                    </button>
                </div>
            </div>
            <div id='existing-reviews'>
                {Object.values(spotReviews).map(review => {
                    return (
                        
                        <div key={review.id} id='review-card'>
                            <div className='review-detail-spacing'id='review-firstName'>
                                {review.User?.firstName}
                            </div>
                            <div id='review-time'>
                                 {review.createdAt}
                            </div>
                            <div className='review-detail-spacing' id='user-review'>
                                {review.review}
                            </div>
                            {currentUser && currentUser.id === review.userId && (
                                <button id='delete-review-btn' onClick={() => deleteHandler(review.id)}> Delete your review </button>
                            )}
                        </div>
                    )})}
            </div>
        </div>
    )
}

export default SpotReviews;