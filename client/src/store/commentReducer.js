/**
* This reducer deals with all state related to practitioner comments
*/
import * as actions from './commentActions';

const initialState = {
    // All comments, keyed on practitionerId
    allComments: {} 
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {

        // Store all comments on a given practitioner
        case actions.STORE_COMMENTS:
            return {
                allComments: orderComments({...state.allComments}, action)
            }
        
        case actions.SAVE_COMMENT:
            const newComment = action.comment;
            const allComments = {...state.allComments};
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
        
        default: 
            return state;
    }
}

/** Orders and nests a practitioner's comments earliest to latest, with responses nested */
const orderComments = (allComments, action) => {
    const practitionerId = action.practitionerId;

    // Convert received date strings to Date objects
    // Incoming format is YYYY-MM-DDThh:mm:ss.mmmZ[UTC], must change to YYYY-MM-DDThh:mm:ssZ 
    action.comments.forEach( comment => {
        comment.date = new Date(comment.date.split(".")[0] + 'Z');
    });
    // Extract all level 1 comments
    const level1 = action.comments.filter( comment => {
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
        const responses = action.comments.filter( comment => {
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

