/**
 * This reducer deals with all states related to users and user roles
 */
import * as actions from './userActions';

const initialState = {
    allUsers: [],
    roles: {},
    loggedInUser: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.STORE_USER_ROLES :

            // Convert the array of UserRole object to a map of role id to type
            const roleMap = action.roles.reduce( (map, role) => {
                map[role.id] = role;
                return map;
            }, {});
            // Store the map rather than the array
            return {
                ...state,
                roles: roleMap 
            }
            
        case actions.STORE_LOGGED_IN_USER :
            // If the user is an Administrator, add an "isAdministrator" property]
            const user = action.user;
            if (state.roles[user.roleId].type === 'Administrator'){
                user.isAdministrator = true;
            } 
            return {
                ...state,
                loggedInUser: user
            }

        case actions.STORE_ALL_USERS :
            const allUsers = action.users;
            return {
                ...state,
                allUsers: allUsers
            }

        default: return state;
    }
}

export default userReducer;