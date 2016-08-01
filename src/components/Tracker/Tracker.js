import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tracker.css';
import DestinyStore from '../../stores/DestinyStore';

class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      milesAway: null,
      direction: ''
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.trackCoords && newProps.userCoords) {
      let userPos = newProps.userCoords;
      let userCoords = [userPos.latitude, userPos.longitude];

      let dist = DestinyStore.getDist(
        userCoords,
        this.props.trackCoords
      ).toFixed(2);

      let direction = DestinyStore.getDirection(
        userCoords,
        this.props.trackCoords
      );

      this.setState({
        milesAway: dist,
        direction: direction
      });
    }
  }
  render() {
    let {milesAway, direction} = this.state;
    let content = (<div></div>);

    if (milesAway !== null && this.props.tracking) {
      content = (<div className={s.tracker}>
        <strong className={s.milesAway}>{milesAway}mi</strong><span className={s.direction}>{direction}</span></div>);
    }
    return content;
  }
}

export default withStyles(s)(Tracker);