import React, { Component } from 'react';
import Web3Utils from '../components/Web3Utils'
import Configuration from '../components/Configuration'
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Alert } from 'react-bootstrap';

class Faucet extends Component {
    constructor(props) {
        super(props);

        this.web3Utils = new Web3Utils();

        this.state = { 
            config: props.config,
            address: this.web3Utils.getAccount()
        };

        this.web3Utils.getNetwork().then(function(network) {
          this.setState({network});
        }.bind(this));

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

        var length = value.length;

        switch(field) {
        case "address":
            result = (length > 0 && window.web3.isAddress(value)) ?  'success':'error';
            break;
        default:
            break;
        }

        return result;
    }

    handleChange(event) {
        switch(event.target.name) {
        case "address":
            this.setState({"address": event.target.value})
            break;
        default:
            break;
        }

    }

    async handleSubmit(event) {
            this.setState({error: null})
            this.setState({success: null})

        if(!this.validateForm(["address"])) {
            this.setState({error: "Form not valid"})
            return;

        } else {
          //TODO
          this.setState({success: Configuration._FAUCETS[this.state.network.networkName]})

        }
    }

    render() {
        return (
        <div className="Authenticator">
            <h1 className="Title">Faucet</h1>

            <Form horizontal  className="Section">

                { this.state.error ? 
                  <div>
                    <Col sm={2}></Col>
                    <Col sm={10}>
                      <Alert bsStyle="danger">{this.state.error}</Alert> 
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
                

              <FormGroup controlId="formEmail" validationState={this.validateField("address")}>
                <Col componentClass={ControlLabel} sm={2}>Address*</Col>
                <Col sm={10}>
                    <FormControl
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      value={this.state.address}
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

            </Form>;

        </div>
        );
    }
}

export default Faucet;