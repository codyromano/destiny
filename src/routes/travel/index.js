import React from 'react';
import Travel from './Travel';

export default {

  path: '/travel/:planetName',

  action(context) {
    return <Travel planetName={context.params.planetName} />;
  },

};
