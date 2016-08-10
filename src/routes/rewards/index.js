import React from 'react';
import Rewards from './Rewards';

export default {

  path: '/rewards/:planetName',

  action(context) {
    return <Rewards planetName={context.params.planetName} />;
  },

};
