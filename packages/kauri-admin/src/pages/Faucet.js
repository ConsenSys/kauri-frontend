import React, { Component } from 'react';
import Web3Utils from '../components/Web3Utils'
import Configuration from '../components/Configuration'
import PrimaryButton from '../../../kauri-components/components/Button/PrimaryButton';

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

            <form>

                { this.state.error ? 
                  <div>
                    <div></div>
                    <div>
                      <div bsStyle="danger">{this.state.error}</div> 
                    </div> 
                  </div>
                 : null }
                { this.state.success ? 
                  <div>
                    <div></div>
                    <div>
                      <div bsStyle="success">{this.state.success}</div> 
                    </div> 
                  </div>
                 : null }
                

              <div controlId="formEmail" validationState={this.validateField("address")}>
                <label>Address*</label>
                <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                </div>
              </div>

              <div>
                <div>
                    <PrimaryButton type="button" onClick={this.handleSubmit}>Submit</PrimaryButton>
                </div>
              </div>

            </form>;

        </div>
        );
    }
}

export default Faucet;