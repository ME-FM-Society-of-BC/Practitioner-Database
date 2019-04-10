/**
 * Actions associated with practitioner comments
 */
import axios from 'axios';

 /******* Synchronous actions *********/

 /** Store all comments for a practitioner retrieved from the server */
 export const STORE_COMMENTS = 'STORE_COMMENTS';
 /** Adds a user comment */
 export const  SAVE_COMMENT = 'SAVE_COMMENT';
 
/******* Asynchronous actions ********/

/**
 * Sends a comment to the server then dispatches to the store
 * @param {*} comment 
 */
export const saveComment = (comment => {
    return dispatch => {
        axios.post('/comments', comment)
            .then(() => {
                dispatch({ type: SAVE_COMMENT, comment: comment })
            })
            .catch(error => {
                console.log(error);
                alert(error);
            }
        );        
    }
})
