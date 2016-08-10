import React, { Component, PropTypes } from 'react';
import CutScene from '../../components/CutScene';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rewards.css';

const title = 'Destiny';

class Reward extends Component {
  constructor({ planetName }) {
    super();

    this.props = {
      planetName: 'Mars'
    };
    this.state = {
      countdown: 15
    };
  }

  componentDidMount() {
    setTimeout(this.startCountdown.bind(this), 3000);
  }

  startCountdown() {
    this.refs.countdownWrapper.classList.add(s.visible);
    this.refs.planetHeadingWrapper.classList.add(s.visible);

    let count = this.state.countdown;

    if (count > 0) {
      this.setState({
        countdown: count - 1
      });
      setTimeout(this.startCountdown.bind(this), 1000);
    } else {
     window.location.href = '/orbit';
    }
  }

  render() {
    let {countdown} = this.state;
    let {planetName} = this.props;
    let uri = `/images/${planetName}.png`;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.rewardsHeader}>
            <span>Activity</span>
            <span>Rewards</span>
          </h1>
        </div>
        <div className={s.continueWrapper} ref="planetHeadingWrapper">
          <h2>Unlocked {planetName}</h2>
        </div>
        <div className={s.unlockedWrapper}>
          <img src={uri} className={s.planet}/>
        </div>
        <div className={s.continueWrapper} ref="countdownWrapper">
          Back to orbit in <span className={s.countdown} ref="countdown">
            {countdown}
          </span>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Reward);
