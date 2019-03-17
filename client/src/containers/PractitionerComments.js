/**
 * Implements the Comments View, displaying all approved comments for a practitioner.
 * Comments are arranged in a two level hierarchy. The second level contains any 
 * comments entered as responses to a given comment. The comment of a user who responds 
 * to a second level comment will appear on the second level. 
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Comments extends Component {

    render() {
        return <h1>Comments</h1>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export default connect(mapStateToProps)(Comments);
