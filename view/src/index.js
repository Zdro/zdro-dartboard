import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import {createStore, applyMiddleware} from 'redux'
import { getFirebase, ReactReduxFirebaseProvider} from 'react-redux-firebase'
import {createFirestoreInstance} from 'redux-firestore' // <- needed if using firestore
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./ui/App";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";

const fbConfig = {
    apiKey: "AIzaSyA2pveNE1C1MqCYEWtGkcpHiAzJ70XTun8",
    authDomain: "dartboard-zdro.firebaseapp.com",
    databaseURL: "https://dartboard-zdro.firebaseio.com",
    projectId: "dartboard-zdro",
    storageBucket: "dartboard-zdro.appspot.com",
    messagingSenderId: "134110776822",
    appId: "1:134110776822:web:63b20cc48cd95395884bd7",
    measurementId: "G-C79FPZGZ49"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Create store with reducers and initial state
const initialState = {}

const store = createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument({ getFirebase }))
);
//const store = createStore(rootReducer, initialState)

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}

render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>
    </Provider>
    , document.getElementById('root')
)
