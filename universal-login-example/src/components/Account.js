import React, { Component } from 'react';
import HeaderView from '../views/HeaderView';
import BackToAppBtn from './BackToAppBtn';
import ProfileIdentity from './ProfileIdentity';
import ManageDevicesAccordion from './ManageDevicesAccordion';
import BackupCodeAccordionView from '../views/BackupCodeAccordionView';
import OptOutAccordionView from '../views/OptOutAccordionView';
import DeregisterAccordionView from '../views/DeregisterAccordionView';
import TrustedFriendsAccordionView from '../views/TrustedFriendsAccordionView';
import SettingsAccordion from './SettingsAccordion';
import PropTypes from 'prop-types';

class Account extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.identityService.emitter;
  }

  setView(view) {
    this.emitter.emit('setView', view);
  }

  deregister() {
    console.log("Deregistering device....")
    this.props.identityService.clearIdentity();
    window.location.reload();
  }

  render() {
    return (
      <div className="account">
        <HeaderView>
          <BackToAppBtn setView={this.setView.bind(this)} />
        </HeaderView>

        <div className="container">
          <ProfileIdentity
            type="identityAccount"
            identityService={this.props.identityService}/>
          <hr className="separator" />
          <ManageDevicesAccordion emitter={this.props.identityService.emitter} />
          <hr className="separator" />
          <OptOutAccordionView setView={this.setView.bind(this)} />
          <hr className="separator" />
          <DeregisterAccordionView deregister={this.deregister.bind(this)} />
          <hr className="separator" />
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  identityService: PropTypes.obj
};

export default Account;
