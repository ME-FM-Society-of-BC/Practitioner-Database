/**
 * Implements the Practitioner View
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
    state = {
        mode: undefined
    }
    
    componentWillMount() {
        // The mode is passed as a URL parameter in the route
        // Note: URLSearchParams does not work in IE11
//        const search = this.props.location.search;
//        const mode = search.substring(search.indexOf('=') + 1);
//        this.setState({mode: mode});
    }
    
    render() {
        // <PractitionerInfo mode={this.state.mode} />
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
                <PanelGroup accordion id="practitioner-panels">
                    <Panel eventKey="1">
                        <Panel.Heading>
                            <Panel.Title toggle>Evaluation</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <PractitionerEval/>
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
            </>
        );
    }
}

export default withRouter(Practitioner);