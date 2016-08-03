import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CutScene.css';

class CutScene extends Component {
  componentDidMount() {
    let video = this.refs.cutSceneVideo;
    video.classList.add(s.playing);
  }

  play() {
    let video = this.refs.cutSceneVideo;

    video.classList.add(s.playing);
    video.play();
  }

  ended() {
    let video = this.refs.cutSceneVideo;
    video.classList.remove(s.playing);

    let fade = parseInt(this.props.fadeOutSpeed) || 0;
    setTimeout(() => {
      window.location.href = this.props.nextUrl;
    }, fade);
  }
  
  render() {
    var src = '/videos/' + this.props.videoSrc;

    return (<div ref="wrapper" className={s.cutSceneWrapper}>
      <video onEnded={this.ended.bind(this)} 
        autoPlay="true"
        onPlay={this.play.bind(this)} ref="cutSceneVideo" 
        src={src} className={s.cutSceneVideo}/>
    </div>);
  }
}

export default withStyles(s)(CutScene);