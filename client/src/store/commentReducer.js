/**
* This reducer deals with all state related to practitioner comments
*/
import * as actions from './commentActions';

const initialState = {
    allComments: {},        // Maps practitionerId to comments
    pendingComments: {},    // All flagged comments for practitioners in the same province as the logged in (moderator) user
    flaggedComments: {}     // All pending comments for practitioners in the same province as the logged in (moderator) user
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {

        // Store all comments on a given practitioner
        case actions.STORE_COMMENTS: return storePractitionerComments({...state.allComments}, action.practitionerId, action.comments)

        // Store all flagged comments for practitioners in the same province as the logged in (moderator) user
        case actions.STORE_ALL_PENDING_COMMENTS:
            return {
                ...state,
                pendingComments: action.comments
            }
    
        // Store all pending comments for practitioners in the same province as the logged in (moderator) user
        case actions.STORE_ALL_FLAGGED_COMMENTS:
            return {
                ...state,
                flaggedComments: action.comments
            }

        case actions.SAVE_COMMENT:
            return saveComment(action.comment, {...state.allComments});

        default: 
            return state;
    }
}

/**
 * Saves a new comment
 * @param newComment the comment
 * @param allComments map of practitionerId to comments
 * @return the updated map
 * */
const saveComment = ( (newComment, allComments) => {
    let comments = allComments[newComment.practitionerId];
    if (!comments){
        // First comment for this practitioner
        comments = {};
        allComments[newComment.practitionerId] = comments;
    }

    if (newComment.parentId){
        // Comment is a response. 
        const parent = comments[newComment.parentId];
        const responses = [...parent.responses];
        responses.push(newComment);
        parent.responses = responses;
    }
    else {
        // Insert as a new parent comment
        comments[newComment.id] = {comment: newComment, responses: []}
    }
    return {
        allComments: allComments
    }
})

/** 
 * Stores all comments for a given practitioner in the comments map.
 * The comments are ordered earliest to latest, with responses nested within each 
 * 
 * @param allComments map of practitionerId to all comments for the practitioner
 * @param practitionerId id of a practitionr 
 * @param comments all comments for the practitioner
 * @return the updated map
 */
const storePractitionerComments = (allComments, practitionerId, comments) => {
    // Extract all level 1 comments
    const level1 = comments.filter( comment => {
        return !comment.parentId
    });
    // Sort by ascending date
    level1.sort( (a, b) => {
        return a.date.getTime() - b.date.getTime();
    });
    // Map of id to "comment block", an object containing the level1 comment array for its children
    const map = level1.reduce(( map, comment) => {
        map[comment.id] = { comment: comment, responses: []}
        return map;
    }, {});

    for (let id in map){
        // Find all responses, and sort by date
        const responses = comments.filter( comment => {
            // eslint-disable-next-line
            return comment.parentId == id;
        });
        responses.sort( (a, b) => {
            return a.date.getTime() - b.date.getTime();
        });
        map[id].responses = responses;
    }
    allComments[practitionerId] = map;
    return allComments;
}

export default commentReducer;

