/**
 * Implements the Comments View, displaying all approved comments for a practitioner.
 * Comments are arranged in a two level hierarchy. The second level contains any 
 * comments entered as responses to a given comment. The comment of a user who responds 
 * to a second level comment will appear on the second level. 
 * 
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Comment from '../components/Comment';
import * as actions from '../store/commentActions';


class PractitionerComments extends Component {

    render() {
        return (
            <>
            <h1>Comments</h1>
            <Comment mode='edit' value='current value'/>
            <Comment mode='view' value='this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only this is view only '/>
            </>
        )
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        allUsers: state.userReducer.allUsers,
        allComments: state.commentReducer.allComments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveComment: (comment) => dispatch(actions.saveComment(comment))
    }
}

export default  withRouter(connect(mapStateToProps)(PractitionerComments));
