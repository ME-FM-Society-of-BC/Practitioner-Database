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
import Radium, {StyleRoot} from 'radium';
import { CircleSpinner } from "react-spinners-kit";
import * as practitionerActions from './store/practitionerActions';
import * as userActions from './store/userActions';
import * as evaluationActions from './store/evaluationActions';
import * as locationActions from './store/locationActions';
import axios from 'axios';

/**
 * The root component of the application
 */
class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/roles')
        .then(response => {
            this.props.storeUserRoles(response.data);
        })
        .then(() => {
            return axios.get('/specialties')
        })
        .then(response => {
            this.props.storeSpecialties(response.data);
        })
        .then(() => {
            return axios.get('/provinces')
        })
        .then(response => {
            this.props.storeProvinces(response.data);
        })
        .then(() => {
            return axios.get('/cities')
        })
        .then(response => {
            this.props.storeCities(response.data);
        })
        .then(() => {
            return axios.get('/questions')
        })
        .then(response => {
            // Sort the questions by display order
            const questions = response.data.sort(function(a, b){return a.displayIndex - b.displayIndex});
            this.props.storeQuestions(questions);
        })
        .then(() => {
            return axios.get('/questionchoices')
        })
        .then(response => {
            this.props.storeQuestionChoices(response.data);
        })
        .then(() => {
            return axios.get('/questiongroups')
        })
        .then(response => {
            this.props.storeQuestionGroups(response.data);
        })
        .then(() => {
            // Must also retrieve all users to be able to identify them in the comments
            return axios.get('/users?basic=true')
        })
        .then(response => {
            this.props.storeUsers(response.data);
        })
        .then(() => {
            this.setState({loading: false});
            this.props.history.replace('/sign-in');
        })
        // TODO: Replace with user friendly response
        .catch(error => {
            console.log(error);
        });        
    }

    render() {
        if (this.state.loading){
            return (
                <div className='spinner-container'>
                    <CircleSpinner size={80} color="#686769" loading={this.state.loading}></CircleSpinner>
                </div>
            )
        }
        else return (
            <StyleRoot>
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
                                    <NavItem>Comments</NavItem>
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
            </StyleRoot>
        );
    }
}
   
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        roles: state.userReducer.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUsers: (users) => dispatch({ type: userActions.STORE_ALL_USERS, users: users }),
        storeUserRoles: (roles) => dispatch({ type: userActions.STORE_USER_ROLES, roles: roles }),
        storeSpecialties: (specialties) => dispatch({ type: practitionerActions.STORE_SPECIALTIES, specialties: specialties }),
        storeProvinces: (provinces) => dispatch({ type: locationActions.STORE_PROVINCES, provinces: provinces }),
        storeCities: (cities) => dispatch({ type: locationActions.STORE_CITIES, cities: cities }),
        storeQuestions: (questions) => dispatch({ type: evaluationActions.STORE_QUESTIONS, questions: questions }),
        storeQuestionChoices: (questionChoices) => dispatch({ type: evaluationActions.STORE_QUESTION_CHOICES, questionChoices: questionChoices }),
        storeQuestionGroups: (questionGroups) => dispatch({ type: evaluationActions.STORE_QUESTION_GROUPS, questionGroups: questionGroups })
    }
}

export default Radium(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

    