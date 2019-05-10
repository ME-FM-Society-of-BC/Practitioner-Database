/**
 * An administrator uses this view to assign moderators to a region (e.g. in Canada, a province)
 * 
 */
import React, { Component } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import NewModerator from '../components/NewModerator';
import ModeratorList from '../components/ModeratorList';
import axios from 'axios';
import * as actions from '../store/userActions';
import { CircleSpinner } from "react-spinners-kit";

class Moderators extends Component {

    state = {};

    constructor(props){
        super(props);

        this.state.moderator = {
            province: ''
        }
        this.state.user = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            role: 'MODERATOR'
        }
//        this.state.loading = true;
        
        this.createModerator = this.createModerator.bind(this);
        this.onChange = this.onChange.bind(this);
        this.selectProvince = this.selectProvince.bind(this);
    }

    // componentDidMount(){
    //     // Fetch all moderators
    //     axios.get('/moderators')
    //     .then(response => {
    //         this.setState({
    //             loading: false,
    //             moderators: response.data
    //         });
    //     })
    //     .catch (error => {
    //         console.log(error);
    //     })
    // }

    onChange = (event) => {
        this.setState({errorMessage: null});
        const {name, value} = event.target;
        const user = {...this.state.user}
        user[name] = value;
        this.setState({
            user
        });
    }

    selectProvince = (event) => {
        this.setState({
            moderator: {province: event.target.value}
        });
    }

    createModerator(){
        // First create the user account
        axios.post('/users', this.state.user)
        .then(response => {
            // Store in Redux
            const user = {...this.state.user, id: response.data}
            this.props.saveNewModeratorUser(user)
            
            // Now create the moderator
            const moderator = {...this.state.moderator, userId: response.data}
            this.props.saveNewModerator(moderator);
            
            this.setState({
                user: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    role: 'MODERATOR'
                },
                moderator: {
                    province: ''
                }
            });
        })
    }

    render(){
        // Display spinner until all required data are obtained from the server 
        if (this.state.loading){
            return (
                <div className='spinner-container'>
                    <CircleSpinner size={80} color="#686769" loading={this.state.loading}></CircleSpinner>
                </div>
            )
        }

        return (
            <>
            <PanelGroup accordion id="moderators">
                <Panel eventKey="1">
                    <Panel.Heading>
                        <Panel.Title toggle>Create Moderator Account</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <NewModerator
                            username={this.state.user.username} 
                            password={this.state.user.password} 
                            confirmPassword={this.state.user.confirmPassword} 
                            email={this.state.user.email} 
                            province={this.state.moderator.province}
                            provinces={this.props.provinces}
                            onCreate={this.createModerator}
                            onChange = {this.onChange}
                            onSelect ={this.selectProvince} />
                    </Panel.Body>
                </Panel>
            </PanelGroup>
            <Panel>
                <Panel.Heading>
                    <Panel.Title >View Moderators</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <ModeratorList moderators = {this.props.moderators} users = {this.props.allUsers}/>
                </Panel.Body>
            </Panel>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        provinces: state.locationReducer.provinces,
        allUsers: state.userReducer.allUsers,
        moderators: state.userReducer.moderators
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveNewModeratorUser: user => dispatch({ type: actions.STORE_NEW_USER, user }),
        saveNewModerator: moderator => dispatch(actions.saveModerator(moderator))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Moderators);
