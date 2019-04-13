import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home';
import MyActivity from './containers/MyActivity';
import PendingComments from './containers/PendingComments';
import Practitioners from './containers/Practitioners';
import Practitioner from './containers/Practitioner';
import Search from './containers/Search';
import Registration from './containers/Registration';
import SignIn from './containers/SignIn';
import * as actions from './store/userActions';
import './App.css';

/**
 * The root component of the application
 */
class App extends Component {
    
/** Temporary for simulating login **/
    onChange = ((event) => {
        if (event.target.defaultValue === 'Active'){
            this.props.storeUser({
                username: 'Active',
                email: 'robertt.t.toms@gmail.com',
                id: 1,
                roleId: 1
            })
        }
        else {
            this.props.storeUser({
                username: 'Admin',
                email: 'robertt.t.toms@gmail.com',
                id: 2,
                roleId: 2
            })
        }
    });
/** End temp **/

    componentDidMount() {
        this.props.history.replace('/sign-in');
    }
//<a href="#brand">MEFM Database</a>
    render() {
        return (
            <div className="App">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">MEFM Database</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {/* LinkContainer accepts the same parameters as react-router NavLink and Link */}
                            {/* 
                            <LinkContainer to="/home">
                                <NavItem>Home</NavItem>
                            </LinkContainer>
                            */}
                            <LinkContainer to="/practitioners">
                                <NavItem>View All</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/search">
                                <NavItem>Search</NavItem>
                            </LinkContainer>
                            {this.props.loggedInUser ?
                                <> 
                                <LinkContainer to="/practitioners/-1">
                                    <NavItem>Recommend</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/my-activity">
                                    <NavItem>My Activity</NavItem>
                                </LinkContainer>
                                </>
                                : <></>
                            }
                            {this.props.loggedInUser && this.props.loggedInUser.isAdministrator ?
                                <LinkContainer to="/pending-comments">
                                    <NavItem>Pending Comments</NavItem>
                                </LinkContainer>
                                : <></>
                        }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
    
                <Route path="/practitioners" exact component={Practitioners} />
                <Route path="/practitioners/:id" exact component={Practitioner} />
                <Route path="/search" component={Search} />
                <Route path="/pending-comments" component={PendingComments} />
                <Route path="/my-activity" component={MyActivity} />
                <Route path="/registration" component={Registration} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/home" component={Home} />
                 {/*
               <Route path="/" exact component={Home} />

                */}
                
                {/* Temporary for simulating login 
                <input type='button' value='Active' name={this} onClick={this.onChange}/>
                <input type='button' value='Admin' name={this} onClick={this.onChange}/>
                */}

            </div>
        );
    }
}
   
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        roles: state.userReducer.roles
    }
}

/** Temp for simulating login */
const mapDispatchToProps = dispatch => {
    return {
        storeUser: (user) => dispatch({ type: actions.STORE_LOGGED_IN_USER, value: user }),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

    