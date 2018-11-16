import React, { Component } from 'react';
import WebService from '../components/WebService'
import { PrimaryButton } from '../../../kauri-components/components/Button';

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
            this.setState({error: "form not valid"})
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

            <form horizontal  className="Section">

                { this.state.error ? 
                  <div>
                    <div></div>
                    <div>
                    <div bsStyle="danger">{this.state.error && this.state.error.message}</div>
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
                

              <div>
                <div>Email</div>
                <div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required="true"
                    />
                </div>
              </div>

              <div>
                <div>Username</div>
                <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={this.state.username}
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

              <div controlId="formResultJwt">
                <div>JWT</div>
                <div>
                    <input
                      name="jwt"
                      componentClass="textarea"
                      value={this.state.jwt}
                      readOnly
                    />
                </div>
              </div>
            </form>
        </div>
        );
    }
}

export default Authenticator;