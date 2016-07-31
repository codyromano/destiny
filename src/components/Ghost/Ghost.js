import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ghost.css';

const THUMB_SRC = '/images/ghost-thumb.jpg';
const ANIMATION_SRC = '/images/ghost.gif';


class Ghost extends Component {
  render() {
    let imageSrc = this.props.active ? ANIMATION_SRC : THUMB_SRC;
    let imageClass = this.props.active ? s.ghostActive : s.ghost;
    return (
      <img ref="ghost" className={imageClass} src={imageSrc}/>
    );
  }
}

export default withStyles(s)(Ghost);