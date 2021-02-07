import React, {Component} from 'react'
import { Button, Form, FormGroup, FormText, Label, Input, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import "../css/reviewForm.css";

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            review: '',
            photo: '',
            state: '',
            city: '',
            place: ''
        };

        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log('Change detected. State updated' + name + ' = ' + value);
    }

    handleSubmit(event) {
        alert('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/" className="m-auto">Travellers Diary</NavbarBrand>
                </Navbar>
                <Card className="card">
                    <CardBody className="m-auto card-body">
                        <Form onSubmit={this.handleSubmit} >
                            <fieldset>
                                <div className="form-group">
                                    <Label for="nameImput">Name</Label>
                                    <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameImput" placeholder="Name" />
                                </div>
                                <div>
                                    <Label for="exampleText">Review</Label>
                                    <Input type="textarea" name="review"  value={this.state.review} onChange={this.handleChange} className="form-control" id="reviewImput" placeholder="Review" />
                                </div>
                                <div>
                                    <Label for="exampleFile">Photo</Label>
                                    <Input type="file" name="photo" value={this.state.photo} onChange={this.handleChange} className="form-control" id="photoImput" />
                                    <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                        It's a bit lighter and easily wraps to a new line.
                                    </FormText>
                                </div>
                                <Input type="submit" value="Submit" className="btn btn-primary" />
                            </fieldset>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default ReviewForm;
