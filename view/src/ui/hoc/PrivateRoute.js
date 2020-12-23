import React from 'react';
import {
    Route, Redirect
} from 'react-router-dom';

import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export function PrivateRoute({ children, computedMatch, ...rest }) {
    const auth = useSelector(state => state.firebase.auth)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoaded(auth) && !isEmpty(auth) ? (
                        React.cloneElement(children, {...rest, match : computedMatch})
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location , redirectTo: rest.location ? rest.location.pathname : rest.path}
                        }}
                    />
                )
            }
        />
    );
}