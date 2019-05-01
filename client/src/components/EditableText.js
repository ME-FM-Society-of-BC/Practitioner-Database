/**
 * A wrapper for a text input control. 
 * Its behaviour depends on the props.mode property as follows:
 * 'view':   renders as a disabled text input
 * 'create': renders as an enabled text input with a placeholder
 * 'edit':   renders as an enabled text input, with the current value instead of a placeholder
 * 
 * Additional props:
 * type:            the html input type, either 'text' or 'url'
 * label:           the control label
 * labelClass:      label style class
 * valueClass:      value style class
 * placeholder:     placeholder to be displayed when mode = 'create' 
 * value:           the current value
 * changeHandler:   function to receive the onChange event     
 * attribute:       name of the attribute
 * dimensions:      optional 12-column grid dimensions of the label and options list in format "x1,x2[,x3]"
 *                  where x1 = column width of label
 *                        x2 = column width of the value
 *                        x3 = column odffset of label (optional)
 * 
 * TODO: Either implement placeholder or remove it
 */
import React from 'react';
import { parseDimensions } from '../common/utilities';

const editableText = (props) => {

    const type = props.type ? props.type : 'text' 
    let labelClasses = props.labelClass;
    let valueClasses = props.valueClass;

    const openUrl = () => {
        window.open(props.value);
    }    
    
    if (props.dimensions){
        let d = parseDimensions(props.dimensions);
        labelClasses += ' ' + d.labelWidth + ' ' + d.labelOffset;
        valueClasses += ' ' + d.valueWidth;
    }
    
    let component;
    if (type === 'url' && props.mode === 'view'){
        const url = props.value.startsWith('http') ? props.value : 'http://' + props.value;
        component = (
            <a href={url} className={valueClasses} target='_blank' style={{textAlign: 'left'}}>{props.value}</a>
        )
    }
    else {
        component = (
            <input type={type} 
                value={props.value || ''}
                name={props.name}
                disabled={props.mode === 'view'}
                className={valueClasses}
                onChange={props.changeHandler}/>
        )
    }

    return (
        <div className='input-wrapper'>
            <span className={labelClasses}>{props.label}</span>
            {component}
        </div>
    )
}

export default editableText;
