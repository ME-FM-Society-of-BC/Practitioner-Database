import React from 'react';
/**
 * A transition component to the Practitioner view when the Recommend menu item is selected.
 * Required to handle the scenario where a user is still on the Practitioner view after 
 * having created one, and clicks the Recommend button to create another new one.
 */
const newPractitioner = (props) => {
    (new Promise(function (resolve, reject) {
        resolve()
    })).then(() => {
        props.history.push('/practitioners/-1'); 
    });
    return <div/>
}

export default newPractitioner;