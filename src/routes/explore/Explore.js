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
      planets: [],
      objectives: [],
      geo: {
        status: 'not_requested'
      }
    };
  }

  componentDidMount() {
    DestinyStore.addChangeListener(() => this.onStoreChange());
  }

  getNextPlanet(planetName) {
    let result = null;

    this.state.planets.forEach((planet, i, planets) => {
      let next = planets[i + 1];
      if (planet.name === planetName && next) {
        result = next;
      }
    });

    return result;
  }

  checkCompletion() {
    let completed = this.props.objectives.filter((obj) => { 
      return obj.completed;
    });
    if (completed.length !== this.props.objectives.length) {
      return;
    }

    let next = this.getNextPlanet(this.props.planetName);
    if (next) {
      window.location.href = '/rewards/' + next.name;
    } else {
      window.location.href = '/rewards/win';
    }
  }

  onStoreChange() {
    this.setState({
      planets: DestinyStore.getPlanets(),
      objectives: DestinyStore.getObjectives(),
      geo: DestinyStore.getAll()
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

    let geolocationError;
    if (this.state.geo.status === 'error') {
      geolocationError = (<div className={s.geoError}>

      <strong>Please share your location</strong> Enable location sharing on your device so the game can guide you to objectives. Once you've enabled it, <a href="javascript:window.location.reload()">reload the page</a>.
      </div>);
    }
    
    return (
      <div className={s.root}>
        <div className={s.container}>
          <ImageHeader backLinkHref={backLinkHref}
            backLinkText={backLinkText}
            imageSrc={props.headerImageSrc}
            title={props.planetName}/>
          <h2 className={s.objectivesHeading}>Objectives</h2>
          {geolocationError}
          {objectives}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Explore);
