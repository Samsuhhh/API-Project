import { csrfFetch } from "./csrf";
export const ADD_ONE = 'spots/ADD_ONE';
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
});

const createSpot = (spot) => ({
    type: ADD_ONE,
    spot
});

//CREATE TOMORROW

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
};

export const createNewSpot = (spot) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (res.ok ) {
        const createdSpot = await res.json();
        console.log('CREATED SPOT THUNK:', createdSpot)
        dispatch(createSpot(createdSpot));
        return createdSpot;
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
            let singleSpot = { ...state };
            singleSpot = { ...action.spotDetails }
            console.log('LOAD ONE', singleSpot)
            return { singleSpot }

        // spotDetails[spotId] = action.spotDetails
        case ADD_ONE:
            let createSpot = {...newState}
            const newSpot = action.spot;
            createSpot = {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    [action.spot.id]: newSpot
                }
            }
            console.log('NEW SPOT THUNKAROO', createSpot)
            return createSpot;


        default:
            return state
    }
};

export default spotsReducer;