import React from 'react';
import Collapsible from '../components/Collapsible';
import PropTypes from 'prop-types';

const OptOutAccordionView = props => (
  <Collapsible
    title="Opt Out"
    subtitle="Decentalize your account"
  >
    <p className="advice-text">
      If you want to have a completely decentralized and trustless account, you should opt out of Boomerang's login services. 
      Click below to learn more about the benefits and risks of opting out.
    </p>
    <button onClick={() => props.setView('Backup')} className="btn fullwidth">
      Learn More
    </button>
  </Collapsible>
);

OptOutAccordionView.propTypes = {
  setView: PropTypes.func
};

export default OptOutAccordionView;