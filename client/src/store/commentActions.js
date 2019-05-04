/**
 * Actions associated with practitioner comments
 */
import axios from 'axios';

/******* Synchronous actions *********/
export const STORE_COMMENTS = 'STORE_COMMENTS';
export const  SAVE_COMMENT = 'SAVE_COMMENT';
export const  UPDATE_COMMENT = 'UPDATE_COMMENT';
export const  STORE_ALL_PENDING_COMMENTS = 'STORE_ALL_PENDING_COMMENTS';
export const  STORE_ALL_FLAGGED_COMMENTS = 'STORE_ALL_FLAGGED_COMMENTS';

/******* Asynchronous actions ********/

/**
 * Sends a comment to the server then dispatches to the store
 * @param {*} comment 
 */
export const saveComment = (comment => {
    return dispatch => {
        axios.post('/comments', comment)
            .then((response) => {
                comment.id = response.data;
                dispatch({ type: SAVE_COMMENT, comment: comment })
            })
            .catch(error => {
                console.log(error);
                alert(error);
            }
        );        
    }
})
/**
 * Sends a comment to the server then dispatches to the store
 * @param {*} comment 
 */
export const updateComment = (comment => {
    return dispatch => {
        axios.put('/comments', comment)
            .then((response) => {
                dispatch({ type: UPDATE_COMMENT, comment: comment })
            })
            .catch(error => {
                console.log(error);
                alert(error);
            }
        );        
    }
})


