/**
 * A PENDING or FLAGGED Comment 
 */
import React from 'react';

const pendingComment = props => {
    return (
        <div className='pending-comment'>
            <div className='username'>
                {props.username}
            </div>
            <div className='text'>
                {props.text}
            </div>
            <div className='action'>
                <input type='button' className='comment-button' value={props.actionLabel} 
                    onClick={() => props.onAction(props.key)}></input>
            </div>
        </div>
    )
}

export default pendingComment;
