import { csrfFetch } from "./csrf";
const ADD_ONE = 'spots/ADD_ONE';
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const UPDATE_ONE = 'spots/UPDATE_ONE';
const DELETE_ONE = 'spots/DELETE_ONE';
const LOAD_ONE = 'spots/LOAD_ONE';
const LOAD_CURRENT = 'spots/LOAD_CURRENT';
const ADD_IMAGE = 'spots/ADD_IMAGE';
const CLEAR_SPOT = 'spots/CLEAR_SPOT';


export const clearSpot = () => ({
    type: CLEAR_SPOT
})

const load = (spots) => ({
    type: LOAD_SPOTS,
    spots

});

const loadOne = (spotDetails, spotId) => ({
    type: LOAD_ONE,
    spotDetails,
    spotId
});

const createSpot = (spot) => ({
    type: ADD_ONE,
    spot
});

const updateSpot = (spot) => ({
    type: UPDATE_ONE,
    spot
});

const deleteOne = (spotId) => ({
    type: DELETE_ONE,
    spotId
});

const current = (spots) => ({
    type: LOAD_CURRENT,
    spots
});

const addImage = (spotId) => ({
    type: ADD_IMAGE,
    spotId
});



// add an image to a spot
export const addSpotImage = (imgUrl, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imgUrl)
    });

    if (res.ok) {
        const image = await res.json();
        console.log('add Image thunk hitting:', image);
        dispatch(addImage(image));
        return image
    };

};


//GET CURRENT USER'S INFORMATION (ALL SPOTS)
export const getCurrentUserSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current')

    if (res.ok) {
        const data = await res.json();
        console.log('current user SPOTS thunk hitting: ', data)
        dispatch(current(data));
        return data;
    }
};


// READ ALL SPOTS
export const getAllSpots = () => async dispatch => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const spots = await res.json();
        console.log('all spots THUNK', spots)
        const getAllSpotsThunk = dispatch(load(spots));
        console.log('get all spots thunk dispatch', getAllSpotsThunk)
        return spots;
    }
};

// READ ONE SPOT
export const getSpotDetails = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetails = await res.json();
        console.log('spots THUNK: ', spotDetails)
        dispatch(loadOne(spotDetails))
        return spotDetails
    }
};

// CREATE NEW SPOT
export const createNewSpot = (spot) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const createdSpot = await res.json();
        console.log('CREATED SPOT THUNK:', createdSpot)
        dispatch(createSpot(createdSpot));
        return createdSpot;
    }
};

// UPDATE SPOT
export const editSpot = (spot, id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const updatedSpot = await res.json();
        console.log('UPDATED SPOTaroooo', updatedSpot);
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
};

// DELETE SPOT
export const deleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteOne(spotId));
        console.log('Delete thunk is hitting', spotId)
        return null;
    }
}


const initialState = {
    allSpots: {},
    singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_CURRENT:
        case LOAD_SPOTS:
            newState = {...state}
            const allSpots = {};
            console.log('spots ReDUCER ACTION', action)
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            // console.log('ALL SPOTS REDUCED', allSpots)
            newState.allSpots = allSpots
            return newState
        case LOAD_ONE:
            let singleSpot = { ...state };
            singleSpot = { ...action.spotDetails }
            console.log('LOAD ONE', singleSpot)
            return {
                ...state,
                singleSpot: { ...singleSpot }
            }

        // spotDetails[spotId] = action.spotDetails
        case ADD_ONE:
            newState = { ...state }
            const newSpot = action.spot;
            newState = {
                singleSpot: {
                    [action.spot.id]: newSpot
                }
            }
            console.log('NEW SPOT THUNKAROO', newState)
            return newState;
        case ADD_IMAGE:
            newState = { ...state }
            newState.singleSpot.SpotImages = [action.spotId.url]
            return {
                ...newState
            }
        case UPDATE_ONE:
            newState = { ...state }
            newState.singleSpot = action.spot;
            newState.singleSpot.SpotImages = [...state.singleSpot.SpotImages]
            return newState;
        case DELETE_ONE:
            newState = { ...state };
            delete newState[action.spotId];
            return {
                newState,
                singleSpot: {}
            }
        case CLEAR_SPOT:
            newState = {...state};
            newState.singleSpot = {}
            return newState
        default:
            return state
    }

};

export default spotsReducer;