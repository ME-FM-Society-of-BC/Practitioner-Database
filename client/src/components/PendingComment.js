/**
 * A PENDING or FLAGGED Comment 
                <input type="checkbox" name={props.id} onClick={() => props.onAction(props.id)}/>
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
                <input type="checkbox" id={props.id} onClick={props.onAction}/>
                <label style={{display: 'inline', marginLeft: '5px'}}>{props.actionLabel}</label>
            </div>
        </div>
    )
}

export default pendingComment;
