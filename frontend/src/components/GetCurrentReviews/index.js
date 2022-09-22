import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserReviews } from "../../store/reviews";


const CurrentUserReviews = () => {
    const dispatch = useDispatch();

    const reviews = useSelector(state => state.reviews.user);
    console.log('heyyyoo ', reviews)

    useEffect(() => {
        dispatch(getCurrentUserReviews())
    }, [dispatch]);


    return (
        <div>
            {Object.values(reviews).map(review => (
                <div>
                    <div> Review's name: {review.review}</div>
                    <div> Review's stars: {review.stars} </div>
                    <div> Review's id: {review.id} </div>
                </div>
            ))}
        </div>
    )
}



export default CurrentUserReviews;