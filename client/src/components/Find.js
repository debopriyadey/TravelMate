import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import "../css/login.css";

class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: ''
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
                    <NavbarBrand href="/" className="m-auto">Fight depression</NavbarBrand>
                </Navbar>
                <Card className="card">
                    <CardBody className="m-auto card-body">
                        <Form onSubmit={this.handleSubmit} >
                            <fieldset>
                                <div className="form-group">
                                    <Label for="nameImput">Name</Label>
                                    <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameImput" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <Label for="emailImput">Email</Label>
                                    <Input name="email" type="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="emailImput" placeholder="email@domain.com" />
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

export default Find;