import React, { Component } from 'react';
import WebService from '../components/WebService'
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Alert } from 'react-bootstrap';

class Authenticator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            config: props.config,
            updateLoadingFlag: props.updateLoadingFlag
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    validateForm(fields) {
        var valid = fields.reduce(function(prevVal, elem) {
            return prevVal && this.validateField(elem) === 'success';
        }.bind(this), true);

        return valid;
    }

    validateField(field) {
        var result = null;

        var value = this.state[field];
        if(value === undefined || value===null) return null;

        //var length = value.length;

        switch(field) {
        case "email":
            result = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(value) ?  'success':'error';
            break;
        case "username":
            result = 'success';
            break;
        default:
            break;
        }

        return result;
    }

    handleChange(event) {
        switch(event.target.name) {
        case "email":
            this.setState({"email": event.target.value})
            break;
        case "username":
            this.setState({"username": event.target.value})
            break;
        default:
            break;
        }

    }

    async handleSubmit(event) {
            this.setState({error: null})
            this.setState({success: null})

        if(!this.validateForm(["email", "username"])) {
            this.setState({error: "Form not valid"})
            return;

        } else {

            this.state.updateLoadingFlag(true);
            new WebService(this.state.config).authenticate(this.state.email, this.state.username)
            .then(function (jwt) {
                this.setState({jwt: jwt})
                this.setState({success: "success"})
                this.state.updateLoadingFlag(false);
            }.bind(this))
            .catch(function (error) {
                this.setState({error: error})
                this.state.updateLoadingFlag(false);
            }.bind(this));
        }
    }

    render() {
        return (
        <div className="Authenticator">
            <h1 className="Title">Authenticator</h1>

            <Form horizontal  className="Section">

                { this.state.error ? 
                  <div>
                    <Col sm={2}></Col>
                    <Col sm={10}>
                    <Alert bsStyle="danger">{this.state.error && this.state.error.message}</Alert>
                    </Col> 
                  </div>
                 : null }

                { this.state.success ? 
                  <div>
                    <Col sm={2}></Col>
                    <Col sm={10}>
                      <Alert bsStyle="success">{this.state.success}</Alert> 
                    </Col> 
                  </div>
                 : null }
                

              <FormGroup controlId="formEmail" validationState={this.validateField("email")}>
                <Col componentClass={ControlLabel} sm={2}>Email</Col>
                <Col sm={10}>
                    <FormControl
                      type="text"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required="true"
                    />
                </Col>
              </FormGroup>

              <FormGroup controlId="formUsername" validationState={this.validateField("username")}>
                <Col componentClass={ControlLabel} sm={2}>Username</Col>
                <Col sm={10}>
                    <FormControl
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required="true"
                    />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="button" onClick={this.handleSubmit}>Submit</Button>
                </Col>
              </FormGroup>

              <FormGroup controlId="formResultJwt">
                <Col componentClass={ControlLabel} sm={2}>JWT</Col>
                <Col sm={10}>
                    <FormControl
                      name="jwt"
                      componentClass="textarea"
                      value={this.state.jwt}
                      readOnly
                    />
                </Col>
              </FormGroup>
            </Form>;

        </div>
        );
    }
}

export default Authenticator;