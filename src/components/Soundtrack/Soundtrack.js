import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Soundtrack.css';

class Soundtrack extends Component {
  constructor() {
    super();
    this.state = {
      playing: false
    };
  }

  // TODO: Move logic to store
  saveSetting(shouldPlay, audioSrc) {
    if (typeof shouldPlay === 'boolean') {
      localStorage.setItem('shouldPlay-' + audioSrc, shouldPlay);
    }
  }

  getSavedSetting(audioSrc) {
    let saved = localStorage.getItem('shouldPlay-' + audioSrc);
    return (saved === 'true') ? true : false;
  }

  enterPlayState() {
    this.refs.audioFile.play();
    this.setState({playing: true});
    this.saveSetting(true, this.props.audioSrc);
  }

  enterStopState() {
    this.refs.audioFile.pause();
    this.setState({playing: false});
    this.saveSetting(false, this.props.audioSrc);
  }

  render() {
    let {playing} = this.state;
    let shouldPlay = this.getSavedSetting(this.props.audioSrc);

    let buttonAction = (playing && shouldPlay) ? this.enterStopState : this.enterPlayState;
    let buttonText = (playing && shouldPlay) ? 'Mute Soundtrack' : 'Play Soundtrack';

    return (
      <div className={s.audioWrapper}>
        <audio ref="audioFile"
        onPlay={this.enterPlayState.bind(this)}
        src={this.props.audioSrc} autoPlay={shouldPlay}
        loop repeat="true"/>

        <button className={s.soundtrackButton}
        onClick={buttonAction.bind(this)}>{buttonText}</button>
      </div>
    );
  }
}

export default withStyles(s)(Soundtrack);