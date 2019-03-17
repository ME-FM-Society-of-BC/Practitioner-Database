/**
 * A single row in the Practitioners list 
 */
import React from 'react';

const practitionerListItem = (props) => {
  return (
    <tr>
        <td>{props.p.firstName}&nbsp;{props.p.lastName}</td>
        <td>{props.p.address},&nbsp;{props.p.city}&nbsp;{props.p.province},&nbsp;{props.p.postalCode}</td> 
        <td>{props.p.phone}</td> 
        <td>{props.p.specialty}</td> 
        <td><input type='button' value='View Details' onClick={() => props.select(props.p.id)}></input></td>
    </tr>
    )
}
export default practitionerListItem;
