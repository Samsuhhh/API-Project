export const ADD_SPOT = 'spots/ADD_SPOT';
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const UPDATE_SPOT = 'spots/UPDATE_SPOTS';
export const REMOVE_SPOT = 'spots/REMOVE_SPOT';
export const LOAD_ONE = 'spots/LOAD_ONE';



const load = (spots, spotId) => ({
    type: LOAD_SPOTS,
    spots,
    spotId
});

const loadOne = (spotDetails, spotId) => ({
    type: LOAD_ONE,
    spotDetails,
    spotId
})


export const getAllSpots = () => async dispatch => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const spots = await res.json();
        console.log('spots THUNK', spots)
        dispatch(load(spots));
        return spots;
    }
};


export const getSpotDetails = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetails = await res.json();
        console.log('spots THUNK: ', spotDetails)
        dispatch(loadOne(spotDetails))
        return spotDetails
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            console.log('spots ReDUCER', action.spots.Spots)
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            console.log('ALL SPOTS REDUCED', allSpots)
            return {
                ...state,
                allSpots
            }
        case LOAD_ONE:
            const singleSpot = {...state};
            singleSpot[action.spotDetails.id] =  action.spotDetails
            console.log('LOAD ONE', singleSpot)
            return singleSpot
            // spotDetails[spotId] = action.spotDetails

        default:
            return state
    }
};

export default spotsReducer;