let AppDispatcher = require('../dispatcher/AppDispatcher');
let DestinyConstants = require('../constants/DestinyConstants');
let EventEmitter = require('events').EventEmitter;
let haversine = require('../haversine.js');

// TODO: Use consistent import pattern
import LocalStore from '../localStore';

let localStore = new LocalStore('destiny');

let glimmer = getStoredGlimmer() || 0;

const GLIMMER_EARNED_PER_OBJECTIVE = 150;
const CHANGE_EVENT = 'change';

const GEOLOCATION_ERROR = 'error';
const GEOLOCATION_ACQUIRED = 'ok';
const GEOLOCATION_NOT_REQUESTED = 'not_requested';

let geo = {
  userCoords: null,
  status: GEOLOCATION_NOT_REQUESTED
};

let objectives = getStoredObjectives() || [
  {
    id: 'Earth-1',
    mainText: 'Go to the spa',
    subText: 'Visit the spa with Amanda and Malissa.',
    planet: 'Earth',
    completed: false,
    trackCoords: [47.617326, -122.330787]
  },
  {
    id: 'Earth-2',
    mainText: 'Go to the movies',
    subText: 'Visit the movies with blah blah',
    planet: 'Earth',
    completed: false,
    trackCoords: [47.617326, -122.330787]
  },
  {
    id: 'Earth-3',
    mainText: 'Go to the spa',
    subText: 'Visit the spa with Amanda and Malissa.',
    planet: 'Earth',
    completed: false,
    trackCoords: [47.617326, -122.330787]
  },
  {
    id: 'Mars-1',
    mainText: 'Go to the spa',
    subText: 'Visit the spa with Amanda and Malissa.',
    planet: 'Mars',
    completed: false,
    trackCoords: [47.617326, -122.330787]
  },
  {
    id: 'Venus-1',
    mainText: 'Go to the spa',
    subText: 'Visit the spa with Amanda and Malissa.',
    planet: 'Venus',
    completed: false,
    trackCoords: [47.617326, -122.330787]
  }
];

// Find how much additional glimmer the player needs to unlock a planet
function getGlimmerNeeded(planetName) {
  let glimmerNeeded = 0;

  for (let i=0, l=objectives.length; i<l; i++) {
    // We don't need to consider objectives associated with the target
    // planet itself or the planets that follow it
    if (objectives[i].planet === planetName) {
      break;
    }
    if (!objectives[i].completed) {
      glimmerNeeded+= GLIMMER_EARNED_PER_OBJECTIVE;
    }
  }

  console.log(`${glimmerNeeded} needed for ${planetName}`);

  return glimmerNeeded;
}

var planets = getStoredPlanets() || [{
  name: 'Earth',
  imageSrc: '/images/Earth.png',
  headerImageSrc: '/images/Explore_Earth.jpg',
  discovered: true,
  width: 100
},
{
  name: 'Mars',
  imageSrc: '/images/Mars.png',
  headerImageSrc: '/images/Explore_Mars.jpg',
  discovered: false,
  width: 100
},
{
  name: 'Venus',
  imageSrc: '/images/Venus.png',
  headerImageSrc: '/images/Explore_Venus.jpg',
  discovered: false,
  width: 100
}];

function getStoredObjectives() {
  let stored = localStore.get('objectives');

  if (stored === null) {
    return null;
  }

  stored = stored.map((obj) => {
    // Convert string to boolean
    obj.completed = !!obj.completed;
    obj.trackCoords = obj.trackCoords.map(parseFloat);
    return obj;
  });

  return stored;
}

function getStoredGlimmer() {
  let stored = localStore.get('glimmer');
  if (stored === null) {
    return 0;
  }
  return parseFloat(stored);
}

function increaseGlimmer(amount) {
  glimmer+= amount;
  localStore.save('glimmer', glimmer);
}

function getStoredPlanets() {
  let stored = localStore.get('planets');
  if (stored === null) {
    return null;
  }
  stored = stored.map((planet) => {
    planet.discovered = !!planet.discovered;
    planet.width = parseFloat(planet.width);
    return planet;
  });
  return stored;
}

getStoredObjectives();

