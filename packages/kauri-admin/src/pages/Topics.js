import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Alert, Table } from 'react-bootstrap';
import SmartContract from '../components/SmartContract'

class Topics extends Component {
  constructor(props) {
    super(props);


    this.state = { 
      config: props.config,
      updateLoadingFlag: props.updateLoadingFlag,
      topics:[], 
      SmartContract: new SmartContract(props.config) 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitNewTopicModerator = this.handleSubmitNewTopicModerator.bind(this);
    this.handleSubmitRemoveModerator = this.handleSubmitRemoveModerator.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleAddModeratorButton = this.handleAddModeratorButton.bind(this);

  }

  componentWillMount() {

    if(!this.state.config.getSmartContractAddresses().topics
      || this.state.config.getSmartContractAddresses().topics === "") {
          this.setState({error: "You must configure the TopicModerator SmartContract address in Configuration"})
        return;
    }


    this.state.updateLoadingFlag(true);

    this.state.SmartContract.loadTopicModerators().then(function(topics) {
      this.setState({topics:topics})
      this.state.updateLoadingFlag(false);
    }.bind(this))
    .catch(function(err) {
      this.setState({error: err})
      this.state.updateLoadingFlag(false);
    }.bind(this));
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
      case "topic":
          result = (length > 2) ?  'success':'error';
          break;
      case "moderator":
          result = (window.web3.isAddress(value)) ?  'success':'error';
          break;
      default:
          break;
      }

      return result;
  }

  handleChange(event) {
      switch(event.target.name) {
      case "topic":
          this.setState({"topic": event.target.value})
          break;
      case "moderator":
          this.setState({"moderator": event.target.value})
          break;
      default:
          break;
      }

  }

  async handleSubmitNewTopicModerator(event) {
      console.log("handleSubmitNewTopicModerator")
      this.setState({error: null})
      this.setState({success: null})

      if(!this.validateForm(["topic", "moderator"])) {
          this.setState({error: "Form not valid"})
          return;

      } else {
        const hash = await this.state.SmartContract.addTopicModerator(this.state.topic, this.state.moderator);
        this.setState({success: "Transaction sent. hash="+hash})
      }
  }
  async handleSubmitRemoveModerator(topic, moderator) {
      const hash = await this.state.SmartContract.removeModerator(topic, moderator);
      this.setState({success: "Transaction sent. hash="+hash})
  }

  handleAddModeratorButton(topic) {
    this.setState({topic:topic});
  }

  render() {
    return (
      <div className="Topics">
        <h1 className="Title">Topics</h1>

          <Table striped bordered condensed hover className="Section">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Moderator</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { Object.keys(this.state.topics).map((topic) => {
                 return (
                <tr>
                  <td>{topic}</td>
                  <td>
                    {
                    (this.state.topics[topic]).map((mod) => { 
                      return (
                        <div>
                        {mod} {' '}
                        <Button 
                            bsSize="xsmall"
                            onClick={() => this.handleSubmitRemoveModerator(topic, mod)}>
                              Remove moderator
                            </Button>
                          </div>
                      )}
                  )
                  }
                    
                  </td>

                  <td>
                    <Button 
                      bsSize="xsmall"  
                      onClick={() => this.handleAddModeratorButton(topic)}>
                        Add moderator
                    </Button> 
                    </td>
                </tr>
                )}

                ) }
            </tbody>
          </Table>

          <br/><br/><br/><br/>

          <h1 className="Title">Add Topic/Moderator</h1>

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
           
            <FormGroup controlId="formTopic" validationState={this.validateField("topic")}>
              <Col componentClass={ControlLabel} sm={2}>Topic*</Col>
              <Col sm={10}>
                  <FormControl
                    type="text"
                    name="topic"
                    placeholder="Enter topic"
                    value={this.state.topic}
                    onChange={this.handleChange}
                    required="true"
                  />
              </Col>
            </FormGroup>

            <FormGroup controlId="formModerator" validationState={this.validateField("moderator")}>
              <Col componentClass={ControlLabel} sm={2}>Moderator*</Col>
              <Col sm={10}>
                  <FormControl
                    type="text"
                    name="moderator"
                    placeholder="Enter moderator"
                    value={this.state.moderator}
                    onChange={this.handleChange}
                    required="true"
                  />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                  <Button type="button" onClick={this.handleSubmitNewTopicModerator}>Submit</Button>
              </Col>
            </FormGroup>

          </Form>;



      </div>
    );
  }
}


export default Topics;