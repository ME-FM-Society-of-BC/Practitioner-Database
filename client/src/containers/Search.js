/**
 * Implements the Search View
 */
import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import Selector from '../components/Selector';
import EditableText from '../components/EditableText';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../store/practitionerActions';
import { STORE_PRACTITIONERS } from '../store/practitionerActions';

class Search extends Component {

    state = {
        postalCode: '',
        lastName: '',
        firstName: '',
        city: '',
        province: '',
        specialty: '',
        cityOptions: []
    };

    constructor(props){
        super(props);
        this.onChange= this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.searchFull = this.searchFull.bind(this);
        this.searchQuick = this.searchQuick.bind(this);
    }

    onChange = (event) => {     
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    onSelect(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
        if (name === 'province'){
            this.setState({
                cityOptions: this.props.citiesMap[value]
            })
        }
    }

    // Search by criteria
    searchFull(){
        if (this.state.postalCode.length  > 0 && this.state.postalCode.length < 6){ // TODO localization
            this.setState({errorMessage: 'That is not valid postal code'});
            return;
        }
        this.setState({errorMessage: null});
        let searchParams = this.assembleSearchString(['lastName', 'firstName', 'city', 'province', 'specialty']);
        
        if (searchParams.length === 0){
            if (this.state.postalCode){
                // Postal code only- just like Quick Search
                this.searchQuick();
            }
            else {
                // Neither postal code not parameters entered
                return;
            }
        }
        else {
            // Remove trailing '|';
            searchParams = searchParams.substring(0, searchParams.length - 1);
            // First search for practitioners matching the criteria
            axios.get('/practitioners/search?' + searchParams)
            .then(response => {
                if (response.data.length === 0){
                    this.setState({errorMessage: 'No practioners were found matching those criteria'});
                    return;
                }
                 if (this.state.postalCode){
                    this.getDistancesAndShow(this.state.postalCode, response.data);
                }
                else {
                    this.storeAndProceed(response.data);
                }
            })
        }
    }

    assembleSearchString(fieldsToCheck){
        return fieldsToCheck.reduce((string, fieldName) => {
            let value;
            if (fieldName === 'specialty'){
                if (this.state.specialty){
                    return string.concat('specialtyId=')
                    .concat(this.props.specialties.valueToId[this.state.specialty])
                    .concat('|');
                }
                else {
                    return string;
                }
            }
            else {
                return string.concat(this.state[fieldName] ? fieldName + '=' + value +  '|' : '');
            }
        }, '');
    }

    // Search by postal code only
    searchQuick(){
        if (this.state.postalCode.length < 6){ // TODO localization
            this.setState({errorMessage: 'You must enter a valid postal code'});
            return;
        }
        this.setState({errorMessage: null});

        if (!this.props.practitioners || this.props.practitioners.length === 0){
            axios.get('/practitioners')
            .then(response => {
                this.getDistancesAndShow(this.state.postalCode, response.data);
            })
        }
        else {
            // TODO Decide when stale
            this.getDistancesAndShow(this.state.postalCode, this.props.practitioners);
        }
    }

    getDistancesAndShow(origin, practitioners){
        this.practitioners = practitioners; // TDO Must have here for call to insertDistances
        const practitionerIds = practitioners.map( practitioner => {
            return practitioner.id;
        })
        .reduce((concatenated, id, index, ids) => {
            concatenated = concatenated.concat(id).concat(index < ids.length - 1 ? '|' : '');
            return concatenated;
        }, '');

        axios.get('/maps?from=' + origin + '&to=' + practitionerIds)
        .then(response => {
            const distances = response.data;
            const badOriginPostalCode = distances.reduce((allBad, distance) => {
                return allBad && distance === 'Not found';
            }, true);

            if (badOriginPostalCode){
                 // Stay here and display message
                this.setState({errorMessage: 'You have entered a postal code which is invalid or cannot be found. Please try again'});
            }
            else {
                // Insert the distances and proceed to results page
                const practitioners = this.insertDistances(this.practitioners, distances);
                this.storeAndProceed(practitioners, true);
            }
        })
        .catch (error => {
            console.log(error);
            alert(error)
        }
        );
    }

    storeAndProceed(practitioners, withDistance){
        this.props.storePractitioners(practitioners);

        (new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve()
            }, 100)
        })).then(() => {
            const target = '/search-results' + (withDistance ? '?withDistance=true' : '');
            this.props.history.push('/search-results?withDistance=' + (withDistance ? 'true' : 'false')); 
        });

    }

    /** Inserts distances into the pratitioner objects */
    insertDistances(practitioners, distances){
        const matchingPractitioners = [...practitioners];
        for (let i = 0; i < matchingPractitioners.length; i++){
            matchingPractitioners[i].distance = distances[i]; 
        }
        return matchingPractitioners;
    }

    render() {
        const panelStyle = {
            width:'90%',
            margin: 'auto',
            marginBottom: '2em'
        };

        return (
            <Panel style={panelStyle}>
            <Panel.Body>
            <div className='horizontal-group'>
            <div className='vertical-group'>
                <h4>Search for Practitioners</h4>
                <div className='instructions'>
                    <p style={{maxWidth: '20em'}}>
                    To quickly search for any practitioners near you, just enter your postal code and click the Quick Search button
                    </p>
                </div>
                <EditableText valueClass='info-field' labelClass='info-label' 
                        label='Postal Code' value={this.state.postalCode} 
                        name='postalCode' changeHandler={this.onChange}/>
                <br/>
                <Button onClick={this.searchQuick}>Quick Search</Button>
                <br/>
                <div className='instructions'>
                    <p style={{maxWidth: '20em'}}>
                    You can also enter values for any of the following criteria, and click the Full Search button. 
                    If you also enter a postal code above, any practitioners matching the criteria
                    will be listed along with the distance 
                    </p>
                </div>
                <EditableText name='lastName' 
                    valueClass='info-field' labelClass='info-label' 
                    label='Last Name' value={this.state.lastName} 
                    changeHandler={this.onChange}
                    />
                <EditableText 
                    valueClass='info-field' labelClass='info-label' 
                    label='First Name' value={this.state.firstName} 
                    name='firstName' changeHandler={this.onChange}
                    />
                <Selector 
                    label='Specialty' valueClass='info-field' labelClass='info-label' name='specialty' 
                    options={this.props.specialties.text}
                    value={this.state.specialty} 
                    placeholder='Select ...'
                    onChange =  {(event) => this.onSelect(event)}
                    />
                <Selector 
                    label='Province' valueClass='info-field' labelClass='info-label' name='province'  
                    options={this.props.provinces}
                    value={this.state.province} 
                    placeholder='Select ...'
                    onChange =  {(event) => this.onSelect(event)}
                    />
                <Selector 
                    label='City' valueClass='info-field' labelClass='info-label' name='city' 
                    options={this.props.cities}
                    value={this.state.city} 
                    placeholder='Select after province...'
                    onChange =  {(event) => this.onSelect(event)}
                    />
                <br/>
                <Button onClick={this.searchFull}>Full Search</Button>
                {
                this.state.errorMessage ?
                    <div className='error-message'>{this.state.errorMessage}</div>
                    : ''
                }

            </div>
            </div>            
            </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        specialties: state.practitionersReducer.specialties,
        practitioners: state.practitionersReducer.practitioners,
        provinces: state.locationReducer.provinces,
        citiesMap: state.locationReducer.citiesMap
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveMatchingPractitioners: (practitioners) => dispatch({ type: actions.SAVE_SEARCH_RESULTS, matchingPractitioner: practitioners }),
        storePractitioners: (practitioners) => dispatch({ type: STORE_PRACTITIONERS, practitioners: practitioners })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);