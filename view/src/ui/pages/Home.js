import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Toolbar from '../components/Toolbar'
import {useSelector} from "react-redux";
import {isLoaded} from "react-redux-firebase";
import NewGame from "./NewGame";
import CenterLoadingSpinner from "../components/CenterLoadingSpinner";

function Home(){
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)){
        return (
            <CenterLoadingSpinner/>
        )
    }

    return (
        <>
            <Toolbar/>
            <Container className="flex-grow-1 flex-shrink-1 flex-column overflow-auto" fluid>
                <Container className="p-3">
                    <Row>
                        {
                            [1,2].map((e, v) => (
                                    <Col key={e} className="my-3" sm={12} >
                                        <NewGame/>
                                    </Col>
                                )
                            )
                        }
                    </Row>
                </Container>
            </Container>
        </>
    )
}
export default Home;