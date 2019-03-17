/**
 * Implements the Registration View
 */
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import EditableText from './../components/EditableText';
import * as actions from '../store/userActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
        console.log(this.state)
        this.props.registerUser(this.state);
    }

    render() {
        return (
            <div className='center'>
                <Form horizontal>
                    <h1>Sign In</h1>
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

                    <Button type='button' onClick={this.signIn}>Sign In</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signIn: (user) => dispatch(actions.signIn(user))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));

