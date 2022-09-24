import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteReview, getSpotReviews } from "../../store/reviews";


const SpotReviews = () => {

    const params = useParams();
    const { spotId } = params;
    // const history = useHistory();
    const dispatch = useDispatch();
    const history = useHistory();

    // const spot = useSelector(state => state.spots.singleSpot);
    const spotReviews = useSelector(state => state.reviews.spot);
    const currentUser = useSelector(state => state.session.user);



    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch]);

    const deleteHandler = async (reviewId) => {
        await dispatch(deleteReview(reviewId))
        // window.alert('Review deleted')
        history.push(`/spots/${spotId}`)
    }


    return (
        <div>
            <div>
                <h1>Reviews</h1>
            </div>
            <div id='existing-reviews'>
                REVIEWS CONTAINER
                {Object.values(spotReviews).map(review => {
                    return <div key={review.id}>
                        {currentUser && currentUser.id === review.userId && (
                            <button onClick={() => deleteHandler(review.id)}> deleter </button>
                        )}
                        {review.review} </div>
                })}
            </div>
        </div>
    )



}

export default SpotReviews;