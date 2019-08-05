/**
 * A link with accompanying modal popup allowing user to copy the application url to the clipboard
 */
import React, { Component } from 'react';
import { getBaseURI } from '../common/utilities'
import { Modal, Button } from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class CopyUrl extends Component {
    
    constructor(props){
        super(props);
        let url = getBaseURI();
        if (url.indexOf('#') > 0){
            url = url.substring(0, url.indexOf('#') - 1);
        }
        this.state = {
            url: url
        }
//        this.show = this.show.bind(this);
//        this.hide = this.hide.bind(this);
        this.done = this.done.bind(this);
    }
 
    // show() {
    //     this.setState({show: true})
    // }
    // hide() {
    //     this.setState({show: false})
    // }
    done(){
        this.setState({copied: true})
    }
// <a className='copy-url' href='#' style={{color: '#ffffff'}} onClick={this.show}>Share</a>
    render() {
        return (
            <Modal 
                show='true' 
                aria-labelledby="contained-modal-title-vcenter" 
                centered='true' 
                onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Want to share this with a friend?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='centered' style={{width: '15em'}}>
                        <p>Send them this URL:</p>
                        <input type='text' value={this.state.url} className='info-field info-field-reg' readOnly/>
                        <div style={{marginTop: '10px'}}>
                            <CopyToClipboard onCopy={this.onCopy} text={this.state.url}>
                                <button onClick={this.done}>Copy it to the clipboard</button>
                            </CopyToClipboard>
                            {this.state.copied ?
                                <span class="fas fa-check"></span> : ''
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
        // return (
        //     <>
            
        //     <Modal 
        //         show={this.state.show} 
        //         aria-labelledby="contained-modal-title-vcenter" 
        //         centered='true' 
        //         onHide={this.hide}>
        //         <Modal.Header closeButton>
        //             <Modal.Title id="contained-modal-title-vcenter">
        //             Want to share this with a friend?
        //             </Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //             <div className='centered' style={{width: '15em'}}>
        //                 <p>Send them this URL:</p>
        //                 <input type='text' value={this.state.url} className='info-field info-field-reg' readOnly/>
        //                 <div style={{marginTop: '10px'}}>
        //                     <CopyToClipboard onCopy={this.onCopy} text={this.state.url}>
        //                         <button onClick={this.done}>Copy it to the clipboard</button>
        //                     </CopyToClipboard>
        //                     {this.state.copied ?
        //                         <span class="fas fa-check"></span> : ''
        //                     }
        //                 </div>
        //             </div>
        //         </Modal.Body>
        //         <Modal.Footer>
        //             <Button variant="secondary" onClick={this.hide}>Close</Button>
        //         </Modal.Footer>
        //     </Modal>
        //     </>
        // )
    }
}

export default CopyUrl;