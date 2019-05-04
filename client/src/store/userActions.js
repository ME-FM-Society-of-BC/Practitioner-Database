/**
 * Actions associated with users and user roles
 */

/******* Synchronous actions *********/
export const STORE_LOGGED_IN_USER = 'STORE_LOGGED_IN_USER';
export const STORE_USER_ROLES = 'STORE_USER_ROLES';
export const STORE_ALL_USERS = 'STORE_ALL_USERS';
export const LOGOUT = 'LOGOUT';

// export const checkAuthTimeout = (sessionLimit) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch({type: LOGOUT});
//         }, sessionLimit * 60000);
//     };
// };
