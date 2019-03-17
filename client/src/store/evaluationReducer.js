/**
* This reducer deals with all state related to practitioner evaluations
*/
import * as actions from './evaluationActions';

const initialState = {
    questions: [],
    questionGroups: [],
    questionChoices: [],
    allRecommendations: {},
    userActions: [],
    userAnswers: {},
    allAnswers: {}
}

const evaluationReducer = (state = initialState, action) => {

    let allActionsAndAnswers = null;

    switch (action.type) {
        case actions.STORE_QUESTIONS:
            return {
                ...state,
                questions: state.questions.concat(action.questions)
            }
        
        case actions.STORE_QUESTION_GROUPS:
            return {
                ...state,
                questionGroups: state.questionGroups.concat(action.questionGroups)
            }
        
        case actions.STORE_QUESTION_CHOICES:
            return {
                ...state,
                questionChoices: state.questionChoices.concat(action.questionChoices)
            }
            
        case actions.STORE_ALL_RECOMMENDATION_ACTIONS:
            // Stores all actions by all users for a practitioner, received from the server
            const newAllRecommendations = {...state.allRecommendations};
            newAllRecommendations[action.practitionerId] = action.allRecommendations;

            // Save rating recommendation answers in separate             
            allActionsAndAnswers = findUserActionsAndAnswers(action.userId, action.allRecommendations);
            return {
                ...state,
                allRecommendations: newAllRecommendations,
                userActions: allActionsAndAnswers.userActions,
                userAnswers: allActionsAndAnswers.userAnswers,
                allAnswers: allActionsAndAnswers.allAnswers
            }
        
        case actions.SAVE_USER_RATING_ACTION:
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

    
/** 
* Finds all actions by a given user, and all rating actions from within
* the actions
* @param userId
* @param allActions all recommnedationActions for a practitioner
* @return {userActions, userAnswers, allAnswers}
*/
const findUserActionsAndAnswers = (userId, allActions) => {
    // Find all actions by the user
    const userActions = userId ?
        allActions.filter(action =>{
            return action.userId === userId 
        })
        : [];
    
    // Find all answers by the user, and convert it to a map of questionId to question
    const userAnswers = userActions.length > 0 ?
        userActions.filter(action =>{
            return action.actionType = 'RATE' 
        })
        .reduce((map, answer) => {
            map[answer.questionId] = answer;
            return map;
        }, {}) : {};

    // Convert all answers by all users into a map of question id to an array of answer values 
    const allAnswers = allActions.reduce((map, recommendation) => {
        if (!map[recommendation.questionId]){
            map[recommendation.questionId] = [];
        }
        if (recommendation.value){
            map[recommendation.questionId].push(recommendation.value);
        }
        return map;
    }, {});
    
    return {
        userActions: userActions,
        userAnswers: userAnswers,
        allAnswers: allAnswers
    }
}
        
export default evaluationReducer;