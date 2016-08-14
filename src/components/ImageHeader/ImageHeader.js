import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageHeader.css';
import DestinyStore from '../../stores/DestinyStore';

class ImageHeader extends Component {
  constructor() {
    super();
    this.state = {
      glimmer: DestinyStore.getGlimmer()
    };
  }

  componentDidMount() {
    DestinyStore.addChangeListener(() => this.onStoreChange());
  }

  onStoreChange() {
    this.state.glimmer = DestinyStore.getGlimmer();
  }

  render() {
    let {backLinkHref, backLinkText, title} = this.props;
    let {glimmer} = this.state;

    let imageSrc = this.props.imageSrc;
    let imageStyle = {
      backgroundImage: `url(${imageSrc})`
    };

    return (<header>
      <div className={s.imageBackground} style={imageStyle}>
        <div className={s.topBar}>

          <div className={s.primaryCol}>
            <a href={backLinkHref} className={s.backLink}>{backLinkText}</a>
            <div className={s.glimmer}>{glimmer}</div>
          </div>
        </div>

        <div className={s.primaryHeaderWrapper}>
          <div className={s.primaryCol}>
            <h1 className={s.primaryHeader}>{title}</h1>
          </div>
        </div>
      </div>
    </header>);
  }
}

export default withStyles(s)(ImageHeader);