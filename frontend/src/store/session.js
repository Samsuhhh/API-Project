// this file will contain all the actions specific to the session user's 
// information and the session user's Redux Reducer

// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};


export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const logout = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};


export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password, firstName, lastName } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return data;
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;