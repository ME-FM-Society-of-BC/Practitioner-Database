 /**
 * Implements the Registration View
 */
import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import EditableText from './../components/EditableText';
import * as actions from '../store/userActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Registration from './Registration';
import axios from 'axios';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = (event) => {     
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    signIn = () => {
        axios.post('/users/auth', this.state)
        .then((response) => {
            if (response.data.userNotFound || response.data.invalidPassword){
                alert("Invalid username or password");
            }
            else {
                this.props.storeLoggedInUser(response.data);
                // TODO replace() ?
                this.props.history.push('/home');
            }
        })
        .catch(error => {
            console.log(error);
        });        
    }

    render() {
        const panelStyle = {
            width:'80%',
            margin: 'auto',
            marginBottom: '2em'
        };

        return (
            <>
            <Panel style={panelStyle}>
            <Panel.Body>
            <div className='instructions'>
                Welcome to the MEFM Database. If you are a registered user, sign in below.
                If you are not registered, you are free to search for practitioners near you,
                or view our complete list of practitioners
            </div>
                <div className='horizontal-group'>
                <div className ='vertical-group'>
                    <EditableText   mode='edit'
                                    label='Username'
                                    name='username'
                                    labelClass='info-label'
                                    valueClass='info-field'
                                    value={this.state.username}
                                    placeholder='Username'
                                    changeHandler={this.onChange} />

                    <EditableText   mode='edit'
                                    type='password'
                                    label='Password'
                                    name='password'
                                    labelClass='info-label'
                                    valueClass='info-field'
                                    value={this.state.password}
                                    placeholder='Password'
                                    changeHandler={this.onChange} />

                    <br/>

                    <Button type='button' onClick={this.signIn}>Sign In</Button>
                </div>
                </div>
            </Panel.Body>           
            </Panel>
            <Panel style={panelStyle}>
            <Panel.Body>
                <div className='instructions'>
                Not registered? Sign up here if you want to recommend a practitioner, or 
                provide feedback on your experience with a practitioner
                <p/>
                </div>
                <Registration/>
            </Panel.Body>           
            </Panel>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storeLoggedInUser: user => dispatch({ type: actions.STORE_LOGGED_IN_USER, user: user })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));

