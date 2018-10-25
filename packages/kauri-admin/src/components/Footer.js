import React, { Component } from 'react';
import Web3Utils from './Web3Utils';
import { Link } from 'react-router-dom'

var footer = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { config: props.config };

     new Web3Utils().getNetwork().then(function(result) {
        this.setState(result);
     }.bind(this)).catch(function(err) {
        console.log(err)
     });

  }
  
  render() {
    return (

        <div>
            <div style={footer}>
                <b>Ethereum Network:</b> {this.state.networkName} [{this.state.networkId}] | <b>Backend environment:</b> {this.state.config.getBackend().name} {'  '}
                {
                  this.state.config.getBackend().network_id !== this.state.networkId ?
                   <Link to="/config"><span className="Error">Invalid combinaison, switch network or backend</span></Link> : null

                }
            </div>
        </div>
    );
  }
}


export default Footer;