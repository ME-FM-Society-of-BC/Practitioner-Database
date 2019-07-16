 /**
 * Implements the SignIn View
 */
import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import EditableText from './../components/EditableText';
import * as actions from '../store/userActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircleSpinner } from "react-spinners-kit";
import Registration from './Registration';
import axios from 'axios';
import Instructions from '../components/Instructions';
import decode  from 'jwt-decode';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = (event) => { 
        this.setState({errorMessage: null});    
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    signIn = () => {

        axios.post('/users/auth', this.state)
        .then((response) => {
            // Extract the token. Its claims are the username, role and id,
            const token = response.data;
            // Set request defaults to include Authorization header with the token
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            const user = decode(token);
            this.props.storeLoggedInUser(user);

            const target = user.role === 'ADMINISTRATOR' ? '/manage-moderators' 
                : (user.role === 'MODERATOR' ? '/pending-comments' : '/my-activity');

            this.props.history.push(target);
        })
        .catch(error => {
            if (error.response.status === 401){
                this.setState({
                    errorMessage: 'Invalid username or password',
                    loading: false
                });
            }
            else if (error.response.status === 403){
                this.setState({
                    errorMessage: 'Access forbidden. Your account has been suspended',
                    loading: false
                 });
            }
            // TODO 
            else {
                console.log(error);
            }            
        }); 
        this.setState({loading: true});       
    }

    requestReset = () => {
        this.props.history.push('/reset-request')
    }

    render() {
        const panelStyle = {
            width:'90%',
            margin: 'auto',
            marginBottom: '2em'
        };

        if (this.state.loading){
            return (
                <div className='spinner-container'>
                    <CircleSpinner size={80} color="#686769" loading={this.state.loading}></CircleSpinner>
                </div>
            )
        }


        return (
            <>
            <Panel style={panelStyle}>
            <Panel.Body>
                <Instructions width='40em'>
                Welcome to the MEFM Database. If you are a registered user, sign in below.
                If you are not registered, you are free to search for practitioners near you,
                or view our complete list of practitioners
                </Instructions>
                <div className='horizontal-group'>
                    <div className ='vertical-group'>
                        <EditableText   mode='edit'
                                        label='Username'
                                        name='username'
                                        labelClass='info-label info-label-reg'
                                        valueClass='info-field info-field-reg'
                                        value={this.state.username}
                                        placeholder='Username'
                                        changeHandler={this.onChange} />

                        <EditableText   mode='edit'
                                        type='password'
                                        label='Password'
                                        name='password'
                                        labelClass='info-label info-label-reg'
                                        valueClass='info-field info-field-reg'
                                        value={this.state.password}
                                        placeholder='Password'
                                        changeHandler={this.onChange} />

                        <Button type='button' className='button-large' onClick={this.signIn}>Sign In</Button>
                        {
                            this.state.errorMessage ? <div className='error-message'>{this.state.errorMessage}</div> : ''
                        }
                        <Instructions width='30em' paddingTop='30px'>
                        Forgot your username or password? <span className='execute' onClick={this.requestReset}>Click here</span>
                        </Instructions>

                    </div>
                </div>
            </Panel.Body>           
            </Panel>
            <Panel style={panelStyle}>
            <Panel.Body>
                <Instructions width='40em'>
                    Not registered? Sign up here if you want to recommend a practitioner, or 
                    provide feedback on your experience with a practitioner
                </Instructions>
                <Registration/>
            </Panel.Body>           
            </Panel>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLoggedInUser: user => dispatch({ type: actions.STORE_LOGGED_IN_USER, user: user })
    };
};

export default withRouter(connect(null, mapDispatchToProps)(SignIn));

