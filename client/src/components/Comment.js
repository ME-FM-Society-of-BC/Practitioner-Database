/**
 * Displays a single commment. A comment is at one of two levels
 * Level 1 comments are created with no reference to other comments
 * Level 2 comments are "responses" or "comments on comments"
 * 
 * A user can replay to a level 2 comment, but the new comment will be at the same level,
 * after all other level 2 comments at that level within the level 1 comment
 *  
 */
import React from 'react';
import ExpandingText from './ExpandingText';

const comment = (props) => {
    const classes = props.level === 1 ? 'comment' : 'comment level2';
    const dateOptions = {year:'numeric', month:'long', day:'numeric', hour:'numeric', minute:'numeric' };
    if (props.mode === 'edit'){
        return (
            <>
            <ExpandingText class={classes} value={props.value}/>
            </>
        )
    }
    else { // 'create'
        return (
            <div className={classes}>
                <div className='comment-header'>
                    <div className='comment-name'>{props.username}</div>
                    <div className='comment-date'>{props.date.toLocaleDateString("en-US", dateOptions)}</div>
                    { props.level === 1 ?
                        <input type='button' className='button-reply' value='Reply' onClick={props.onClickReply}></input>
                        : ''
                    }
                </div>
                <div>
                    {props.text}
                </div>
            </div>
        )
    }
}
export default comment;