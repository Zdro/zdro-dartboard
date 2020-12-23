import React from 'react';
import {Navbar} from "react-bootstrap";
import Logo from './logo.svg';
import UserMenu from "./UserMenu";
import {Link} from "react-router-dom";

function Toolbar (props) {
    return (
        <>
            <Navbar bg="dark">
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <UserMenu/>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Toolbar;