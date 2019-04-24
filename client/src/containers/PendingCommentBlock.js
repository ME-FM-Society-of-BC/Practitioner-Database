/**
 * A group of PENDING or FLAGGED comments displayed at the same time.
 * The user pages through each block.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import Instructions from '../components/Instructions';
import PendingComment from '../components/PendingComment';

class PendingCommentBlock extends Component {
    
    state = {}

    BLOCK_SIZE = 10;
    ACCEPT_ACTION = 'Accept';
    BLOCK_ACTION = "Block";

    constructor(props){
        super(props);
        this.state.actionLabel = this.props.type === 'FLAGGED' ? 'Accept' : 'Block';
        this.state.startIndex = 0;
        this.state.commentsToResolve = [];

        this.onAction = this.onAction.bind(this);
        this.resolveAndNext = this.resolveAndNext.bind(this);
    }

    nextBlock(startIndex){
        const remaining = this.props.comments.length - startIndex;
        const size = remaining > this.BLOCK_SIZE ? this.BLOCK_SIZE : remaining;
        const comments = Array.prototype.slice.call(this.props.comments);
        const block =  comments.splice(startIndex, size);
        return block;
    }

    /** The moderator has ..... */
    onAction(commentId){
        this.state.commentsToResolve.push(commentId);
    }

    resolveAndNext(){
        this.setState({
            startIndex: this.state.startIndex + this.BLOCK_SIZE
        })
        if (this.nextBlock(this.state.startIndex).length === 0){
            // All comments have been resolved
            this.props.whenFinished(this.state.commentsToResolve)
        }
    }

    render(){
        const commentsToDisplay = this.nextBlock(this.state.startIndex);
        const allResolved = commentsToDisplay.length === 0;

        const panelStyle = {
            width:'90%',
            margin: 'auto',
            marginBottom: '2em'
        };
        return (
            <Panel style={panelStyle}>
            <Panel.Body>
                {  allResolved ? ''
                    :
                    <Instructions width='40em'>
                    { this.props.type === 'FLAGGED' ?
                        'The comments below have been flagged by a user as unacceptable. '
                        + 'If you do not agree (i.e. you feel the comment is acceptable, press the Accept button. '
                        + 'Press the Resolve button to confirm your decisions, and to view the next set of comments.'
                        :
                        'If any of the comments below are unacceptable, press the Block button. '
                        + 'Press the Resolve button to confirm your decisions, and to view the next set of comments.'
                    }
                    </Instructions>
                }
                {
                    commentsToDisplay.map((comment) => {
                        return <PendingComment
                            key = {comment.id} 
                            username={this.props.allUsers[comment.userId].username} 
                            text={comment.text} 
                            actionLabel={this.state.actionLabel}
                            onAction = {this.onAction}
                            />
                    })
                }
                { allResolved ?
                    <Instructions width='40em'>
                    { this.props.type === 'FLAGGED' ?
                        'All flagged messages are now resolved'
                        :
                        'All pending messages have been processed'
                    }
                    </Instructions>
                    :
                    <Button type="button" className='button-large' 
                        onClick={this.resolveAndNext}>
                        Resolve
                    </Button>
                }            
            </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        allUsers: state.userReducer.allUsers
    }
}


export default  connect(mapStateToProps)(PendingCommentBlock);
    