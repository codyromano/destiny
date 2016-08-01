import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Objective.css';

import Ghost from '../../components/Ghost';
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
    if (enableGPSButton) {
      enableGPSButton.addEventListener('click', () => {
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
    let {mainText, subText, active} = this.props;
    let objClass = active ? s.objectiveActive : s.objective;

    // TODO: Make tracker a standalone component
    let loc = this.state.userCoords, text, tracker;
    if (loc) {
      text = `Location: ${loc.latitude.toFixed(2)},
        ${loc.longitude.toFixed(2)}`;
      tracker = (<span>{text}</span>);
    } else {
      tracker = (<button ref="enableGPS">Track Objective</button>)
    }

    return (<div ref="wrapper" className={objClass}>
      <Ghost active={active}/>
      <h2 className={s.mainText}>{mainText}</h2>
      <p className={s.subText}>{subText}</p>
      {tracker}
    </div>);
  }
}

export default withStyles(s)(Objective);