import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CutScene.css';
 
// Not a great approach, but good enough for this
 var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

class CutScene extends Component {
  constructor() {
    super();
    this.state = {
      playRequiresTouch: false,
      playing: false
    };
  }

  componentDidMount() {
    let video = this.refs.cutSceneVideo;
    video.classList.add(s.playing);

    if (isMobile.any()) {
      this.addPlayOnTouchListener();
      this.setState({
        playRequiresTouch: true
      });
    }
  }

  addPlayOnTouchListener() {
    this.refs.cutSceneVideo.addEventListener('touchstart', (ev) => {
      this.play();
    });
  }

  skipScene() {
    window.location.href = this.props.nextUrl;
  }

  play() {
    let video = this.refs.cutSceneVideo;
    video.classList.add(s.playing);
    video.play();

    this.setState({
      playing: true
    });
  }

  ended() {
    let video = this.refs.cutSceneVideo;
    video.classList.remove(s.playing);

    let fade = parseInt(this.props.fadeOutSpeed) || 0;
    setTimeout(() => {
      window.location.href = this.props.nextUrl;
    }, fade);
  }

  isPlaying() {
    let video = this.refs.cutSceneVideo;
    return (video.paused === false);
  }
  
  render() {
    var src = '/videos/' + this.props.videoSrc;
    let touchText = '';

    if (this.state.playRequiresTouch && !this.state.playing) {
      touchText = (<div className={s.touchText}>Tap to play cutscene</div>);
    }

    return (<div ref="wrapper" className={s.cutSceneWrapper}>
      {touchText}
      <video 
        onEnded={this.ended.bind(this)} 
        autoPlay="true"
        onPlay={this.play.bind(this)} ref="cutSceneVideo" 
        src={src} className={s.cutSceneVideo}/>

        <div className={s.skipButtonWrapper}>
          <button onClick={this.skipScene.bind(this)}
          className={s.skipButton}>Skip Cutscene</button>
        </div>
    </div>);
  }
}

export default withStyles(s)(CutScene);