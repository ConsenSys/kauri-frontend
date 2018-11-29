import React, { Component } from 'react';
import Configuration from '../components/Configuration'
import Web3Utils from '../components/Web3Utils'
import { PrimaryButton } from '../../../kauri-components/components/Button';

class Config extends Component {
  constructor(props) {
    super(props);
    
    this.web3Utils = new Web3Utils();
    this.web3Utils.getNetwork().then(function(network) {
      this.networkId = network.networkId;
    }.bind(this));

    this.state = { 
      config: props.config,
      topics_sm: props.config.getSmartContractAddresses().topics,
      wallet_sm: props.config.getSmartContractAddresses().wallet,
      kauri_sm: props.config.getSmartContractAddresses().kauri,
      environment: props.config.getBackend().name
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);

  }


    validateform(fields) {
        var valid = fields.reduce(function(prevVal, elem) {
            return prevVal && this.validateField(elem) === 'success';
        }.bind(this), true);

        return valid;
    }

    validateField(field) {
        var result = null;

        var value = this.state[field];
        if(value === undefined || value===null) return 'success';

        var length = value.length;

        switch(field) {
        case "environment":
            result = (length > 0) ?  'success':'error';
            break;
        case "kauri_sm":
            result = (length === 0 || window.web3.isAddress(value)) ?  'success':'error';
            break;
        case "wallet_sm":
            result = (length === 0 || window.web3.isAddress(value)) ?  'success':'error';
            break;
        case "topics_sm":
            result = (length === 0 || window.web3.isAddress(value)) ?  'success':'error';
            break;
        default:
            break;
        }

        return result;
    }

    handleChange(event) {
        switch(event.target.name) {
        case "environment":
            this.setState({"environment": event.target.value})
            break;
        case "kauri_sm":
            this.setState({"kauri_sm": event.target.value})
            break;
        case "wallet_sm":
            this.setState({"wallet_sm": event.target.value})
            break;
        case "topics_sm":
            this.setState({"topics_sm": event.target.value})
            break;
        default:
            break;
        }

    }

    handleSubmit(event) {
        this.setState({error: null, success: null})

        if(!this.validateform(["environment", "kauri_sm", "wallet_sm", "topics_sm"])) {
            this.setState({error: "form not valid - Please check your Ethereum network"})
            return;

        } else {
            this.state.config.setBackend(this.state.environment)
            this.state.config.setSmartContractAddresses({
              kauri: this.state.kauri_sm,
              wallet: this.state.wallet_sm,
              topics: this.state.topics_sm
            })
            this.setState({success: "success"})
        }
    }

  render() {
    return (
      <div className="Topics">
        <h1 className="Title">Configuration</h1>

            <form horizontal  className="Section">

                { this.state.error ? 
                  <div>
                    <div></div>
                    <div>
                      <div>{this.state.error}</div> 
                    </div> 
                  </div>
                 : null }

                { this.state.success ? 
                  <div>
                    <div></div>
                    <div>
                      <div>{this.state.success}</div> 
                    </div> 
                  </div>
                 : null } 

              <div>
                <label>Backend Environment</label>
                <div>
                    <select
                      componentClass="select" 
                      name="environment"
                      value={this.state.environment}
                      onChange={this.handleChange}
                    >
                        <option value=""></option>
                        { Object.keys(Configuration._BACKEND).map(key => 
                            <option key={key} selected={key === this.state.config.getBackend().name} value={key}>{key + ' [compatible network ' + Configuration._BACKEND[key].network_id + ']'}</option>) }
                    </select>
                </div>
              </div>


              <div>
                <label>Kauri SmartContract address</label>
                <div>
                    <input
                      type="text"
                      name="kauri_sm"
                      value={this.state.kauri_sm}
                      onChange={this.handleChange}
                      required="true"
                    />
                </div>
              </div>


              <div>
                <label>Wallet SmartContract address</label>
                <div>
                    <input
                      type="text"
                      name="wallet_sm"
                      value={this.state.wallet_sm}
                      onChange={this.handleChange}
                      required="true"
                    />
                </div>
              </div>


              <div>
                <label>TopicModerator SmartContract address</label>
                <div>
                    <input
                      type="text"
                      name="topics_sm"
                      value={this.state.topics_sm}
                      onChange={this.handleChange}
                      required="true"
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


export default Config;