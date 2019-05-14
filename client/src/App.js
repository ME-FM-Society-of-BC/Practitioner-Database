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
import NewPractitioner from './components/NewPractitioner';
import Search from './containers/Search';
import SignIn from './containers/SignIn';
import SignOut from './components/SignOut';
import Moderators from './containers/Moderators';
import ResetRequest from './containers/ResetRequest';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import { CircleSpinner } from "react-spinners-kit";
import * as practitionerActions from './store/practitionerActions';
import * as userActions from './store/userActions';
import * as evaluationActions from './store/evaluationActions';
import * as locationActions from './store/locationActions';
import axios from 'axios';

/**
 * The root component of the application. It displays the menu, whose
 * item set is determined by whether a user is logged in, and the type of user 
 */
class App extends Component {
    
    SESSION_MINUTES = 15;

    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
        // Add axios interceptors
        axios.interceptors.request.use(request => {
            return request;
        }, error => {
            console.log(error);
            return Promise.reject(error);
        });
        // Session timeout is based on the user not performing an
        // action which requires a server request 
        axios.interceptors.response.use(response => {
            this.restartSessionTimer(this.SESSION_MINUTES);
            console.log(response.data);
            return response;
        }, error => {
            this.restartSessionTimer(this.SESSION_MINUTES);
            console.log(error);
            if (error.status !== 401 && error.status !== 403){
                alert(error);
            }
            return Promise.reject(error);
        });
    }

    /**
     * Restarts the session timer
     * @param sessionLimit the session limit in minutes
     */
    restartSessionTimer(sessionLimit) {
        if (this.timerId){
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(() => {
            if (this.props.loggedInUser){
                // Session timing applies only to logged in users
                this.props.history.replace('/sign-out');
            }
        }, sessionLimit * 60000);        
    }

    componentDidMount() {
        // Start a request chain to obtain all data required for a visitor 
        // to start using the app without registering or signing in 
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
            return axios.get('/moderators')
        })
        .then(response => {
            this.props.storeModerators(response.data);
        })
        .then(() => {
            const provinceIds = this.getAllProvinceIds(this.props.moderators);
            // This is a "moot" request if no moderators
            return axios.get('/cities?provinces=' + provinceIds)
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
            return axios.get('/users')
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

    // Given the moderators array, create a string 
    getAllProvinceIds(moderators){
        // Determine to which provinces moderators are assigned
        // (Multiple moderators can be assigned to a given province)
        if (moderators.length === 0){
            return '';
        }
        let provinceNames = this.props.moderators.reduce((names, moderator) => {
            names[moderator.province] = '';
            return names;
        }, {});
        // Create a string if ids delimited by "|"
        provinceNames= Object.getOwnPropertyNames(provinceNames);
        const provinceIds = provinceNames.reduce((ids, name) => {
            return ids + this.props.provinceNameToIdMap[name] + '|';
        }, '');
        return provinceIds.substring(0, provinceIds.length - 1);
    }

    render() {
        // Display spinner until all required data are obtained from the server 
        if (this.state.loading){
            return (
                <div className='spinner-container'>
                    <CircleSpinner size={80} color="#686769" loading={this.state.loading}></CircleSpinner>
                </div>
            )
        }
        
        // Establish routes according to whether the user is logged in, and if so,
        // what the user's role is. 
       
        const active = this.props.loggedInUser && !this.props.loggedInUser.isModerator && !this.props.loggedInUser.isAdministrator;
        const moderator = this.props.loggedInUser && this.props.loggedInUser.isModerator;
        const administrator = this.props.loggedInUser && this.props.loggedInUser.isAdministrator;

        let routes;
        if (moderator){
            routes = (
                <>
                <Route path="/search" component={Search} />
                <Route path="/practitioners" exact component={PractitionerList} />
                <Route path="/search-results" component={PractitionerList} />
                <Route path="/practitioners/:id" exact component={Practitioner} />
                <Route path="/new-practitioner" exact component={NewPractitioner} />
                <Route path="/pending-comments" component={PendingComments} />
                <Route path="/home" component={Home} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-out" component={SignOut} />
                </>
            );
        }
        else if (administrator){
            routes = (
                <>
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-out" component={SignOut} />
                <Route path="/manage-moderators" component = {Moderators} />
                </>
            );
        }
        else if (active) { 
            routes = (
                <>
                <Route path="/search" component={Search} />
                <Route path="/practitioners" exact component={PractitionerList} />
                <Route path="/search-results" component={PractitionerList} />
                <Route path="/new-practitioner" exact component={NewPractitioner} />
                <Route path="/practitioners/:id" exact component={Practitioner} />
                <Route path="/my-activity" component={MyActivity} />
                <Route path="/home" component={Home} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-out" component={SignOut} />
                </>
            );
        }
        else {
            routes = (
                <>
                <Route path="/search" component={Search} />
                <Route path="/practitioners" exact component={PractitionerList} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/search-results" component={PractitionerList} />
                <Route path="/practitioners/:id" exact component={Practitioner} />
                <Route path="/reset-request" component={ResetRequest} />
                </>
            );
        }
        // Render the menu consistent with the routes established above.
        // Technical note: The react-router-bootstrap LinkContainer accepts 
        // the same parameters as react-router NavLink and Link
        return (
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
                            {administrator ?
                                <LinkContainer to="/manage-moderators">
                                    <NavItem>Moderators</NavItem>
                                </LinkContainer>
                                :
                                <>
                                <LinkContainer to="/practitioners">
                                    <NavItem>View All</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/search">
                                    <NavItem>Search</NavItem>
                                </LinkContainer>
                                </>
                            }
                            {active || moderator ?
                                <LinkContainer to="/new-practitioner">
                                    <NavItem>Recommend</NavItem>
                                </LinkContainer>
                                : ''
                            }
                            {active ?
                                <LinkContainer to="/my-activity">
                                    <NavItem>My Activity</NavItem>
                                </LinkContainer>                                
                                : ''
                            }
                            {moderator ?
                                <LinkContainer to="/pending-comments">
                                    <NavItem>Comments</NavItem>
                                </LinkContainer>
                                : ''
                            }
                            {active || moderator ?
                                <LinkContainer to="/home">
                                    <NavItem>Home</NavItem>
                                </LinkContainer>
                                : ''
                            }
                            {active || moderator || administrator ?
                                <LinkContainer to="/sign-out">
                                    <NavItem>Logout</NavItem>
                                </LinkContainer>
                                : 
                                <LinkContainer to="/sign-in">
                                    <NavItem>Register</NavItem>
                                </LinkContainer>
                            }
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {routes}
            </div>
            </StyleRoot>
        );
    }
}
   
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        roles: state.userReducer.roles,
        moderators: state.userReducer.moderators,
        provinceNameToIdMap: state.locationReducer.provinceNameToIdMap
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUsers: (users) => dispatch({ type: userActions.STORE_ALL_USERS, users }),
        storeUserRoles: (roles) => dispatch({ type: userActions.STORE_USER_ROLES, roles }),
        storeModerators: (moderators) => dispatch({ type: userActions.STORE_MODERATORS, moderators }),
        storeSpecialties: (specialties) => dispatch({ type: practitionerActions.STORE_SPECIALTIES, specialties }),
        storeProvinces: (provinces) => dispatch({ type: locationActions.STORE_PROVINCES, provinces }),
        storeCities: (cities) => dispatch({ type: locationActions.STORE_CITIES, cities }),
        storeQuestions: (questions) => dispatch({ type: evaluationActions.STORE_QUESTIONS, questions }),
        storeQuestionChoices: (questionChoices) => dispatch({ type: evaluationActions.STORE_QUESTION_CHOICES, questionChoices }),
        storeQuestionGroups: (questionGroups) => dispatch({ type: evaluationActions.STORE_QUESTION_GROUPS, questionGroups })
    }
}

export default Radium(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

    