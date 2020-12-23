import React from 'react';
import {Container, Row, Spinner} from "react-bootstrap";

function CenterLoadingSpinner (){
    return (
        <Container className="d-flex align-items-center justify-content-center h-100">
            <Row className="justify-content-center">
                <Spinner animation="border" role="status" style={{width:'10rem', height:'10rem'}}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row>
        </Container>
    )
}

export default CenterLoadingSpinner;