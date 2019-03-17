/**
 * Implements the Registration View
 */
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import EditableText from './../components/EditableText';
import * as actions from '../store/userActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Registration extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    };

    onChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    register = () => {
        console.log(this.state)
        this.props.registerUser(this.state);
    }

    render() {
        return <Form horizontal>
                <h1>Registration</h1>
                <EditableText   label='First Name'
                                name='firstName'
                                labelClass='info-label'
                                valueClass='info-field'
                                placeholder='First name'
                                changeHandler={this.onChange} />

                <EditableText   label='Last Name'
                                name='lastName'
                                labelClass='info-label'
                                valueClass='info-field'
                                placeholder='Last name'
                                changeHandler={this.onChange} />

                <EditableText   label='Email' 
                                name='email'
                                labelClass='info-label'
                                valueClass='info-field'
                                placeholder='Email'
                                changeHandler={this.onChange} />

                <EditableText   label='Username' 
                                name='username'
                                labelClass='info-label'
                                valueClass='info-field'
                                placeholder='Username'
                                changeHandler={this.onChange} />

                <EditableText   label='Password' 
                                name='password'
                                labelClass='info-label'
                                valueClass='info-field'
                                placeholder='Password'
                                changeHandler={this.onChange} />
                <br/>
                <Button type='button' onClick={this.register}>Register</Button>
            </Form>
    }

}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        registerUser: (user) => dispatch(actions.registerUser(user))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));

