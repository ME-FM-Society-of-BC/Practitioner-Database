/**
 * Implements the Registration View
 */
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import EditableText from './../components/EditableText';
import * as actions from '../store/userActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class Registration extends Component {
    state = {
        email: '',
        username: '',
        password: ''
    };

    onChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    register = () => {
        axios.post('/users/', this.state)
        .then( response => {
            if (response.data.nameAlreadyTaken){
                alert("That username is already taken. Please enter a new value");
            }
            else {
                const newUser = {...this.state};
                this.setState({
                    email: '',
                    username: '',
                    password: ''
                })
                newUser.id = response.data;
                newUser.roleId = 1;
                this.props.storeLoggedInUser(newUser);
                // TODO replace() ?
                this.props.history.push('/home');
            }            
        })
        .catch(error => {
            console.log(error);
        });        
    }

    render() {
        return <Form horizontal>
            <div className='horizontal-group'>
            <div className='vertical-group'>
                <EditableText   label='Email'
                                type='email' 
                                name='email'
                                labelClass='info-label'
                                valueClass='info-field'
                                value={this.state.email}
                                placeholder='Email'
                                changeHandler={this.onChange} />

                <EditableText   label='Username' 
                                name='username'
                                labelClass='info-label'
                                valueClass='info-field'
                                placeholder='Username'
                                value={this.state.username}
                                changeHandler={this.onChange} />

                <EditableText   label='Password' 
                                name='password'
                                labelClass='info-label'
                                valueClass='info-field'
                                placeholder='Password'
                                value={this.state.password}
                                changeHandler={this.onChange} />
                <br/>
                <Button type='button' onClick={this.register}>Register</Button>
            </div>
            </div>
            </Form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));

