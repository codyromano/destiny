import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Objective.css';
import Ghost from '../../components/Ghost';

class Objective extends Component {
  render() {
    let {mainText, subText, active} = this.props;

    return (<div ref="wrapper" className={s.objective}>
      <Ghost active={active}/>
      <h2 className={s.mainText}>{mainText}</h2>
      <p className={s.subText}>{subText}</p>
    </div>);
  }
}

export default withStyles(s)(Objective);