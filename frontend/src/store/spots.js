export const ADD_SPOT = 'spots/ADD_SPOT';
export const LOAD = 'spots/LOAD_SPOTS';
export const UPDATE_SPOT = 'spots/UPDATE_SPOTS';
export const REMOVE_SPOT = 'spots/REMOVE_SPOT';



const load = (spots, spotId) => ({
    type: LOAD,
    spots,
    spotId
});


export const getAllSpots = () => async dispatch => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const spots = await res.json();
        // console.log('spots THUNK', spots)
        dispatch(load(spots));
        return spots;
    }
}


const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = {};
            console.log('spots ReDUCER', action.spots.Spots)
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            return {
                ...allSpots,
                ...state
            }

        default:
            return state
    }
};

export default spotsReducer;