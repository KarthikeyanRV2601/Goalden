import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
        
    }
}


export const register = (user_name, password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {user_name, password}

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

    } catch (error) {

        const errors = error.response.data.errors;

        console.log(errors);

        dispatch({
            type: REGISTER_FAIL
        })
    }

}


export const login = (user_name, password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {user_name, password}

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());
    } catch (error) {

        const errors = error.response.data.errors;

        console.log(errors);

        dispatch({
            type: LOGIN_FAIL
        })
    }

}

export const logout = () => ({ type: LOGOUT });