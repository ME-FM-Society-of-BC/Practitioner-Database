/**
 * Actions associated with practition creation, editing, evaluation, and commenting
 */
import axios from 'axios';

/******* Synchronous actions *********/
export const STORE_PRACTITIONERS = 'STORE_PRACTITIONERS';
export const STORE_SPECIALTIES = 'STORE_SPECIALTIES';
export const UPDATE_PRACTITIONER = 'UPDATE_PRACTITIONER';
export const CREATE_PRACTITIONER = 'CREATE_PRACTITIONER';

/******* Asynchronous actions ********/

/**
 * Sends an updated practitioner to the server then dispatches to the store
 * @param {*} practitioner 
 */
export const updatePractitioner = (practitioner) => {
    return dispatch => {
        axios.put('/practitioners/' + practitioner.id, practitioner)
            .then(() => {
                dispatch({ type: UPDATE_PRACTITIONER, practitioner: practitioner })
            })
            .catch(error => {
                console.log(error);
                alert(error);
            }
        );        
    }
};



