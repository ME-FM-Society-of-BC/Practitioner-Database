/**
 * A single row in the Practitioners list or search results. 
 * If the practitioner includes a distance attribute, it will be displayed.
 */
import React from 'react';

const practitionerListItem = (props) => {
    // NOTE: react-bootstrap Button sizing seems not to work to render a small button. Hence use of <input type='button'...
    return (
        <tr>
            <td>{props.practitioner.firstName}&nbsp;{props.practitioner.lastName}</td>
            <td>{props.practitioner.address},&nbsp;{props.practitioner.city}&nbsp;{props.practitioner.province},&nbsp;{props.practitioner.postalCode}</td> 
            <td>{props.practitioner.phone}</td> 
            <td>{props.practitioner.specialty}</td>
            {props.practitioner.distance ? <td>{props.practitioner.distance.humanReadable}</td> : ''} 
            <td><input type='button' value='View Details' onClick={() => props.select(props.practitioner.id)}></input></td>
        </tr>
    )
}
export default practitionerListItem;
