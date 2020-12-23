import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Redirect, useLocation} from "react-router-dom";
import {Card, Container, Row} from "react-bootstrap";
import CenterLoadingSpinner from "../components/CenterLoadingSpinner";
// import { useHistory } from 'react-router-dom'; // if you use react-router
//import GoogleButton from 'react-google-button' // optional

function LoginPage(props) {
    const firebase = useFirebase()
    const auth = useSelector(state => state.firebase.auth)
    let location = useLocation();

    return (
        !isLoaded(auth) ? <CenterLoadingSpinner/> :
        <Container className="d-flex align-items-center justify-content-center h-100">
            <Row className="justify-content-center">
                <Card>
                    <Card.Header>
                        <Card.Title>Welcome</Card.Title>
                    </Card.Header>
                    <Card.Body>
                {
                    isEmpty(auth)
                        ? <StyledFirebaseAuth
                            uiConfig={{
                                signInFlow: 'popup',
                                signInSuccessUrl: '/signedIn',
                                signInOptions: [
                                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                                    firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
                                ],
                                callbacks: {
                                    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                                        firebase.handleRedirectResult(authResult).then(() => {
                                            // history.push(redirectUrl); if you use react router to redirect
                                        });
                                        return false;
                                    },
                                },
                            }}
                            firebaseAuth={firebase.auth()}
                        />
                        :
                        <Redirect
                            to={{
                                pathname: location.state && location.state.redirectTo ? location.state.redirectTo : '/',
                                state: { from: location }
                            }}
                        />
                }
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default LoginPage