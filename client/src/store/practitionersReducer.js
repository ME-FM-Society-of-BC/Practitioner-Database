/**
 * This reducer deals with all state related to practitioners, 
 * practitioner evaluations and practitioner comments
 */
import * as actions from './practitionerActions';
import { mapIdsToIndices } from '../common/utilities';

const initialState = {
    allPractitioners: [],
    specialties: null,
    matchingPractitioners: [],
    idsToIndices: {},
}

const practitionersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.STORE_PRACTITIONERS:   return storePractitioners(state, action.practitioners);
        case actions.STORE_SPECIALTIES:     return storeSpecialties(state, action.specialties);
        case actions.CREATE_PRACTITIONER:   return createPractitioner(state, action.practitioner);
        case actions.UPDATE_PRACTITIONER:   return updatePractitioner(state, action.practitioner);
        case actions.SAVE_SEARCH_RESULTS:   return saveSearchResults(state, action.matchingPractitioners)
        
        default: return state;
    }
};

const storePractitioners = (state, practitioners) => {
    // Add the specialty text to each practitioner
    const allPractitioners = practitioners.map((practitioner) => {
        return {
            ...practitioner,
            specialty: state.specialties.idToValue[practitioner.specialtyId]
        }
    });
    // Create a map of practitioner ids to their index in the practitioners array
    const idsToIndices = mapIdsToIndices(practitioners);

    return {
        ...state,
        allPractitioners,
        idsToIndices
    }
}

const storeSpecialties = (state, specialties) => {
    return {
        ...state,
        specialties: convertSpecialties(specialties)
    }
}

const updatePractitioner = (state, practitioner) => {
    let newState = { ...state };
    const index = newState.idsToIndices[practitioner.id];
    newState.allPractitioners[index] = practitioner;
    return newState;
}

const createPractitioner = (state, practitioner) => {
    let newState = { ...state };
    newState.allPractitioners.push(practitioner);
    newState.idsToIndices[practitioner.id] = newState.allPractitioners.length - 1;
    return newState;
}

const saveSearchResults = (state, matchingPractitioners) => {
    return {
        ...state,
        matchingPractitioners
    }
}

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