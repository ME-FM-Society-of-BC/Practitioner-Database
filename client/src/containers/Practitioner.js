/**
 * Implements the Practitioner View. It contains three expandable panels:
 * <li>Practitioner Information</li>
 * <li>Evaluation</li>
 * <li>Comments</li>
 * <p>
 * When a Practitioner is being created rather than viewed, only the
 * Practitioner Information panel will be displayed.
 * <p>
 * The Evaluation and Comments panels are by default collapsed
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PanelGroup, Panel } from 'react-bootstrap';
import PractitionerInfo from './PractitionerInfo';
import PractitionerEval from './PractitionerEval';
import PractitionerComments from './PractitionerComments';

/**
 * Input properties:
 * 
 */
class Practitioner extends Component {

    state = {}

    constructor(props){
        super(props);
        const queryParams = new URLSearchParams(props.location.search);
        for (let param of queryParams.entries()) {
            if (param[0] === 'newPractitioner'){
                this.setState({
                    newPractitioner: true
                });
            }
        }    
    }
    
    render() {
        return (
            <>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>Practitioner Information</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <PractitionerInfo/>
                    </Panel.Body>
                </Panel>
                {this.props.match.params['id'] >= 0 ?
                    <PanelGroup accordion id="practitioner-panels">
                        <Panel eventKey="1">
                            <Panel.Heading>
                                <Panel.Title toggle>Evaluation</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <PractitionerEval newPractitioner={this.state.newPractitioner}/>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey="2">
                            <Panel.Heading>
                                <Panel.Title toggle>Comments</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <PractitionerComments/>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>
                    : ''
                } 
            </>
        );
    }
}

export default withRouter(Practitioner);