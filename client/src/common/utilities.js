/**
 * Common utility functions
 */

 /**
  * Manages keystrokes entered in a postal code field. The purpose is
  * to coerce the value into the format 'V0V-0V0'
  * @param value the value of the entry field after the keystroke
  * @return the postal code field after the rules have been applied
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
    else if (value.length === 6 && value[3] !== '-'){
        // User has pasted postal code with neither blank nor dash
        value = value.substring(0, 3) + '-' + value.substring(3, 6)
    }
    else if (value.length === 7){
        // User pasted postal code with blank
        value = value.replace(' ','-');
    }
    else if (value.length === 8){
        value = value.substring(0, 7);
    }
    return value
}

 /**
 * Given an array of entities, creates a map of the entity id to the the entity's
 * index in the array. 
 * @param entityArray an array of entity objects
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
 * Given an array of entities, creates a map of the entity id to the the entity 
 * @param entityArray an array of entity objects
 * @return the map 
 */
export const mapIdsToEntities = entityArray => {
    if (!entityArray || entityArray.length === 0){
        return {};
    }
    return entityArray.reduce((map, entity) => {
        map[entity.id] = entity;
        return map;
    }, {});
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

