import React, { Component } from 'react';
import GreetingView from '../views/GreetingView';
import PropTypes from 'prop-types';

class Greeting extends Component {

  showMainScreen() {
    this.props.identityService.emitter.emit('setView', 'MainScreen');
  }

  render() {
    return (
      <GreetingView identity={this.props.identityService.identity} email={this.props.identityService.email} onStartClick={this.showMainScreen.bind(this)}/>
    );
  }
}

Greeting.propTypes = {
  identityService: PropTypes.object
};

export default Greeting;