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
//import CutScene from '../../components/CutScene';

const title = 'Orbit';

function Orbit(props, context) {
  context.setTitle(title);
  
  /* TODO: Data should come from a proper store */
  let planets = [
    {
      name: 'Cosmodrome',
      imageSrc: '/images/scorched_earth.png',
      discovered: true,
      width: 75
    },
    {
      name: 'Mars',
      imageSrc: '/images/NaturePatterns05.jpg',
      discovered: false,
      width: 60
    },
    {
      name: 'Saturn',
      imageSrc: '/images/NaturePatterns06.jpg',
      discovered: false,
      width: 95
    }
  ].map((planet) => {
    return (<Planet name={planet.name} 
      imageSrc={planet.imageSrc}
      width={planet.width}
      discovered={planet.discovered}/>);
  });


  return (
    <div className={s.root}>
      <div>
        <h1>{title}</h1>
        {planets}
        <p>...</p>
      </div>
    </div>
  );
}

Orbit.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Orbit);
