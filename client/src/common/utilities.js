/**
 * Common utility functions
 */

 export const handlePostalCode = value =>{
    value = value.toUpperCase();
    if (value.endsWith(' ')){
        value = value.replace(' ','-');
    }
    if (value.length === 4){
        if (value.charAt(3) !== '-'){
            value = value.substring(0, 3) + '-' + value.charAt(3);
        }
    }
    else if (value.length === 8){
        value = value.substring(0, 7);
    }
    return value
 }

 /**
 * Given an array of entities, creates a map of the entity id to the the entity's
 * index in the array
 * @param {*} entityArray
 * @return the map 
 */
export const mapIdsToIndices = entityArray => {
    const map = {};
    entityArray.forEach((entity, index) => {
        map[entity.id] = index;
    });
    return map;
}

/**
 * Translates the dimension string argument defined for form fields
 * @param dimensions the dimensions string
 */
export const parseDimensions = dimensions => {
    if (dimensions) {
        const d = dimensions.split(',');
        return {
            labelWidth: 'col-sm-' + d[0],
            valueWidth: 'col-sm-' + d[1],
            labelOffset: 'col-sm-offset-' + d[3] 
        }
    }
    else return {
        labelWidth: 'col-sm-3',
        valueWidth: 'col-sm-9',
        labelOffset: 'col-sm-offset-0' 
    }
}

/**
 * Combines the Question and QuestionGroup entities. 
 * @param {*} questions array of Question entities
 * @param {*} groups array of QuestionGroup entities
 * @returns an array {title, members} where 
 *          title = the QuestionGroup title
 *          members = array of Questions comprising the group
 */
export const createQuestionGroups = (questions, groups) =>{
    const groupTitles = {};
    groups.forEach(group => {
        groupTitles[group.id] = group.title;
    });

    const assembledGroups = {};
    questions.forEach(question => {
        if (question.questionGroupId){
            let questionGroup = assembledGroups[question.questionGroupId];
            if (!questionGroup){
                questionGroup = {
                    title: groupTitles[question.questionGroupId],
                    members: []
                }
                assembledGroups[question.questionGroupId] = questionGroup;
            }
            questionGroup.members.push({question})
        } 
    });
    return assembledGroups;
}

/**
 * Create the option lists used in the Selector components
 * @param {*} questionChoices array of QuestionChoice entities
 * @return map of questionChoiceSetId to the array of choice item strings  
 */
export const createQuestionChoiceSets = (questionChoices) => {
    const choiceSets = {};
    questionChoices.forEach(choice => {
        const setId = choice.questionChoiceSetId;
        if (!choiceSets[setId]){
            choiceSets[setId] = [];
        }
        choiceSets[setId].push(choice.text);
    });
    return choiceSets;
}
