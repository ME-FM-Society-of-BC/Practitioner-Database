/**
 * Implements the Home View
 */
import React, { Component } from 'react';
import Instructions from '../components/Instructions';

class Home extends Component {

    render() {
        return (
            <>
            <h3>This is the "Landing" page</h3>
            <Instructions width='40em'>Include here any additional information for users</Instructions>
            </>
        )
    }

}

export default Home;