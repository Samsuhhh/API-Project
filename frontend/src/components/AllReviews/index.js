import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotReviews } from "../../store/reviews";


const SpotReviews = () => {
    
    const params = useParams();
    const {spotId} = params;

    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpot);
    const spotReviews = useSelector(state => state.reviews.spot);
    

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch]);
    

    return (
        <div>
            <div>
                <h1>Reviews</h1>
            </div>
            <div id='Reviews-container'>
                    REVIEWS CONTAINER
                    {Object.values(spotReviews).map(review => {
                        return <div key={review.id}> user: {review.review} </div>
                    })}
            </div>
        </div>
    )



}

export default SpotReviews;