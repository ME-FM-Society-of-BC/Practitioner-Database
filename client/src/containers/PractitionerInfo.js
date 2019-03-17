/**
 * Implements the Practitioner Information View
 */
import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import Selector from '../components/Selector';
import EditableText from '../components/EditableText';
import * as actions from '../store/practitionerActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class PractitionerInfo extends Component {
    state = {}

    constructor(props){
        super(props);
        // Find the index in the practioners array given the practitioner id
        const index = props.idToIndex[props.match.params.id]
        
        this.state = {
            practitioner: props.practitioners[index],
                
            // If the user is logged , the Edit/Save buttons not be displayed
            canEdit: props.loggedInUser ? true : false,

            // When user saves, update will be sent to server only if there are changes 
            infoChanged: false,

            mode: 'view'
        };

        this.enableEdit = this.enableEdit.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
        this.selectSpecialty = this.selectSpecialty.bind(this);
        this.changeTextValue = this.changeTextValue.bind(this);
    }

    selectSpecialty(event) {
        const alteredPractitioner = {
            ...this.state.practitioner,
            specialty: event.target.value,
            specialtyId: this.props.specialties.valueToId[event.target.value]
        }
        this.setState({
            ...this.state,
            practitioner: alteredPractitioner,
            infoChanged: true
        })
    }

    changeTextValue(event, attribute) {
        const alteredPractitioner = {...this.state.practitioner};
        alteredPractitioner[attribute] = event.target.value;
        this.setState({
            ...this.state,
            practitioner: alteredPractitioner,
            infoChanged: true
        })
    }
 
    enableEdit(){
        this.setState({
            ...this.state,
            mode:'edit'
        });
    }
    saveInfo(){
        if (this.state.infoChanged){
            this.props.updatePractitioner(this.state.practitioner);
        }
        this.setState({
            ...this.state,
            mode:'view'
        });
    }

    render() {
        const panelStyle = {
            width:'90%',
            margin: 'auto'
        };
        return (
            <Panel style={panelStyle}>
                <Panel.Body>
                <div className='horizontal-group'>
                <div className='vertical-group'>
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='Last Name'  mode={this.state.mode} value={this.state.practitioner.lastName} placeholder='Last name'
                        attribute='lastName' changeHandler =  {(event) => this.changeTextValue(event, 'lastName')}/>
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='First Name'  mode={this.state.mode} value={this.state.practitioner.firstName} placeholder='First name'
                        attribute='firstName' changeHandler =  {(event) => this.changeTextValue(event, 'firstName')}/>
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='Address'  mode={this.state.mode} value={this.state.practitioner.address} placeholder='Street address'
                        attribute='address' changeHandler =  {(event) => this.changeTextValue(event, 'address')}/>
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='City'  mode={this.state.mode} value={this.state.practitioner.city} placeholder='City or town'
                        attribute='city' changeHandler =  {(event) => this.changeTextValue(event, 'city')}/>
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='Province'  mode={this.state.mode} value={this.state.practitioner.province} placeholder='Province'
                        attribute='province' changeHandler =  {(event) => this.changeTextValue(event, 'province')}/>
                </div>
                <div className='vertical-group'>    
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='Country'  mode={this.state.mode} value={this.state.practitioner.country} placeholder='Country'
                        attribute='country' changeHandler =  {(event) => this.changeTextValue(event, 'country')}/>
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='Postal Code'  mode={this.state.mode} value={this.state.practitioner.postalCode} placeholder='Postal code'
                        attribute='postalCode' changeHandler =  {(event) => this.changeTextValue(event, 'postalCode')}/>
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='Phone'  mode={this.state.mode} value={this.state.practitioner.phone} placeholder='Phone number'
                        attribute='phone' changeHandler =  {(event) => this.changeTextValue(event, 'phone')}/>
                    <EditableText valueClass='info-field' labelClass='info-label' 
                        label='Website'  mode={this.state.mode} value={this.state.practitioner.website} placeholder='Website'
                        attribute='website' changeHandler =  {(event) => this.changeTextValue(event, 'website')}/>
 
                    <Selector label='Specialty'
                        valueClass='info-field' labelClass='info-label'  
                        mode={this.state.mode} 
                        options={this.props.specialties.text}
                        value={this.state.practitioner.specialty} 
                        placeholder='Select one...'
                        onChange =  {(event) => this.selectSpecialty(event)}/>
                    </div>
                    </div>

                    {this.state.canEdit ?
                        <div className='horizontal-group'>
                            {
                                this.state.mode === 'view' ?
                                <Button type="button" className='button-large' onClick={this.enableEdit}>Edit Practitioner Information</Button>
                                :
                                <Button type='button' className='button-large' onClick={this.saveInfo}>Save Practitioner Information</Button>
                            }
                        </div>
                    : <></>
                    }
                </Panel.Body>           
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        practitioners: state.practitionersReducer.practitioners,
        specialties: state.practitionersReducer.specialties,
        idToIndex: state.practitionersReducer.practitionerIdsToIndices,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updatePractitioner: (practitioner) => dispatch(actions.updatePractitioner(practitioner))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PractitionerInfo));
