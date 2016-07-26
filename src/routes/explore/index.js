import React from 'react';
import Explore from './Explore';

export default {
  path: '/explore/:planetName',
  action(context) {
    return <Explore planetName={context.params.planetName}/>;
  }
};
