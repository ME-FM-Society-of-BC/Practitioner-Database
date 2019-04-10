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

const comment = (props) => {

    if (props.mode === 'edit'){
        return (
            <>
            <textarea className='comment level2' onKeyDown = {(event) => autosize(event)} defaultValue={props.value}/>
            </>
        )
    }
    else {
        return (
            <>
            <div className='comment level2' >{props.value}</div>
            </>
        )
    }
}

function autosize(event){
    var el = event.target;
    setTimeout(function(){
      el.style.cssText = 'height:auto; padding:0';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    },0);
}

export default comment;