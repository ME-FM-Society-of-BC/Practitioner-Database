import 'react-app-polyfill/ie11';
import 'babel-polyfill';
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
import App from './App';
import axios from 'axios';
import thunk from 'redux-thunk';


// Regarding react-app-polyfill/ie11 refer to
// https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md
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

// // Log all errors
// axios.interceptors.request.use(request => {
//     return request;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });
// axios.interceptors.response.use(response => {
//     dispatch(actions.checkAuthTimeout(1));
//     return response;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });

// For some reason things don't kick off unless I have some async code here.
// Initialize call will seed the database if it is empty
axios.get('/initialize')
.then(() => {
    ReactDOM.render(app, document.getElementById('root'));
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
    