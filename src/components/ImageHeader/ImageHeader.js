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

    return (<div>
      <div className={s.imageBackground} style={imageStyle}>
        <a href={backLinkHref} className={s.backLink}>{backLinkText}</a>
        <h1 className={s.primaryHeader}>{title}</h1>
      </div>
    </div>);
  }
}

export default withStyles(s)(ImageHeader);