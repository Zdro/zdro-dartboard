import React from "react";
import {Button, Dropdown} from "react-bootstrap";
import {isLoaded, isEmpty, useFirebase} from 'react-redux-firebase'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function UserMenu(props){
    const auth = useSelector(state => state.firebase.auth)

    const firebase = useFirebase();

    if (!isLoaded(auth) || isEmpty(auth)){
        return (
            <Button as={Link} to={'/login'}>
                Login
            </Button>
        )
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="dark">
                    {auth.displayName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => firebase.auth().signOut()}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default UserMenu;