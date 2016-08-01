import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Explore.css';
import ImageHeader from '../../components/ImageHeader';
import Objective from '../../components/Objective';

const title = 'Explore';

function getCurrentObjective(objectives) {
  let current, next;

  for (let i=0, l=objectives.length; i<l; i++) {
    current = objectives[i];
    next = objectives[i + 1];
    
    if (!current.completed) {
      return current;
    } else if (next && !next.completed) {
      return next;
    }
  }
  return null;
}

function Explore(props, context) {
  context.setTitle(title);

  let backLinkHref = `/orbit/`,
      backLinkText = `Back to Orbit`;

  let currentObj = getCurrentObjective(props.objectives);

  let objectives = props.objectives.map((obj, i, array) => {
    let isActive = false;
    if (currentObj !== null) {
      isActive = (obj.id === currentObj.id);
    }

    return <Objective
      mainText={obj.mainText}
      subText={obj.subText}
      active={isActive}
      trackCoords={obj.trackCoords}
      key={i}
    />
  });
  
  return (
    <div className={s.root}>
      <div className={s.container}>
        <ImageHeader backLinkHref={backLinkHref} backLinkText={backLinkText} imageSrc={props.headerImageSrc} title={props.planetName}/>
        {objectives}
      </div>
    </div>
  );
}

Explore.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Explore);
