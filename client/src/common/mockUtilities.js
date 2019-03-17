/**
 * A central location for functions used during development for 'mocking'
 * the REST API functions which are not supported by the JsonServer  
 */

/**
 * Fetches all RecommendationAction entities performed by 
 * any users, for a given practitioner
 */
export const getAllRecommendationActions = practitionerId => {
    const actions = [
        action(1, 1, 0),
        action(1, 1, 0),
        action(1, 1, 1),
        action(1, 1),
        action(1, 2, 0),
        action(1, 2, 0),
        action(1, 2, 1),
        action(1, 1, 1),
        action(1, 1),
        action(1, 2, 0),
        action(1, 2, 0),
        action(1, 2, 1),
        action(1, 2, 1),
        action(1, 4, 0),
        action(1, 4, 0),
        action(1, 4, 3),
        action(1, 4, 3),
        action(1, 4, 3),
        action(1, 4, 0),
        action(1, 4, 2),
        action(1, 1),
        action(2, 2, 0),
        action(2, 2, 0),
        action(2, 2, 1),
        action(2, 2, 1),
        action(2, 4, 0),
        action(2, 4, 0),
        action(2, 4, 3),
        action(2, 4, 3),
        action(2, 4, 3)
    ]
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(actions);
        }, 10);
      });
}

/**
 * Fetches all RecommendationAction entities for a given practitioner
 * performed by the current user
 */
export const getUserRecommendationActions = practitionerId => {
    const actions = [
        action(1, 1, 0),
        action(1, 2, 0),
        action(1, 4, 5),
        action(2, 1, 0),
        action(2, 2, 0),
        action(2, 3, 4),
        action(2, 4, 2),
        action(2, 5, 0),
        action(2, 6, 0),
        action(2, 7, 3),
        action(1, undefined, undefined, 'create')
    ]
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(actions);
        }, 10);
      });
}


const action = (userId, questionId, value, type) => {
    return {
        actionType: type ? type : 'RATE',
        questionId: questionId,
        value: value ? value : null,
        date: 'n/a',
        userId: userId,
        practitionerId: 1   
    }
}
