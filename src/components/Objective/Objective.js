import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Objective.css';
import Ghost from '../../components/Ghost';
import DestinyActions from '../../actions/DestinyActions';

class Objective extends Component {
  render() {
    let {mainText, subText, active} = this.props;
    let objClass = active ? s.objectiveActive : s.objective;

    return (<div ref="wrapper" className={objClass}>
      <Ghost active={active}/>
      <h2 className={s.mainText}>{mainText}</h2>
      <p className={s.subText}>{subText}</p>
    </div>);
  }
}

export default withStyles(s)(Objective);