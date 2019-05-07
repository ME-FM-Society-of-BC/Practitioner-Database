/**
 * A single row in the Practitioners list or search results. 
 * If the practitioner incldes a distance attribute, it will be displayed.
 */
import React from 'react';

const practitionerListItem = (props) => {
  return (
    <tr>
        <td>{props.p.firstName}&nbsp;{props.p.lastName}</td>
        <td>{props.p.address},&nbsp;{props.p.city}&nbsp;{props.p.province},&nbsp;{props.p.postalCode}</td> 
        <td>{props.p.phone}</td> 
        <td>{props.p.specialty}</td>
        {props.p.distance ? <td>{props.p.distance.humanReadable}</td> : ''} 
        <td><input type='button' value='View Details' onClick={() => props.select(props.p.id)}></input></td>
    </tr>
    )
}
export default practitionerListItem;
