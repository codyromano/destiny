import React from 'react';
import Explore from './Explore';

export default {
  path: '/explore/:planetName',
  action(context) {
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

    return <Explore objectives={planetObjectives} planetName={context.params.planetName}/>;
  }
};
