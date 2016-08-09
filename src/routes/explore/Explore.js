import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Explore.css';
import ImageHeader from '../../components/ImageHeader';
import Objective from '../../components/Objective';
import DestinyStore from '../../stores/DestinyStore';

const title = 'Explore';

let backLinkHref = `/orbit/`,
    backLinkText = `Back to Orbit`;

class Explore extends Component {
  constructor(props, context) {
    super();
    this.props = props;
    this.context = context;
    this.state = {
      objectives: []
    };
  }

  componentDidMount() {
    DestinyStore.addChangeListener(() => this.onStoreChange());
  }

  checkCompletion() {
    let completed = this.state.objectives.filter((obj) => { return obj.completed});
    if (completed.length === this.props.objectives.length) {
      window.location.href = '/rewards/';
    }
  }

  onStoreChange() {
    this.setState({
      objectives: DestinyStore.getObjectives()
    });
    this.checkCompletion();
  }

  getCurrentObjective(objectives) {
    for (let i=0, l=objectives.length; i<l; i++) {
      let current = objectives[i],
          next = objectives[i + 1];

      if (!current.completed) {
        return current;
      } else if (next && !next.completed) {
        return next;
      }
    }
    return null;
  }

  getObjectives() {
    let objectives = this.props.objectives;

    return objectives.map((obj, i, array) => {
      let currentObj = this.getCurrentObjective(objectives);
      let isActive = false;
      if (currentObj !== null) {
        isActive = (obj.id === currentObj.id);
      }

      return <Objective
        id={obj.id}
        mainText={obj.mainText}
        subText={obj.subText}
        completed={obj.completed}
        active={isActive}
        trackCoords={obj.trackCoords}
        key={i}
      />
    });
  }

  render() {
    let props = this.props;
    let objectives = this.getObjectives();
    
    return (
      <div className={s.root}>
        <div className={s.container}>
          <ImageHeader backLinkHref={backLinkHref}
            backLinkText={backLinkText}
            imageSrc={props.headerImageSrc}
            title={props.planetName}/>
          <h2 className={s.objectivesHeading}>Objectives</h2>
          {objectives}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Explore);
