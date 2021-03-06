import React, { Component } from 'react';
import IdentitySelector from './IdentitySelector';
import PropTypes from 'prop-types';
import Logo from '../img/logo.png'
import publicIP from 'react-native-public-ip';
import {detect} from 'detect-browser';
import iplocation from 'iplocation';
import moment from 'moment';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      identity: '',
      email: ''
    };
    this.identityService = this.props.services.identityService;
    this.sdk = this.props.services.sdk;
  }

  async identityExist(identity) {
    return await this.identityService.identityExist(identity);
  }

  async getLabel() {
    const ipAddress = await publicIP();
    const browser = detect();
    const {city} = await iplocation(ipAddress);
    return {
      ipAddress, 
      name: browser.name, 
      city, 
      time: moment().format('h:mm'),
      os: browser.os, 
      version: browser.version
    };
  }

  async onNextClick() {
    const {emitter} = this.props.services;
    await this.identityService.setEmail(this.state.email); //TEMPORARY -- this should be determined by login server request with identity.
    if (await this.identityExist(this.state.identity)) {
      emitter.emit('setView', 'ApproveConnection');
      const label = await this.getLabel();
      await this.identityService.connect(label);
    } else {
      emitter.emit('setView', 'CreatingID');
      await this.identityService.createIdentity(this.state.identity);
      //emitter.emit('setView', 'EmailVerification');
      emitter.emit('setView', 'Greeting');
    }
  }

  onChange(identity, email) {
    this.setState({identity: identity, email: email});
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
