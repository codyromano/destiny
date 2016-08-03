import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Planet.css';

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


  }
  render() {
    let {name, imageSrc, width, discovered} = this.props;
    let style = {
      width: (width || 100) + '%'
    };
    let classList = [discovered ? s.planetImageDiscovered :
       s.planetImage];
    let explorePlanetURI = ['/travel/', name, '/'].join('');

    return (<div ref="wrapper" className={s.planetMainWrapper}>
      <a href={explorePlanetURI}>
        <div className={s.planet}>
          <h2 className={s.planetHeading}>{name}</h2>
          <img ref="planetImage" src={imageSrc} className={classList} style={style}/>
        </div>
      </a>
    </div>);
  }
}

export default withStyles(s)(Planet);