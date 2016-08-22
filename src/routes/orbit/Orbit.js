/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Orbit.css';
import Planet from '../../components/Planet';
import DestinyStore from '../../stores/DestinyStore';

const title = 'Orbit';

function Orbit(props, context) {
  context.setTitle(title);
  
  let planets = DestinyStore.getPlanets().map((planet) => {
    return (<Planet key={planet.name} name={planet.name} 
      imageSrc={planet.imageSrc}
      width={planet.width}
      discovered={planet.discovered}/>);
  });

  return (
    <div className={s.orbitRoot}>
      <div className={s.planetsWrapper}>
        {planets}
      </div>
    </div>
  );
}

Orbit.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Orbit);
