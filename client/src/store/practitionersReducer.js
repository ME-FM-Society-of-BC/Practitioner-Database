/**
 * This reducer deals with all state related to practitioners, 
 * practitioner evaluations and practitioner comments
 */
import * as actions from './practitionerActions';
import { mapIdsToIndices } from '../common/utilities';

const initialState = {
    practitioners: [],
    specialties: null,
    practitionerIdsToIndices: {}
}

const practitionersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.STORE_PRACTITIONERS:
            // Add the specialty text to each practitioner
            const practitioners = action.practitioners.map((practitioner) => {
                return {
                    ...practitioner,
                    specialty: state.specialties.idToValue[practitioner.specialtyId]
                }
            });
            // Create a map of practitioner ids to their index in the practitioners array
            const idsToIndices = mapIdsToIndices(action.practitioners);
            return {
                ...state,
                practitioners: practitioners,
                practitionerIdsToIndices: idsToIndices
            }

        case actions.STORE_SPECIALTIES:
            return {
                ...state,
                specialties: convertSpecialties(action.specialties)
            }

        case actions.UPDATE_PRACTITIONER:
            let newState = { ...state };
            const updatedPractitioner = action.practitioner;
            const index = newState.practitionerIdsToIndices[updatedPractitioner.id];
            newState.practitioners[index] = updatedPractitioner;
            return newState;

        case actions.CREATE_PRACTITIONER:
            newState = { ...state };
            const newPractitioner = action.practitioner;
            newState.practitioners.push(newPractitioner);
            newState.practitionerIdsToIndices[newPractitioner.id] = newState.practitioners.length - 1;
            return newState;

        case actions.SAVE_SEARCH_RESULTS:
        return {
            ...state,
            matchingPractitioners: action.matchingPractitioners
        }
        
        default: 
            return state;
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