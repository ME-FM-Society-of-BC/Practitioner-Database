import React from 'react';

const expandingText = (props) => {
    return <textarea 
        className={props.className} 
        onKeyDown = {(event) => autosize(event)} 
        defaultValue={props.value}
        onChange={props.onChange}
        />
}

const autosize = event => {
    var el = event.target;
    setTimeout(function(){
      el.style.cssText = 'height:auto; padding:0';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    },0);
}


export default expandingText;