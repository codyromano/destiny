import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Explore.css';

const title = 'Explore';

function Explore(props, context) {
  context.setTitle(title);
  console.log(props);
  
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{props.planetName}</h1>
        <p>...</p>
      </div>
    </div>
  );
}

Explore.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Explore);
