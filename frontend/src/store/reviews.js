import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
export const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const load = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
});

const add = (review, spotId) => ({
    type: CREATE_REVIEW,
    review,
    spotId
});

const update = (review, reviewId) => ({
    type: EDIT_REVIEW,
    review,
    reviewId

});

const remove = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});


// DELETE REVIEW
export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    console.log('DELETE REVIEW THUNK: ', reviewId)
    // if (!res) {
    //     window.alert('Review could not be found ?')
    // }
    if (res.ok ) {
        dispatch(remove(reviewId));
        return null;
    }
}

// EDIT A REVIEW
export const editReview = (review, reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const updatedReview = await res.json();
        dispatch(update(updatedReview, reviewId));
        return updatedReview;
    }
};


// CREATE A REVIEW FOR A SPOT BY SPOT ID
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
    User: {}
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
        // case EDIT_REVIEW:
        //     newState = {...state};
        //     newState.spot = action.review;
        //     return {newState}
        case DELETE_REVIEW:
            newState = {...state};
            delete newState[action.reviewId];
            return {
                spot: newState
            }
            
            default:
            return state

    }
}

export default reviewsReducer;