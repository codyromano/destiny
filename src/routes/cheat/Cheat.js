import React, { Component, PropTypes } from 'react';
import CutScene from '../../components/CutScene';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './cheat.css';

import DestinyStore from '../../stores/DestinyStore';
import DestinyActions from '../../actions/DestinyActions';

const title = 'Destiny';

class Cheat extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      objectives: DestinyStore.getObjectives(),
      threshold: DestinyStore.getDistThreshold()
    };
  }

  componentDidMount() {
    DestinyStore.addChangeListener(() => this.onStoreChange());
  }

  onStoreChange() {
    this.setState({
      objectives: DestinyStore.getObjectives(),
      threshold: DestinyStore.getDistThreshold()
    });
  }

  toggleCheat(objectiveId) {
    let isChecked = this.refs[objectiveId].checked;

    if (isChecked) {
      DestinyActions.checkIn(objectiveId);
    } else {
      DestinyActions.undoCheckIn(objectiveId);
    }
  }

  updateDist() {
    let newThreshold = this.refs.threshold.value;
    if (!isNaN(newThreshold) && newThreshold >= 0) {
      DestinyStore.updateThreshold(newThreshold);
    }
  }

  render() {
    let prevHeading;
    let objectives = this.state.objectives.map((obj, i) => {
      let isNewHeading = (prevHeading !== obj.planet);
      let heading = isNewHeading ? (<h3>{obj.planet}</h3>) : '';
      prevHeading = obj.planet;
      let callback = this.toggleCheat.bind(this, obj.id);

      return (
        <div key={i}>
          {heading}
          <fieldset>
            <input type="checkbox" checked={obj.completed}
            id={obj.id} name={obj.id} onClick={callback} ref={obj.id}/>
            <label className={s.cheatName} htmlFor={obj.id}>{obj.mainText}</label>
          </fieldset>
        </div>
      );
    });

    let threshold = this.state.threshold;

    return (
      <div className={s.root}>
        <a href="/orbit">&lt; Back to Orbit</a>
        <hr/>
        <h1>Cheats</h1>
        <h2>Geolocation</h2>
        <fieldset>
          <label className={s.col5}>Distance threshold</label>
          <input ref="threshold" onChange={this.updateDist.bind(this)}
          type="number" className={s.threshold} defaultValue={threshold}/>
        </fieldset>
        <h2>Unlock Objectives</h2>
        {objectives}
      </div>
    );
  }
}

export default withStyles(s)(Cheat);
