import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Orbit.css';
import Planet from '../../components/Planet';
import DestinyStore from '../../stores/DestinyStore';
import Soundtrack from '../../components/Soundtrack';

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
      <div className={s.soundtrackWrapper}>
        <Soundtrack audioSrc="/audio/orbit.mp3"/>
      </div>
      <div className={s.planetsWrapper}>
        {planets}
      </div>
    </div>
  );
}

Orbit.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Orbit);