let DestinyStore = Object.assign({}, EventEmitter.prototype, {
  getAll: function() {
    return Object.assign({}, geo);
  },

  getGlimmer: function() {
    return glimmer;
  },

  getGlimmerNeeded: getGlimmerNeeded,

  getPlanets: function(planetName) {
    if (planetName) {
      let search = planets.filter((planet) => {
        return planet.name === planetName;
      });
      return search.length ? search[0] : null;
    }
    return planets;
  },

  getObjectives: function() {
    return objectives;
  },

  getDirection: function(coordsA, coordsB) {
    let latDescriptor = '',
        lonDescriptor = '';

    let latDiff = coordsA[0] - coordsB[0];
    if (latDiff > 0) {
      latDescriptor = 'east';
    } else if (latDiff < 0) {
      latDescriptor = 'west';
    }

    let lonDiff = coordsA[0] - coordsB[0];
    if (lonDiff > 0) {
      lonDescriptor = 'north';
    } else if (lonDiff < 0) {
      lonDescriptor = 'south';
    }

    if (!latDescriptor.length && !lonDescriptor.length) {
      return 'here';
    }

    // Only works for Northern Hemisphere...writing all this
    // in a hurry because it's a just for fun and I don't have a
    // lot of time...don't judge me.
    return [lonDescriptor, latDescriptor].join('');
  },

  getDist: function(coordsA, coordsB) {
    return haversine(coordsA, coordsB);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

function planetComplete(planetName, objectives) {
  objectives = objectives.filter((obj) => obj.planetName === planetName);
  let completed = objectives.filter((obj) => obj.completed);

  return objectives.length === completed.length;
}

function updatePlanets() {
  // Planet name => completion status
  let planetsCompletionMap = planets.reduce((map, planet) => {
    map[planet.name] = true;
    return map;
  }, {});

  /* If any of the objectives associated with a planet are
  incomplete, the following planet should not be available. */ 
  objectives.forEach((obj) => {
    if (!obj.completed) {
      planetsCompletionMap[obj.planet] = false;
    }
  });

  planets = planets.map((p, index) => {
    let next = planets[index + 1];
    let isComplete = planetsCompletionMap[p.name];

    /* If all the objectives for this planet are complete and a next
    planet exists, mark the next one as discovered. */
    if (isComplete && next) {
      planets[index + 1].discovered = true;
    }
    return p;
  });

  localStore.save('planets', planets);
  return planets;
}

function checkIn(objectiveId) {
  for (let objective of objectives) {
    if (objective.id === objectiveId) {
      objective.completed = true;
      increaseGlimmer(GLIMMER_EARNED_PER_OBJECTIVE);
      break;
    }
  }

  localStore.save('objectives', objectives);
  updatePlanets();
  DestinyStore.emitChange();
}

function onGeolocationError() {
  geo.status = GEOLOCATION_ERROR;
  DestinyStore.emitChange();
}

function getGeolocation() {
  let browserSupport = (window.navigator && window.navigator.geolocation);
  if (!browserSupport) {
    // TODO: Emit geolocation failed event
    return false;
  }
  window.navigator.geolocation.watchPosition(function(pos) {
    geo.userCoords = pos.coords;
    geo.status = GEOLOCATION_ACQUIRED;
    DestinyStore.emitChange();
  }, onGeolocationError);
}

let spaceNeedle = [47.655899,-122.202289];
let univDistrict = [47.660755,-122.328289];
let bremerton = [47.558368,-122.643926];

console.assert(DestinyStore.getDirection(spaceNeedle, univDistrict) === 'southwest', 'The spaceNeedle is southwest of the U-district.');

console.assert(DestinyStore.getDirection(spaceNeedle, bremerton) === 'northeast', 'The spaceNeedle is northeast of bremerton.');

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case DestinyConstants.GEOLOCATION_GET:
      getGeolocation();
    break;
    case DestinyConstants.OBJECTIVE_CHECKIN:
      checkIn(action.objectiveId);
    break;
    default:
      console.warn(`Unrecognized action: ${action.actionType}`);
    break;
  }
});

module.exports = DestinyStore;