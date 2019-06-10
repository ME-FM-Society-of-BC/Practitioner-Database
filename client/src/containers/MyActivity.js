/**
 * Implements the MyActivity View
 */
import React, { Component } from 'react';
import Instructions from '../components/Instructions';
import { connect } from 'react-redux';

class MyActivity extends Component {

    render() {
        const active = this.props.loggedInUser && !this.props.loggedInUser.isModerator && !this.props.loggedInUser.isAdministrator;
        if (active){
            return (
                <>
                <Instructions width='80%'>
                    Welcome to My Activity page, your personal page where you can view and edit the submissions and comments you have made. 
                    As a registered user you can add and rate a new practitioner, rate an already existing practitioner, or add comments.
                </Instructions>
                <div>Activitiy List Under Construction</div>
                </>
            )
        }
 
        else {
            return (
                <div>
                    Instructions for Moderator or Admnistrator
                </div>
            )
        }
    }

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
    }
}


// connect(mapStateToProps, mapDispatchToProps)(PractitionerEval)
export default connect(mapStateToProps)(MyActivity);