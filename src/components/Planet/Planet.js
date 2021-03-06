import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Planet.css';
import DestinyStore from '../../stores/DestinyStore';
import history from '../../core/history';

/* TODO: This belongs in a more general utility file */
function preloadImage(img, preloadClass) {
  // Mark image as preloading
  img.classList.add(preloadClass);

  let testImage = document.createElement('img');
  testImage.addEventListener('load', () => {
    // Remove preload indicator
    img.classList.remove(preloadClass);
  }, false);

  testImage.src = img.src;
}

class Planet extends Component {
  componentDidMount() {
    let planetImage = this.refs.planetImage;
    preloadImage(planetImage, s.preload);

    this.refs.wrapper.addEventListener('click', (ev) => {
      let target = ev.target;
      if (target.classList.contains(s.planet)) {
      }
    }, true);
  }
  visitPlanet() {
    let explorePlanetURI = ['/travel/', this.props.name,
      '/'].join('');
    history.push({ pathname: explorePlanetURI});
  }

  teasePlanet() {
    this.refs.lockedModal.classList.add(s.showing);
  }

  render() {
    let {name, imageSrc, width, discovered} = this.props;
    name = discovered ? name : (<img src="/images/padlock.png" className={s.lockedIcon}/>);

    let style = {
      width: (width || 100) + '%'
    };
    let classList = [discovered ? s.planetImageDiscovered :
       s.planetImage];

    let planetAction = (discovered ? this.visitPlanet :
      this.teasePlanet).bind(this);

    let lockedModal;

    if (!discovered) {
      let extraNeeded = DestinyStore.getGlimmerNeeded(this.props.name);

      lockedModal = (<div ref="lockedModal" className={s.lockedModal}>
        Earn <span className={s.glimmerText}>{extraNeeded}</span> more glimmer to
        unlock this planet
      </div>);
    }

    return (<div ref="wrapper" className={s.planetMainWrapper}>
      <div className={s.planet} onClick={planetAction}>
        <h2 className={s.planetHeading}>{name}</h2>
        <img ref="planetImage" src={imageSrc} className={classList} style={style}/>
        {lockedModal}
      </div>
    </div>);
  }
}

export default withStyles(s)(Planet);