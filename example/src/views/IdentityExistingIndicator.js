import React from 'react';
import PropTypes from 'prop-types';

const IdentityExistingIndicator = props => (
  <div>
    <p className={props.exist ? 'login-method' : 'login-method active'}>
      Create a New Account or
    </p>
    <p className={props.exist ? 'login-method active' : 'login-method'}>
      Connect to an Existing Account
    </p>
  </div>
);

IdentityExistingIndicator.propTypes = {
  exist: PropTypes.bool
};

export default IdentityExistingIndicator;
