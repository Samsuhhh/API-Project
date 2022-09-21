export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'


const load = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
})

export const getSpotReviews = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews = await res.json();
        console.log('REVIEWS THUNK', reviews);
        dispatch(load(reviews));
        return reviews;
    }
}

 
const initialState = {
    spot: {},
    user: {}
}

const reviewsReducer = (state = initialState, action) => {

    switch ( action.type ) {
        case LOAD_REVIEWS:
            const spotReviews = {};
            console.log('reviews Reducer', action.reviews);
            action.reviews.Reviews.forEach(review => {
                spotReviews[review.id] = review;
            });
            console.log('ALL REVIEWS REDUCED', spotReviews)
            return {
                ...state,
                spot: spotReviews
            }
            default:
            return state

    }
}

export default reviewsReducer;