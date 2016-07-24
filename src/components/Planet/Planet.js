import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Planet.css';

class Planet extends Component {
  render() {
    let {name, imageSrc, width, discovered} = this.props;
    width = width || 100;

    let style = {
      width: (width || 100) + '%'
    };

    let classList = [s.planetImage];

    return (<div ref="wrapper" className={s.PlanetWrapper}>
      <div className={s.planet}>
        <h2 className={s.planetHeading}>{name}</h2>
        <img src={imageSrc} className={classList} style={style}/>
      </div>
    </div>);
  }
}

export default withStyles(s)(Planet);