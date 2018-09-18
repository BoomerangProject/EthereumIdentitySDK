import React, { Component } from 'react';
import IdentitySelector from './IdentitySelector';
import PropTypes from 'prop-types';
import Logo from '../img/logo.png'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      identity: ''
    };
    this.identityService = this.props.services.identityService;
    this.sdk = this.props.services.sdk;
  }

  async identityExist(identity) {
    return await this.identityService.identityExist(identity);
  }

  async onNextClick() {
    const {emitter} = this.props.services;
    if (await this.identityExist(this.state.identity)) {
      emitter.emit('setView', 'ApproveConnection');
      await this.sdk.connect(this.identityService.identity.address);
      //TODO: Move to the next screen when done
    } else {
      emitter.emit('setView', 'CreatingID');
      await this.identityService.createIdentity(this.state.identity);
      emitter.emit('setView', 'Greeting');
    }
  }

  onChange(identity) {
    this.setState({identity});
  }

  render() {
    const {ensDomains} = this.props.services.config;
    return (
      <div className="login-view">
        <div className="container">
        <img className="main-title" src={Logo}/>
          <p className="login-view-text">
          Login to Boomerang using your email address. Don't have an account? Just enter your email address to create a new account.
          </p>
          <IdentitySelector
            onNextClick={() => this.onNextClick()}
            onChange={this.onChange.bind(this)}
            ensDomains={ensDomains}
            identityExist = {this.identityExist.bind(this)}
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  services: PropTypes.object
};


export default Login;
