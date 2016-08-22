import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tracker.css';
import DestinyStore from '../../stores/DestinyStore';
import DestinyActions from '../../actions/DestinyActions';

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
        this.props.trackCoords,
        userCoords
      );

      this.setState({
        milesAway: dist,
        direction: direction
      });
    }
  }
  checkIn() {
    DestinyActions.checkIn(this.props.objectiveId);
  }
  render() {
    let {milesAway, direction} = this.state;
    let content = (<div></div>);
    let isNumber = (n) => !isNaN(parseInt(n));

    if (this.props.tracking && isNumber(milesAway) && milesAway 
      <= DestinyStore.getDistThreshold()) {
      content = (<button onClick={this.checkIn.bind(this)} className={s.checkIn}>Check In</button>);

    } else if (milesAway !== null && this.props.tracking) {
      content = (<div className={s.tracker}>
        <strong className={s.milesAway}>{milesAway}mi</strong><span className={s.direction}>{direction}</span></div>);
    }
    return content;
  }
}

export default withStyles(s)(Tracker);