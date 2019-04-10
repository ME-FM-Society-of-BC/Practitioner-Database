/**
 * Implements the Practitioner List View
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PractitionerListItem from '../components/PractitionerListItem';
import { STORE_PRACTITIONERS } from '../store/practitionerActions';
import { STORE_COMMENTS } from '../store/commentActions';
import { STORE_ALL_RECOMMENDATION_ACTIONS} from '../store/evaluationActions';
import { Button } from 'react-bootstrap';

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
            {this.props.loggedInUser ?
                <Button type="button" key='1' className='button-large' onClick={this.recommend}>
                    Recommend a Practitioner
                </Button>
                : ''
            }
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

    // Responds to the the "Recommend a Pratitioner" button
    recommend = () => {
        // Go to the Practitioner View. The negative id value in 
        // the path signifies a practitioner is being created    
        this.props.history.push(this.props.match.url + '/-1');
    }

    // Handles selection of a Practitioner in a child PractitionerListItem component
    selectHandler = (index) => {
        const practitionerId = this.props.practitioners[index].id;
        const userId = this.props.loggedInUser ? this.props.loggedInUser.id : null;

        // The Practitioner may have been selected before, so only fetch actions
        // or comments if they were not previously fetched 
        // Fetch all the recommendation actions for this practitioner
        axios.get('/actions/' + practitionerId)
        .then(response => {
            this.props.storeAllRecommendationActions(response.data, practitionerId, userId);
        })
        .then(() => {
            // Fetch all the comments on this practitioner
            // TODO Figure out how to perform either or both fetches concurrently
            axios.get('/comments/' + practitionerId)
        })
        .then(response => {
            if (response){
                // Why is reponse null if list is empty? Should be identical behaviour to comments request
                this.props.storeComments(response.data, practitionerId);
            }
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
        loggedInUser: state.userReducer.loggedInUser,
        allRecommendations: state.evaluationReducer.allRecommendations
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storePractitioners: (practitioners) => dispatch({ type: STORE_PRACTITIONERS, practitioners: practitioners }),
        storeAllRecommendationActions: (allRecommendations, practitionerId, userId) => dispatch({ 
            type: STORE_ALL_RECOMMENDATION_ACTIONS, 
            allRecommendations: allRecommendations, 
            practitionerId: practitionerId,
            userId: userId 
        }),
        storeComments: (comments, practitionerId) => dispatch({ 
            type: STORE_COMMENTS, 
            comments: comments, 
            practitionerId: practitionerId 
        })

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Practitioners);