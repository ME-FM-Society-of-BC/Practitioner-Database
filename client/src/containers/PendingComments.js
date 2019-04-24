/**
 * Implements the PendingComments View
 * Flagged: 
 *    User  Comment Text            Allow
 * Not Viewed
 *    User  Comment Text            Block
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { PanelGroup, Panel } from 'react-bootstrap';
import PendingCommentBlock from './PendingCommentBlock';
import * as actions from '../store/commentActions'

class PendingComments extends Component {

    state = {}

    constructor(props){
        super(props);
        this.resolveFlaggedComments = this.resolveFlaggedComments.bind(this);
        this.resolvePendingComments = this.resolvePendingComments.bind(this);
    }

    componentDidMount(){
        axios.get('/comments?status=FLAGGED')
        .then(response => {
            this.props.storeFlaggedComments(response.data);
            })
        .then(() => {
            return axios.get('/comments?status=PENDING')
        })
        .then(response => {
            this.props.storePendingComments(response.data);
            })
        .catch (error => {
            console.log(error);
            alert(error)
        });
    }

    resolveFlaggedComments(comments){

    }
    
    resolvePendingComments(comments){
        
    }

    render() {
        return (
        <PanelGroup accordion id="comment-panels">
            <Panel eventKey="1">
                <Panel.Heading>
                    <Panel.Title toggle>Flagged Comments</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <PendingCommentBlock type='FLAGGED' 
                        comments = {this.props.flaggedComments} 
                        allUsers={this.props.allUsers}
                        whenFinished={this.resolveFlaggedComments}
                        />
                </Panel.Body>
            </Panel>
            <Panel eventKey="2">
                <Panel.Heading>
                    <Panel.Title toggle>Unviewed Comments</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <PendingCommentBlock  type='PENDING' 
                        comments={this.props.pendingComments} 
                        allUsers={this.props.allUsers}
                        whenFinished={this.resolvePendingComments}
                        />
                </Panel.Body>
            </Panel>
        </PanelGroup>
        )
    }
}

const mapStateToProps = state => {
    return {
        pendingComments: state.commentReducer.pendingComments,
        flaggedComments: state.commentReducer.flaggedComments,
        allUsers: state.userReducer.allUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeFlaggedComments: (comments) => dispatch({ type: actions.STORE_ALL_FLAGGED_COMMENTS, comments:comments }),
        storePendingComments: (comments) => dispatch({ type: actions.STORE_ALL_PENDING_COMMENTS, comments:comments })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingComments);