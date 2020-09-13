import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/userActions';
import axios from 'axios';

/**
 * Signs the user out and returns to the Sign In / Registration view
 */
const signOut = (props) => {

    props.signout();
    axios.defaults.headers.common['Authorization'] = '';
    props.history.push('/sign-in');
    return <div/>
}

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch({ type: actions.LOGOUT })
    }
}

export default connect(null, mapDispatchToProps)(signOut);