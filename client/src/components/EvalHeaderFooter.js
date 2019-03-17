/**
 * Creates a header or footer for the Practitioner Evaluation view
 * Both header and footer contain the same buttons. The header also
 * displays explanatory text.
 * 
 * Properties:
 * isHeader
 * mode
 * loggedInUser
 * userHasEvaluated
 * enableEvaluation
 * saveEvaluation
 */
import React from 'react';
import { Button } from 'react-bootstrap';

const evalHeaderFooter = (props) => {
    const introStyle={'margin': '.6em', 'fontWeight': 'bold'};
    const createMyEvaluationButton = (
        <Button type="button" key='1' className='' onClick={props.enableEvaluation}>
            Add your own evaluation
        </Button>
    )
    const editMyEvaluationButton = (
        <Button type="button" key='2' className='' onClick={props.enableEvaluation}>
            Edit your previous evaluation
        </Button>
    )
    const saveMyEvaluationButton = (
        <Button type="button" key='3' className='' onClick={props.saveEvaluation}>
            Save My Evaluation
        </Button>
    )
    const viewAllUserIncluded = (
        <div style={introStyle} key='4' >
            Below are summarized all the evaluations of this practitioner.
        </div>
    )
    const anyYouWant = (
        <div style={introStyle} key='5' >
            Answer any questions you want. You can add or change them later. 
        </div>
    )
    
    const components = [];
    switch (props.mode) {
        case 'viewAll':
            if (props.isHeader) {
                components.push(viewAllUserIncluded);
            }
            if (props.loggedInUser){
                components.push(props.userHasEvaluated ? editMyEvaluationButton : createMyEvaluationButton);
            }
            break;
        case 'edit':
            components.push(anyYouWant);
            components.push(saveMyEvaluationButton);
            break;
        default:  // view
            break;
    }

    return (
        <div style={introStyle}>
            {components}
        </div>
    )
}
export default evalHeaderFooter;