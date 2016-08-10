import React from 'react';
import Explore from './Explore';
import DestinyStore from '../../stores/DestinyStore';

export default {
  path: '/explore/:planetName',
  action(context) {
    let planetName = context.params.planetName;
    let planet = DestinyStore.getPlanets(planetName);
    let objectives = DestinyStore.getObjectives();

      let planetObjectives = objectives.filter((obj) => {
        return obj.planet === context.params.planetName;
      });

    return <Explore headerImageSrc={planet.headerImageSrc} objectives={planetObjectives} planetName={context.params.planetName}/>;
  }
};
