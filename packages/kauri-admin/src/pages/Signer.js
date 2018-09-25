import React, { Component } from 'react';
import Web3Utils from '../components/Web3Utils'
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Alert } from 'react-bootstrap';

class Signer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { 
      config: props.config,
      updateLoadingFlag: props.updateLoadingFlag
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.ecsign = this.ecsign.bind(this);
    this.ecrecover = this.ecrecover.bind(this);

  }


  validateForm(form, fields) {
      var valid = fields.reduce(function(prevVal, elem) {
          return prevVal && this.validateField(form, elem) === 'success';
      }.bind(this), true);

      return valid;
  }

  validateField(form, field) {
      var result = null;

      var value = this.state[field];
      if(value === undefined || value===null) return null;

      var length = value.length;

      if(form === "ecsign") {

        switch(field) {
        case "dataToSign":
            result = (length > 0) ?  'success':'error';
            break;
        default:
            break;
        }

      } else if(form === "ecrecover") {

        switch(field) {
        case "data":
            result = (length > 0) ?  'success':'error';
            break;
        case "signatureToRecov":
            result = (length > 0) ?  'success':'error';
            break;
        default:
            break;
        }

      }

      return result;
  }

  handleChange(event) {
    switch(event.target.name) {
      case "dataToSign":
        this.setState({"dataToSign": event.target.value})
        break;
      case "data":
        this.setState({"data": event.target.value})
        break;
      case "signatureToRecov":
        this.setState({"signatureToRecov": event.target.value})
        break;

      default:
        break;
    }
  }

  async ecsign() {
    this.setState({error1: null})
    this.setState({success1: null})


    if(!this.validateForm("ecsign", ["dataToSign"])) {
        this.setState({error1: "Form not valid"})
        return;

    } else {
      this.state.updateLoadingFlag(true);
      console.log("ecsign '" + this.state.dataToSign + "' ...");

      var signature = await new Web3Utils().sign(this.state.dataToSign);
      this.setState({signature: signature})
      this.state.updateLoadingFlag(false);

    }
  }

  async ecrecover() {
    this.setState({error2: null})
    this.setState({success2: null})

    if(!this.validateForm("ecrecover", ["data", "signatureToRecov"])) {
        this.setState({error2: "Form not valid"})
        return;

    } else {

      var address = await new Web3Utils().recover(this.state.data, this.state.signatureToRecov);

      this.setState({address: address})
    }
  }
  
  render() {
    return (
      <div className="Signer">
        <h1 className="Title">EC Sign</h1>


        <Form horizontal  className="Section">

            { this.state.error1 ? 
              <div>
                <Col sm={2}></Col>
                <Col sm={10}>
                  <Alert bsStyle="danger">{this.state.error1}</Alert> 
                </Col> 
              </div>
             : null }

            { this.state.success1 ? 
              <div>
                <Col sm={2}></Col>
                <Col sm={10}>
                  <Alert bsStyle="success">{this.state.success1}</Alert> 
                </Col> 
              </div>
             : null }
            

          <FormGroup controlId="formData" validationState={this.validateField("ecsign", "dataToSign")}>
            <Col componentClass={ControlLabel} sm={2}>Data to sign*</Col>
            <Col sm={8}>
                <FormControl
                  type="text"
                  name="dataToSign"
                  placeholder="Enter data to sign"
                  value={this.state.dataToSign}
                  onChange={this.handleChange}
                />
            </Col>
            <Col sm={2}>
              <Button type="button" onClick={this.ecsign}>Sign</Button>
            </Col>
          </FormGroup>


          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Signature</Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" value={this.state.signature} readOnly />
            </Col>
          </FormGroup>

        </Form>;




        <h1 className="Title">EC Recover</h1>


        <Form horizontal  className="Section">

            { this.state.error2 ? 
              <div>
                <Col sm={2}></Col>
                <Col sm={10}>
                  <Alert bsStyle="danger">{this.state.error2}</Alert> 
                </Col> 
              </div>
             : null }

            { this.state.success2 ? 
              <div>
                <Col sm={2}></Col>
                <Col sm={10}>
                  <Alert bsStyle="success">{this.state.success2}</Alert> 
                </Col> 
              </div>
             : null }

          <FormGroup controlId="formData" validationState={this.validateField("ecrecover", "data")}>
            <Col componentClass={ControlLabel} sm={2}>Data signed*</Col>
            <Col sm={10}>
                <FormControl
                  type="text"
                  name="data"
                  placeholder="Enter data signed"
                  value={this.state.data}
                  onChange={this.handleChange}
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formSignature" validationState={this.validateField("ecrecover", "signatureToRecov")}>
            <Col componentClass={ControlLabel} sm={2}>Signature*</Col>
            <Col sm={10}>
                <FormControl
                  type="text"
                  name="signatureToRecov"
                  placeholder="Enter signature"
                  value={this.state.signatureToRecov}
                  onChange={this.handleChange}
                />
            </Col>
          </FormGroup>


            <FormGroup>
              <Col smOffset={2} sm={10}>
                  <Button type="button" onClick={this.ecrecover}>Recover</Button>
              </Col>
            </FormGroup>


          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Address recovered</Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" value={this.state.address} readOnly />
            </Col>
          </FormGroup>

        </Form>;

      </div>
    );
  }
}

export default Signer;