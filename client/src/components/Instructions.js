/**
 * A simple wrapper to contain fixed text
 */
import React from 'react';

const instructions = props => {
    return (
        <div className='instructions'>
            <p style={{maxWidth: props.width}}>
                {props.children}
            </p>
        </div>
    )
}

export default instructions;