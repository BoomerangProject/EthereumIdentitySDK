import React, { Component } from 'react';
import IdentityExistingIndicator from '../views/IdentityExistingIndicator';
import TextBox from '../views/TextBox';
import Button from './Button';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';

class IdentitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefix: '',
      suffix: this.props.ensDomains[0], //TODO: this will be boomerang.eth or whatever domain we buy.
      identity: '',
      identityExist: false
    };
  }

  async updatePrefix(event) {
    const prefix = event.target.value;
    const identity = `${prefix}.${this.state.suffix}`;
    const identityExist = !!(await this.props.identityExist(identity));
    this.setState({prefix, identity, identityExist});
    this.props.onChange(identity);
    console.log(identity)
  }

  async updateSuffix(value) {
    const suffix = value;
    const identity = `${this.state.prefix}.${suffix}`;
    const identityExist = !!(await this.props.identityExist(identity));
    this.setState({suffix, identity, identityExist});
    this.props.onChange(identity);
  }

  render() {
    return (
      <div>
        <IdentityExistingIndicator exist={this.state.identityExist} />
        <div className="id-selector">
          <LoginTextBox
            placeholder="Enter your email..."
            onChange={e => this.updatePrefix(e)}
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


/*
          <Dropdown
            returnValue={this.updateSuffix.bind(this)}
            title={this.props.ensDomains[0]}
            dropdownContent={this.props.ensDomains}
          />
*/

IdentitySelector.propTypes = {
  onChange: PropTypes.func,
  onNextClick: PropTypes.func,
  ensDomains: PropTypes.arrayOf(PropTypes.string),
  services: PropTypes.object, 
  identityExist: PropTypes.func
};

export default IdentitySelector;
