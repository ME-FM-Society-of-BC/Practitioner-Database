/**
 * Implements the Practitioner Information View. The cascaded id from the url
 * specifies either an existing Practitioner id, or -1 if a Practitioner is being created.
 */
import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import Selector from '../components/Selector';
import EditableText from '../components/EditableText';
import * as actions from '../store/practitionerActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { CREATE_PRACTITIONER } from '../store/practitionerActions';

class PractitionerInfo extends Component {
    state = {}

    constructor(props){
        super(props);

        if (props.match.params.id >= 0){
            // An existing Practitioner os being displayed
            // Find the index in the practioners array given the practitioner id
            const index = props.idToIndex[props.match.params.id]

            // Set the city list options according to province
            const practitioner = props.practitioners[index];
            const cityOptions = practitioner.province ? this.props.citiesMap[practitioner.province]: [];
        
            this.state = {
                practitioner: practitioner,
                cityOptions: cityOptions,                
                // If the user is logged , the Edit/Save buttons not be displayed
                canEdit: props.loggedInUser ? true : false,
                // When user saves, update will be sent to server only if there are changes 
                infoChanged: false,
                mode: 'view'
            }
        }
        else {
            // A new Practitioner is being created
            this.state = {
                mode: 'create',
                practitioner: {}
            }
        }

        this.enableEdit = this.enableEdit.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
        this.saveNew = this.saveNew.bind(this);
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

    selectProvince(event){
        const practitioner = {...this.state.practitioner};
        practitioner.province = event.target.value;
        this.setState({
            ...this.state,
            practitioner: practitioner,
            cityOptions: this.props.citiesMap[event.target.value],
            infoChanged: true
        })
    }

    selectCity(event){
        const practitioner = {...this.state.practitioner};
        practitioner.city = event.target.value;
        this.setState({
            ...this.state,
            practitioner: practitioner,
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

    saveNew(){
        // New practitioner is sent to the server here rather than in the
        // reducer action, because the id is needed immediately for routing
        axios.post('/practitioners', this.state.practitioner)
            .then(response => {
                const practitioner = {...this.state.practitioner};
                practitioner.id = response.data;
                this.setState({
                    ...this.state,
                    practitioner: practitioner
                });
                this.props.saveNewPractitioner(this.state.practitioner);
                this.props.history.replace('/practitioners/' + this.state.practitioner.id + '?newPractitioner=true');
            })
           .catch(error => {
                console.log(error);
                alert(error);
            }
        );        

        this.setState({
            ...this.state,
            mode:'view',
            canEdit: true,
            infoChanged: false
        });
    }

    render() {
        const panelStyle = {
            width:'90%',
            margin: 'auto'
        };
        
        const queryParams = new URLSearchParams(this.props.location.search);
        let newPractitioner = false;
        for (let param of queryParams.entries()) {
            if (param[0] === 'newPractitioner'){
                newPractitioner = true
            }
        }
//  style={panelStyle}
        return (
            <Panel style={panelStyle}>
            <Panel.Body>
                {this.state.mode === 'create' ?
                    <div className='instructions'> 
                        Enter information for a new practitioner if you have checked that he or she is not already in the list.
                        You must provide at least first and last names, address and telephone number
                    </div>
                    : ''
                }
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
                    <Selector label='Province'
                        valueClass='info-field' labelClass='info-label'  
                        mode={this.state.mode} 
                        options={this.props.provinces}
                        value={this.state.practitioner.province} 
                        placeholder='Select ...'
                        onChange =  {(event) => this.selectProvince(event)}/>
                    <Selector label='City'
                        valueClass='info-field' labelClass='info-label'  
                        mode={this.state.mode} 
                        options={this.state.cityOptions}
                        value={this.state.practitioner.city} 
                        placeholder='Select after province...'
                        onChange =  {(event) => this.selectCity(event)}/>
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
                {this.state.mode === 'create' ?
                    <Button type="button" className='button-large' onClick={this.saveNew}>Save Practitioner Information</Button>
                    : ''
                }
                {newPractitioner === true ? 
                    <div>
                        You can now provide an evaluation for this Practitioner<br/>
                        Remember you can always return latyer and create or modify you evaluation
                    </div>
                : ''}
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
        loggedInUser: state.userReducer.loggedInUser,
        provinces: state.locationReducer.provinces,
        citiesMap: state.locationReducer.citiesMap
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updatePractitioner: (practitioner) => dispatch(actions.updatePractitioner(practitioner)),
        saveNewPractitioner: (practitioner) => dispatch({ type: CREATE_PRACTITIONER, practitioner: practitioner })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PractitionerInfo));
