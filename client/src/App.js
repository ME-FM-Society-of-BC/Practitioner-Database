import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home';
import MyActivity from './containers/MyActivity';
import PendingComments from './containers/PendingComments';
import PractitionerList from './containers/PractitionerList';
import Practitioner from './containers/Practitioner';
import Search from './containers/Search';
import Registration from './containers/Registration';
import SignIn from './containers/SignIn';
import './App.css';

/**
 * The root component of the application
 */
class App extends Component {
    
    componentDidMount() {
        this.props.history.replace('/sign-in');
    }
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
                            {this.props.loggedInUser && this.props.loggedInUser.isModerator ?
                                <LinkContainer to="/pending-comments">
                                    <NavItem>Pending Comments</NavItem>
                                </LinkContainer>
                                : <></>
                            }
                            {this.props.loggedInUser ?
                                <LinkContainer to="/home">
                                    <NavItem>Home</NavItem>
                                </LinkContainer>
                                : <></>
                            }
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
    
                <Route path="/practitioners" exact component={PractitionerList} />
                <Route path="/practitioners/:id" exact component={Practitioner} />
                <Route path="/search" component={Search} />
                <Route path="/search-results" component={PractitionerList} />
                <Route path="/pending-comments" component={PendingComments} />
                <Route path="/my-activity" component={MyActivity} />
                <Route path="/registration" component={Registration} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/home" component={Home} />
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

export default withRouter(connect(mapStateToProps)(App));

    