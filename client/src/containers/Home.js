/**
* Implements the Home View
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import  '../css/home.css';

class Home extends Component {

    constructor(props){
        super(props);
        this.goToView = this.goToView.bind(this);
        this.goToSearch = this.goToSearch.bind(this);
        this.goToSignin = this.goToSignin.bind(this);
    }

    goToView(){
        this.props.history.push('/practitioners');
    }
    goToSearch(){
        this.props.history.push('/search');
    }
    goToSignin(){
        this.props.history.push('/sighn-in');
    }
    render() {
        
        return (
            <div className='container left' >
            <p> 
            ME (<a href="https://www.mefm.bc.ca/me-info" target="_blank" rel="noopener noreferrer">myalgic encephalomyelitis</a>) 
            and <a href="https://www.mefm.bc.ca/fm-info" target="_blank" rel="noopener noreferrer">fibromyalgia</a> are 
            complex illnesses which affect over one million Canadians. Both conditions have been subjected to systemic 
            stigma in the health care system, resulting in a severe shortage of knowledgeable doctors and other health 
            care practitioners. This has left patients desperately seeking professional medical support for diagnosis 
            and treatment. In many cases the stigma faced by patients seeking health care has led to the prescription 
            of harmful treatments and exposure to traumatic experiences, which add to their disease burden.
            </p>
            <p>
            The <a href="https://www.mefm.bc.ca/" target="_blank" rel="noopener noreferrer">ME/FM Society of BC</a> created this website with the 
            goal of providing a platform for people living with ME and fibromyalgia to share information about practitioners 
            in any health  discipline who they have found helpful on their health journey. Our goal has been to make 
            this information easy to search by name, location and discipline. A comprehensive questionnaire and rating 
            system has been created to allow users to provide information on frequently asked questions about physicians. 
            A comment section is also provided.
            </p>
            <p>
            The database can be searched without registering. However, registration is required in order to add a new 
            practitioner to the system, to rate a practitioner, or add comments.
            </p>
            
            {this.props.loggedInUser ?
                '' :
                <div className='actions'>
                    <Button type='button' className='action' onClick={this.goToView}>View Practitioners List</Button>
                    <Button type='button' className='action' onClick={this.goToSearch}>Search For Practitioner</Button>
                    <Button type='button' className='action' onClick={this.goToSignIn}>Register or Sign In</Button>
                </div>
            }
            
            <div className='header'>Disclaimer</div>
            <p>
            Neither the ME/FM Society of BC, nor the moderators or administrators of this site recommend or approve 
            any of the practitioners listed on this site. All information has been provided by users and is not verified 
            by our Society, administrators or moderators. While we hope that the information is up-to-date, we depend 
            on our users to submit updates.
            </p>
            <div className='header'>Moderator policy</div>
            <p>
            Please respect that this is a public site providing useful information for ME and fibromyalgia patients, 
            not a place to “let it all out”. While we want honest comments and information, the goal is to provide 
            information about helpful health care providers, and not to provide a platform to excoriate doctors or other 
            healthcare professionals. Moderators will remove any offending comments.
            </p>
            <p className='bold' style={{marginTop: '1.2em'}}>
            To learn more about ME and fibromyalgia: <a href="https://www.mefm.bc.ca/" target="_blank" rel="noopener noreferrer">https://www.mefm.bc.ca/ </a>               
            </p>
            <div className='header'>About the ME/FM Society of BC</div>
            <p>
            The ME/FM Society of BC is a charity, run by patients, carers and their families, formed to help and support 
            patients with <span className='bold'>Myalgic Encephalomyelitis</span> * (ME) and/or <span className='bold'>Fibromyalgia</span> (FM).
            </p>
            <p>
            Our society works to help ME and FM patients in British Columbia improve their health and quality of life by 
            providing information about these illnesses, and guidance on how to seek and obtain support, appropriate 
            medical help and treatments. We also focus on informing health care professionals, educators and students 
            about ME and FM, as well as raising awareness among, and seeking the support of, government and the general public. 
            </p>
            <div className='footnote'>
            *Myalgic Encephalomyelitis is also referred to as ME/CFS, Chronic Fatigue Syndrome or SEID
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export default connect(mapStateToProps)(Home);