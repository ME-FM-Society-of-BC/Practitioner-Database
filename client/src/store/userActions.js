/**
 * Actions associated with users and user roles
 */
import axios from 'axios';

/******* Synchronous actions *********/
export const STORE_LOGGED_IN_USER = 'STORE_LOGGED_IN_USER';
export const STORE_USER_ROLES = 'STORE_USER_ROLES';
export const STORE_ALL_USERS = 'STORE_ALL_USERS';
export const STORE_NEW_USER = 'STORE_NEW_USER';
export const STORE_MODERATORS = 'STORE_MODERATORS';
export const SAVE_MODERATOR = 'SAVE_MODERATOR';
export const LOGOUT = 'LOGOUT';

/******* Asynchronous actions ********/

/**
 * Sends a new Moderator to the server then dispatches to the store
 * @param {*} moderator 
 */
export const saveModerator = (moderator => {
    return dispatch => {
        axios.post('/moderators', moderator)
            .then((response) => {
                moderator.id = response.data;
                dispatch({ type: SAVE_MODERATOR, moderator })
            })
            .catch(error => {
                console.log(error);
                alert(error);
            }
        );        
    }
})