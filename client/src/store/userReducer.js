/**
 * This reducer deals with all states related to users and user roles
 */
import * as actions from './userActions';

const initialState = {
    allUsers: [],
    moderators: [],
    roles: {},
    loggedInUser: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.STORE_USER_ROLES : return storeUserRoles(action.roles, state);
        case actions.STORE_LOGGED_IN_USER : return storeLoggedInUser(action.user, state);
        case actions.STORE_ALL_USERS : return storeAllUsers(action.users, state);
        case actions.LOGOUT : return logout(state);
        case actions.STORE_NEW_USER : return storeNewUser(action.user, state);
        case actions.STORE_MODERATORS: return storeModerators(action.moderators, state);
        case actions.SAVE_MODERATOR: return saveModerator(action.moderator, state);

        default: return state;
    }
}
const storeUserRoles = (roles, state) => {
    // Convert the array of UserRole object to a map of role id to type
    const roleMap = roles.reduce( (map, role) => {
        map[role.id] = role;
        return map;
    }, {});
    // Store the map rather than the array
    return {
        ...state,
        roles: roleMap 
    }
}

const storeLoggedInUser = (user, state) => {
    // If the user is a Moderator, add an "isModerator" property]
    user.isModerator = user.role === 'MODERATOR';
    user.isAdministrator = user.role === 'ADMINISTRATOR';
    return {
        ...state,
        loggedInUser: user
    }   
}

const storeAllUsers = (users, state) => {
    const allUsers = users.reduce((map, user) => {
        map[user.id] = user;
        return map
    }, {});
    return {
        ...state,
        allUsers
    }
}

const logout = (state) => {
    return {
        ...state,
        loggedInUser: null
    }
}

const storeModerators = (moderators, state) => {
    return {
        ...state,
        moderators
    }
}

const storeNewUser = (user, state) => {
    // This is for the User account of a Moderator created by the Administrator
    user.isModerator = true;
    const allUsers = {...state.allUsers};
    allUsers[user.id] = user;
    return {
        ...state,
        allUsers
    }
}

const saveModerator = (moderator, state) => {
    // This is for the User account of a Moderator created by the Administrator
    const moderators = [...state.moderators];
    moderators.push(moderator);
    return {
        ...state,
        moderators
    }
}



export default userReducer;