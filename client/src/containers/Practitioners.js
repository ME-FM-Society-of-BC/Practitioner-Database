/**
 * Implements the Practitioner List View
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PractitionerListItem from '../components/PractitionerListItem';
import { STORE_PRACTITIONERS, STORE_PRACTITIONER_ID_MAP} from '../store/practitionerActions';
import { STORE_ALL_RECOMMENDATION_ACTIONS} from '../store/evaluationActions';
import { mapIdsToIndices } from '../common/utilities';

class Practitioners extends Component {

    constructor(props) {
        super(props);
        this.selectHandler = this.selectHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.practitioners.length === 0){
            // Perform an initial fetch of all practitioners
            axios.get('/practitioners')
                .then(response => {
                    // Augment each practitioner object with specialty text,
                    // and its array index 
                    const practitioners = response.data.map((practitioner, index) => {
                        return {
                            ...practitioner,
                            specialty: this.props.specialties.idToValue[practitioner.specialtyId],
                            arrayIndex: index
                        }
                    });
                    // Dispatch practitioners to the store
                    this.props.storePractitioners(practitioners);
                    
                    // Create a map of practitioner ids to their index in the 
                    // practitioners array, and dispatch to store
                    const map = mapIdsToIndices(practitioners);
                    this.props.storePractitionerIdMap(map);            
                })
                .catch (error => {
                    console.log(error);
                    alert(error)
                }
                );
        } 
    }

    render() {
        return (
            <>
            <table id='practitioner-list'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Specialty</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.practitioners.map((practitioner, index) => {
                        return <PractitionerListItem 
                            p={practitioner} 
                            select={() => this.selectHandler(index)} 
                            key={practitioner.id} />
                    }, this)}
                </tbody>
            </table>
            </>
        )
    }

    // Handles clicks on the View button in the child PractitionerListItem component
    selectHandler = (index) => {
        const practitionerId = this.props.practitioners[index].id;

        axios.get('/actions/' + practitionerId)
        .then(response => {
            const userId = this.props.loggedInUser ? this.props.loggedInUser.id : null;
            this.props.storeAllRecommendationActions(response.data, practitionerId, userId);
        })
        .then(() => {
            // Go to the Practitioner View      
            this.props.history.push(this.props.match.url + '/' + practitionerId);
        });
    }
}

const mapStateToProps = state => {
    return {
        practitioners: state.practitionersReducer.practitioners,
        specialties: state.practitionersReducer.specialties,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storePractitioners: (practitioners) => dispatch({ type: STORE_PRACTITIONERS, practitioners: practitioners }),
        storePractitionerIdMap: (map) => dispatch({ type: STORE_PRACTITIONER_ID_MAP, idMap: map }),
        storeAllRecommendationActions: (allRecommendations, practitionerId, userId) => dispatch({ 
            type: STORE_ALL_RECOMMENDATION_ACTIONS, 
            allRecommendations: allRecommendations, 
            practitionerId: practitionerId,
            userId: userId 
        })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Practitioners);