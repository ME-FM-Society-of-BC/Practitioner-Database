/**
 * This reducer deals with all state related to practitioners, 
 * practitioner evaluations and practitioner comments
 */
import * as actions from './practitionerActions';

const initialState = {
    practitioners: [],
    specialties: null,
    practitionerIdsToIndices: {}
}

const practitionersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.STORE_PRACTITIONERS:
            return {
                ...state,
                practitioners: state.practitioners.concat(action.practitioners)
            }
        case actions.STORE_SPECIALTIES:

            return {
                ...state,
                specialties: convertSpecialties(action.specialties)
            }
        case actions.STORE_PRACTITIONER_ID_MAP:
            return {
                ...state,
                practitionerIdsToIndices: action.idMap
            }
        case actions.UPDATE_PRACTITIONER:
            const newState = { ...state };
            const updatedPractitioner = action.practitioner;
            const index = newState.practitionerIdsToIndices[updatedPractitioner.id];
            newState.practitioners[index] = updatedPractitioner;
            return newState;

        default: return state;
    }
};

const convertSpecialties = (specialtiesIn => {
    // Specialties need to be accessed in three forms - as an array of the
    // specialty text value for use in drop down selectors, as a map 
    // the text value to the specialty id. and vice-versa
    const specialtyText = specialtiesIn.map(specialty => specialty.text);
    const valueToId = {};
    const idToValue = {}
    specialtiesIn.forEach(specialty => {
        valueToId[specialty.text] = specialty.id;
        idToValue[specialty.id] = specialty.text;
    });
    const specialties = {
        text: specialtyText,
        valueToId: valueToId,
        idToValue: idToValue
    };
    return specialties;

});

export default practitionersReducer;