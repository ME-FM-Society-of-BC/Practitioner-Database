import 'react-app-polyfill/ie11';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
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
import { getBaseURI } from './common/utilities' 

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

let baseURI = getBaseURI();
console.log(baseURI);
if (baseURI === "http://localhost:3000/"){
    // Client loaded from VSCode local server 
    axios.defaults.baseURL ="http://localhost:8080/"; 
}
else {
    // Client loaded from local or remote App Engine server
    axios.defaults.baseURL =  baseURI;
}

// This does not work in Chrome
window.addEventListener("beforeunload", function (e) {
    const message = 'WARNING: Refreshing the browser in this application can cause errors.'
        + '\nPlease use the menus to navigate through the application.'
        + 'If you experience problems, enter the original url into your address bar' 
        + '(you will again see this warning, but in that case just accept the reload.)'; 
    this.console.log('beforeunload');
//    e.preventDefault();
    e.returnValue = message;
    return message;
});

// For some reason things don't kick off unless I have some async code here.
// (Might just be the case for local development ?)
(new Promise(function (resolve, reject) {
    resolve()
})).then(() => {
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
//     <BrowserRouter>


const app = (
    <Provider store={store}>
    <HashRouter>
    <App />
    </HashRouter>
    </Provider>
    );
    