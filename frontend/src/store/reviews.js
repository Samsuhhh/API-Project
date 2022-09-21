import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW';

const load = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
});

const add = (review, spotId) => ({
    type: CREATE_REVIEW,
    review,
    spotId
});

export const createReview = (review, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const newReview = await res.json();
        console.log('NEW REVIEW THUNKER HITING: ', newReview);
        dispatch(add(newReview));
        return newReview;
    }
}


// LOAD REVIEWS BY SPOT ID
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

    let newState;
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

        case CREATE_REVIEW:
            newState = { 
                ...state,
                spot: {
                    [action.review.id]: action.review
                }
            }
            return {
                ...state, newState
            }

            default:
            return state

    }
}

export default reviewsReducer;