import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageHeader.css';

class ImageHeader extends Component {
  render() {
    let {backLinkHref, backLinkText, title} = this.props;

    // TODO: Remove hardcoded test URL
    let imageSrc = `/images/Explore_Earth.jpg`;
    let imageStyle = {
      backgroundImage: `url(${imageSrc})`
    };

    return (<header>
      <div className={s.imageBackground} style={imageStyle}>
        <div className={s.topBar}>
          <a href={backLinkHref} className={s.backLink}>{backLinkText}</a>
          <div className={s.glimmer}>1000</div>
        </div>
        <h1 className={s.primaryHeader}>{title}</h1>
      </div>
    </header>);
  }
}

export default withStyles(s)(ImageHeader);