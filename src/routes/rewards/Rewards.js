import React, { Component, PropTypes } from 'react';
import CutScene from '../../components/CutScene';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rewards.css';
import history from '../../core/history';

const title = 'Destiny';

class Reward extends Component {
  constructor({ planetName }) {
    super();

    this.props = {
      planetName: 'Mars'
    };
    this.state = {
      countdown: 10
    };
  }

  componentDidMount() {
    let timeoutMs = 3000;

    if (!this.gameComplete()) {
      setTimeout(this.startCountdown.bind(this), timeoutMs);
    } else {
      setTimeout(this.fadeInHeader.bind(this), timeoutMs);
    }
  }

  fadeInHeader() {
    this.refs.planetHeadingWrapper.classList.add(s.visible);
  }

  startCountdown() {
    this.refs.countdownWrapper.classList.add(s.visible);
    this.fadeInHeader();

    let count = this.state.countdown;

    if (count > 0) {
      this.setState({
        countdown: count - 1
      });
      setTimeout(this.startCountdown.bind(this), 1000);
    } else {
      console.log('redirect to orbit');
      window.location.href = '/orbit';
    }
  }

  gameComplete() {
    return this.props.planetName === 'win';
  }

  render() {
    let {countdown} = this.state;
    let {planetName} = this.props;

    let itemTitle = this.gameComplete() ? '100% complete' : ('Unlocked ' + planetName);
    let uri = this.gameComplete() ? `/images/cody-cait.jpg` :
      `/images/${planetName}.png`;
      

    let backMessage = '';

    if (!this.gameComplete()) {
      backMessage = (<div className={s.continueWrapper} 
        ref="countdownWrapper">
        Back to orbit in <span className={s.countdown}
        ref="countdown">{countdown}</span>
      </div>);
    }

    let graphic = (<div className={s.unlockedWrapper}>
      <img src={uri} className={s.planet}/>
    </div>);

    /*
    if (this.gameComplete()) {
      graphic = (<div className={s.unlockedWrapper}>
        <div className={s.unlockCode}>???</div>
      </div>);
    }
    */

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.rewardsHeader}>
            <span>Activity</span>
            <span>Rewards</span>
          </h1>
        </div>
        <div className={s.continueWrapper} ref="planetHeadingWrapper">
          <h2>{itemTitle}</h2>
        </div>
        {graphic}

        {backMessage}
      </div>
    );
  }
}

export default withStyles(s)(Reward);
