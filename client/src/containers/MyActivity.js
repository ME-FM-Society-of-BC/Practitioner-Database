/**
 * Implements the MyActivity View
 */
import React, { Component } from 'react';
import Instructions from '../components/Instructions';
import { connect } from 'react-redux';
import axios from 'axios';
import { mapIdsToEntities } from '../common/utilities';
import Activity from '../components/Activity';
import { Panel } from 'react-bootstrap';

class MyActivity extends Component {

    state = {}

    constructor(props){
        super(props);
        this.state.practitioners = mapIdsToEntities(this.props.allPractitioners);
    }

    componentDidMount(){
        axios.get('/actions/?userId=' + this.props.loggedInUser.id)
        .then(response => {
            let actions = response.data;
            if (actions.length > 0){
                actions = actions.sort( (a, b) => {
                    return a.date - b.date;
                });
            }
            this.setState({actions});
        })
    }

    render() {
        if (!this.state.actions){
            return (<div>Actions!</div>)
        }
        if (this.state.actions.length === 0){
            return (
            <Instructions width='80%'>
                <p>Welcome to the My Activity page. Here you will see a record of all the actions you can perform, such as</p>
                <div>
                    <ul>
                        <li>Add a practitioner to the site</li>
                        <li>Edit practitioner information (address, phone, etc.) previously entered by you or another user</li>
                        <li>Rate a practitioner</li>
                        <li>Comment on a practitioner or respond to a comment by another user</li>
                    </ul>
                </div>
                <p>As of now, you have not performed any actions</p>
            </Instructions>
            )
        }
        else {
            const types = {
                'CREATE'    : 'Added practitioner ',
                'EDIT'      : 'Edited the information on ',
                'RATE'      : 'Rated ',
                'COMMENT'   : 'Commented about '
            };
            const panelStyle = {
                width:'90%',
                margin: 'auto',
            };
    
            return (

            <Panel style={panelStyle}>
                <Panel.Heading>
                    <Panel.Title toggle>My Activity</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div>
                    {
                    this.state.actions.map( action => {
                        const date = (new Date(action.date)).toDateString().substring(4);
                        const practitionerName = this.state.practitioners[action.practitionerId].firstName + ' ' 
                            + this.state.practitioners[action.practitionerId].lastName + '. ';
                        const type = action.actionType;
                        const description = types[type].concat(practitionerName);
                        return <Activity type={action.type} date={date} description={description} key={action.id}/>
                    })
                    }
                    </div>
                </Panel.Body>
            </Panel>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        allPractitioners: state.practitionersReducer.allPractitioners
     }
}

export default connect(mapStateToProps)(MyActivity);