/**
 * Implements the Home View
 */
import React, { Component } from 'react';

class Home extends Component {

    render() {
        return (
            <>
            <h3>This is the "Landing" page</h3>
            <div className='instructions' style={{textAlign:'center'}}>
                Include here any additional information for users
            </div>
            </>
        )
    }

}

export default Home;