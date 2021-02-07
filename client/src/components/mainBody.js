import React from 'react';
import "../css/mainbody.css";
import {Button} from 'reactstrap';
import {Row, Col, Container} from 'reactstrap'


function MainBody() {
    return (
        <div className="hero">
            <Container>
                <Row>
                    <Col>
                        <h2>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt rerum eius harum nihil voluptatibus, 
                            ex placeat nemo tempora consequatur beatae minima at ipsa error maiores doloribus officia voluptas 
                            cupiditate quasi.
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt rerum eius harum nihil voluptatibus, 
                            ex placeat nemo tempora consequatur beatae minima at ipsa error maiores doloribus officia voluptas 
                            cupiditate quasi.
                        </h2>
                        <Button className="btn btn-outline-dark"> CREATE REVIEW</Button>\
                        <Button className="btn btn-outline-light"> SEARCH REVIEW</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainBody
