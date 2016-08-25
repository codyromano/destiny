import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Objective.css';

import Ghost from '../../components/Ghost';
import Tracker from '../../components/Tracker';

import DestinyActions from '../../actions/DestinyActions';
import DestinyStore from '../../stores/DestinyStore';

class Objective extends Component {

  constructor() {
    super();
    this.state = DestinyStore.getAll();
  }

  componentDidMount() {
    DestinyStore.addChangeListener(() => this.onStoreChange());

    let enableGPSButton = this.refs.enableGPS;
    let enableGPSWrapper = this.refs.enableGPSWrapper;

    if (enableGPSButton) {
      enableGPSWrapper.addEventListener('click', (ev) => {
        enableGPSWrapper.classList.add(s.geolocating);
        enableGPSButton.innerHTML = '';
        DestinyActions.getGeolocation();
      }, false);
    }
  }

  componentWillUnmount() {
    // Remove addChangeListener
  }

  onStoreChange() {
    this.setState(DestinyStore.getAll());
  }

  render() {
    let _this = this;
    let {id, mainText, subText, active, completed} = this.props;
    let objClass = active ? s.objectiveActive : s.objective;

    // TODO: Make enable GPS button a standalone component
    let loc = this.state.userCoords, text, enableGPSButton;
    if (!loc && active) {
      enableGPSButton = (<div ref="enableGPSWrapper" className={s.enableGPSWrapper}>
        <button id="enableGPS" ref="enableGPS">Track</button>
      </div>);
    }

    if (completed) {
      mainText = 'Completed';
    } else if (!active) {
      mainText = 'Locked';
      subText = `Complete previous objectives first`;
    }

    return (<div ref="wrapper" className={objClass}>
      <div className={s.objectiveInnerWrapper}>
        <div className={s.objectiveElement}>
          <Ghost active={active}/>
        </div>

        <div className={s.objectiveElement}>
          <h2 className={s.mainText}>{mainText}</h2>
          <p className={s.subText}>{subText}</p>
        </div>

        <div className={s.objectiveElement}>
          {enableGPSButton}
          <Tracker objectiveId={id} 
            tracking={active}
            trackCoords={this.props.trackCoords}
            userCoords={this.state.userCoords}/>
        </div>
      </div>
    </div>);
  }
}

export default withStyles(s)(Objective);