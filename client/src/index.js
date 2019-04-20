import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import practitionersReducer from './store/practitionersReducer';
import userReducer from './store/userReducer';
import evaluationReducer from './store/evaluationReducer';
import locationReducer from './store/locationReducer';
import commentReducer from './store/commentReducer';
import * as practitionerActions from './store/practitionerActions';
import * as userActions from './store/userActions';
import * as evaluationActions from './store/evaluationActions';
import * as locationActions from './store/locationActions';
import App from './App';
import axios from 'axios';
import thunk from 'redux-thunk';

// Create the store
const rootReducer = combineReducers(
    {
        userReducer: userReducer,
        practitionersReducer: practitionersReducer,
        evaluationReducer: evaluationReducer,
        locationReducer: locationReducer,
        commentReducer: commentReducer
    }
    );
    
    // Enable Redux devtools Chrome extension, and add thunk middleware (support for asynchronous 
    // actions,) per https://github.com/zalmoxisus/redux-devtools-extension#usage
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    
    //axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
    axios.defaults.headers.post['Content-Type'] = 'application/json'; // Necessary ?
    
    console.log(document.baseURI);
    if (document.baseURI === "http://localhost:3000/"){
    // Client loaded from VSCode local server 
    axios.defaults.baseURL ="http://localhost:8080/rest/"; 
}
else {
    // Client loaded from local or remote App Engine server
    axios.defaults.baseURL =  document.baseURI + "rest/";
}

// Log all errors
axios.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
/*******************************************/

// Fetch the "static" data from the server
axios.get('/initialize')
.then(() => {
    return axios.get('/roles')
})
.then(response => {
    store.dispatch({ type: userActions.STORE_USER_ROLES, roles: response.data });
})
.then(() => {
    return axios.get('/specialties')
})
.then(response => {
    store.dispatch({ type: practitionerActions.STORE_SPECIALTIES, specialties: response.data });
})
.then(() => {
    return axios.get('/provinces')
})
.then(response => {
    store.dispatch({ type: locationActions.STORE_PROVINCES, provinces: response.data });
})
.then(() => {
    return axios.get('/cities')
})
.then(response => {
    store.dispatch({ type: locationActions.STORE_CITIES, cities: response.data });
})
.then(() => {
    return axios.get('/questions')
})
.then(response => {
    // Sort the questions by display order
    const questions = response.data.sort(function(a, b){return a.displayIndex - b.displayIndex});
    store.dispatch({ type: evaluationActions.STORE_QUESTIONS, questions: questions });
})
.then(() => {
    return axios.get('/questionchoices')
})
.then(response => {
    store.dispatch({ type: evaluationActions.STORE_QUESTION_CHOICES, questionChoices: response.data });
})
.then(() => {
    return axios.get('/questiongroups')
})
.then(response => {
    store.dispatch({ type: evaluationActions.STORE_QUESTION_GROUPS, questionGroups: response.data });
    console.log("Completed loading");
    ReactDOM.render(app, document.getElementById('root'));
})
.then(() => {
    // Must also retrieve all users to be able to identify them in the comments
    return axios.get('/users?basic=true')
})
.then(response => {
    store.dispatch({ type: userActions.STORE_ALL_USERS, users: response.data });
})
// TODO: Replace with user friendly response
.catch(error => {
    console.log(error);
});

// Below was for accessing maps from the client.
// console.log('Initializing GAPI...');
// console.log('Creating the google script tag...');

// const script = document.createElement("script");
// script.src = "https://apis.google.com/js/client.js";
// script.onload = () => {
//     console.log('Loaded script, now loading our api...')
//     // Gapi isn't available immediately so we have to wait until it is to use gapi.
//     loadClientWhenGapiReady(script);
// };
// document.body.appendChild(script);

// const loadClientWhenGapiReady = (script) => {
//     console.log('Trying To Load Client!');
//     console.log(script)
//     if(script.getAttribute('gapi_processed')){
//         console.log('Client is ready! Now you can access gapi. :)');
//     }
//     else{
//         console.log('Client wasn\'t ready, trying again in 100ms');
//         setTimeout(() => {loadClientWhenGapiReady(script)}, 100);
//     }
// }

const app = (
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
    );
    