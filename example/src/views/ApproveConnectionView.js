import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ApproveConnectionView extends Component {
  render() { 
    return ( 
      <div className="login-view">
        <div className="container">
          <h1 className="main-title">Awaiting Verification...</h1>
          <h1 className="secondary-title">{this.props.email}</h1>
          <p className='login-method active'>
            Open a device that controls this account
          </p>
          <p className='login-method'>
            or
          </p>
          <p className='login-method active'>
            Click the link sent in your email
          </p>
          <button className="btn fullwidth cancel-btn" onClick={this.props.onCancelClick.bind(this)}>Cancel request</button>
        </div>
      </div>
    );
  }
}
 
ApproveConnectionView.propTypes = {
  identity: PropTypes.object,
  onCancelClick: PropTypes.func
};

export default ApproveConnectionView;