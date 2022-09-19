


export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'



const load = (reviews, reviewId) => ({
    type: LOAD_REVIEWS,
    reviews,
    reviewId
})

export const getReviews = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews = await res.json();
        console.log('REVIEWS THUNK', reviews);
        dispatch(load(reviews));
        return reviews;
    }
}

 
const initialState = {
    reviews: {}
}

const reviewsReducer = (state = initialState, action) => {

    // switch( action.type ) {
    //     case LOAD_REVIEWS:
    //         const allReviews = {};
    //         console.log('spots Reducer', action.reviews)


    // }
}

export default reviewsReducer;