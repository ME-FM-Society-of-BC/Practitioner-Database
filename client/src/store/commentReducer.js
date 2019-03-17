/**
* This reducer deals with all state related to practitioner comments
*/
import * as actions from './commentActions';

const initialState = {
    // All comments, keyed on practitionerId
    allComments: {} 
}

const evaluationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.STORE_COMMENTS:
            return {
                ...state,
                allComments: action.comments
            }
        
        case actions.ADD_COMMENT:
            const practitionerId = action.recommendation.practitionerId;
            const userId = action.recommendation.userId;
            let allRecommendations = {...state.allRecommendations};
            
            const forThisPractitioner = [...allRecommendations[practitionerId]];
            let isReplacement = false;
            let newForThisPractitioner = forThisPractitioner.map(recommendation => {
                // Ignore if not a rating or action was by another user
                if (recommendation.actionType !== 'RATE'){
                    return recommendation
                };
                if (recommendation.userId !== userId){
                    return recommendation
                };
                // Look for a matching questionId
                if (action.recommendation.questionId == recommendation.questionId){
                    // Replace the previous rating value
                    isReplacement = true;
                    return {...recommendation, value: action.recommendation.value}
                }
                return recommendation;
            })
            // If not replacement of an old value, add it
            if (!isReplacement){
                newForThisPractitioner.push(action.recommendation)
            }
            allRecommendations[practitionerId] = newForThisPractitioner;
            
            // Now re-calculate all user actions
            allActionsAndAnswers = findUserActionsAndAnswers(userId, newForThisPractitioner);
            
            return {
                ...state,
                allRecommendations,
                userActions: allActionsAndAnswers.userActions,
                userAnswers: allActionsAndAnswers.userAnswers,
                allAnswers: allActionsAndAnswers.allAnswers
            };

        default: 
            return state;
    }
}

