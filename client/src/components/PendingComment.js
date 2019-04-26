/**
 * A PENDING or FLAGGED Comment 
                <input type="checkbox" name={props.id} onClick={() => props.onAction(props.id)}/>
 */
import React from 'react';
import Radium from 'radium';

const pendingComment = props => {
    return (
        <div style={comment}>
            <div style={username}>
                {props.username}
            </div>
            <div style={text}>
                {props.text}
            </div>
            <div style={action}>
                <input type="checkbox" id={props.id} onClick={props.onAction}/>
                <label style={{display: 'inline', marginLeft: '5px'}}>{props.actionLabel}</label>
            </div>
        </div>
    )
}

const comment = {
	display: 'flex',
	borderTop: '2px solid #dce4ec',
	borderLeft: '2px solid #dce4ec',
	borderRight: '2px solid #dce4ec',
	textAlign: 'left',
	padding: '2px'
}
const username = {
	marginRight: 'auto',
	flexBasis: '10%',
    borderRight: '1px solid #dce4ec',    
    '@media (max-width: 1024px)': {
        flexBasis: '15%'
    },    
    '@media (max-width: 768px)': {
        flexBasis: '20%'
    }    
}
const text = {
	display: 'inline',
	marginRight: 'auto',
	textAlign: 'left',
	flexBasis: '83%',
	borderRight: '1px solid #dce4ec',
	padding: '0 5px',
    '@media (max-width: 1024px)': {
        flexBasis: '75%'
    },    
    '@media (max-width: 768px)': {
        flexBasis: '65%'
    }    
}
const action = {
	display: 'inline',
	marginLeft: '0.5em',
	flexBasis: '7%',
	fontWeight: 'normal',
    '@media (max-width: 1024px)': {
        flexBasis: '10%'
    },    
    '@media (max-width: 768px)': {
        flexBasis: '15%'
    }    
}

export default Radium(pendingComment);
