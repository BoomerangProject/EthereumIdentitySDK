import React from 'react';
import Collapsible from '../components/Collapsible';
import PropTypes from 'prop-types';

const DeregisterAccordionView = props => (
  <Collapsible
    title="Deregister Device"
    subtitle="Deregister your account from this device"
  >
    <p className="advice-text">
      By clicking this button you will deregister this device from your account. To use this device again you will need to verify it again.
    </p>
    <button onClick={() => props.deregister()} className="btn fullwidth">
      Deregister
    </button>
  </Collapsible>
);

DeregisterAccordionView.propTypes = {
  setView: PropTypes.func
};

export default DeregisterAccordionView;