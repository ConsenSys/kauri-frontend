import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Alert } from 'react-bootstrap';
import Web3Utils from '../components/Web3Utils'

class TransactionReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            config: props.config,
            updateLoadingFlag: props.updateLoadingFlag,
            web3Util: new Web3Utils()
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

        var length = value.length;

        switch(field) {
        case "transacionHash":
            result = (length>0) ?  'success':'error';
            break;
        default:
            break;
        }

        return result;
    }

    handleChange(event) {
        switch(event.target.name) {
        case "transacionHash":
            this.setState({"transacionHash": event.target.value})
            break;
        default:
            break;
        }

    }

    async handleSubmit(event) {
          this.setState({error: null})
          this.setState({success: null})

        if(!this.validateForm(["transacionHash"])) {
            this.setState({error: "Form not valid"})
            return;

        } else {

            this.state.updateLoadingFlag(true);
            var receipt = await this.state.web3Util.getTransactionReceipt(this.state.transacionHash)
            console.log(receipt)

            if(receipt == null) {
              this.setState({error: "receipt is nul"})
              this.state.updateLoadingFlag(false);
              return;
            }

            this.setState({transactionReceipt: JSON.stringify(receipt, null, 2)})
            this.state.updateLoadingFlag(false);

        }
    }

    render() {
        return (
        <div className="Authenticator">
            <h1 className="Title">Transaction Receipt</h1>

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
                

              <FormGroup controlId="formUsername" validationState={this.validateField("transacionHash")}>
                <Col componentClass={ControlLabel} sm={2}>Transaction Hash*</Col>
                <Col sm={10}>
                    <FormControl
                      type="text"
                      name="transacionHash"
                      placeholder="Enter transacion Hash"
                      value={this.state.transacionHash}
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
                <Col componentClass={ControlLabel} sm={2}>Transaction Receipt</Col>
                <Col sm={10}>
                    <FormControl
                      name="transactionReceipt"
                      componentClass="textarea"
                      value={this.state.transactionReceipt}
                      readOnly
                    />
                </Col>
              </FormGroup>
            </Form>;

        </div>
        );
    }
}

export default TransactionReceipt;