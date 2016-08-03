import React from 'react';
import Explore from './Explore';
import DestinyStore from '../../stores/DestinyStore';

export default {
  path: '/explore/:planetName',
  action(context) {
    let planetName = context.params.planetName;
    let planet = DestinyStore.getPlanets(planetName);

      // TODO: Get objectives from store
      let objectives = [
        {
          id: 'Earth-1',
          mainText: 'Go to the spa',
          subText: 'Visit the spa with Amanda and Malissa.',
          planet: 'Earth',
          completed: false,
          trackCoords: [47.617326, -122.330787]
        },
        {
          id: 'Earth-2',
          mainText: 'Go to the movies',
          subText: 'Visit the movies with blah blah',
          planet: 'Earth',
          completed: false,
          trackCoords: [47.617326, -122.330787]
        },
        {
          id: 'Earth-3',
          mainText: 'Go to the spa',
          subText: 'Visit the spa with Amanda and Malissa.',
          planet: 'Earth',
          completed: false,
          trackCoords: [47.617326, -122.330787]
        }
      ];

      let planetObjectives = objectives.filter((obj) => {
        return obj.planet === context.params.planetName;
      });
      //console.log(context.params.planetName);

    return <Explore headerImageSrc={planet.headerImageSrc} objectives={planetObjectives} planetName={context.params.planetName}/>;
  }
};
