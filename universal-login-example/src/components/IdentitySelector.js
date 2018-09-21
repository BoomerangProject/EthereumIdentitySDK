import React, { Component } from 'react';
import IdentityExistingIndicator from '../views/IdentityExistingIndicator';
import TextBox from '../views/TextBox';
import Button from './Button';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import UsernameGenerator from '../utils/UsernameGenerator'

const USERNAME_LENGTH = 20;

class IdentitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      suffix: this.props.ensDomains[0],
      identity: '',
      identityExist: false
    };
    this.usernameGenerator = new UsernameGenerator();
  }

  async updateEmail(event) {
    var email = `${event.target.value}`;
    var identity = `${this.usernameGenerator.generateUsername(USERNAME_LENGTH, email)}.${this.state.suffix}`;
    const identityExist = !!(await this.props.identityExist(identity));
    this.setState({email, identity, identityExist});
    this.props.onChange(identity, email);
  }

  render() {
    return (
      <div>
        <IdentityExistingIndicator exist={this.state.identityExist} />
        <div className="id-selector">
          <LoginTextBox
            placeholder="Enter your email..."
            onChange={e => this.updateEmail(e)}
          />
        </div>
        <Button onClick={this.props.onNextClick.bind(this) }>Next</Button>
      </div>
    );
  }
}

const LoginTextBox = props => (
  <input
    className="full-input"
    onChange={props.onChange}
    type="text"
    placeholder={props.placeholder}
  />
);

IdentitySelector.propTypes = {
  onChange: PropTypes.func,
  onNextClick: PropTypes.func,
  ensDomains: PropTypes.arrayOf(PropTypes.string),
  services: PropTypes.object, 
  identityExist: PropTypes.func
};

export default IdentitySelector;
