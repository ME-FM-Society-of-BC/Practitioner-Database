import axios from 'axios';

/**
 * Actions associated with users and user roles
 */
export const STORE_LOGGED_IN_USER = 'STORE_LOGGED_IN_USER';
export const STORE_USER_ROLES = 'STORE_USER_ROLES';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_COMPLETED = 'REGISTER_USER_COMPLETED';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_COMPLETED = 'SIGN_IN_COMPLETED';

export const registerUser = (user) => {
    return dispatch => {
        axios.post('/users/', user)
            .then(() => {
                dispatch({ type: REGISTER_USER_COMPLETED, value: 1 })
            })
            .catch(error => {
                console.log(error);
            }
        );        
    }
};

export const signIn = (username, password) => {
    return dispatch => {
        axios.post('/sign-in/', {username, password})
            .then((result) => {
                dispatch({ type: SIGN_IN_COMPLETED, value: result })
            })
            .catch(error => {
                console.log(error);
            }
        );        
    }
};