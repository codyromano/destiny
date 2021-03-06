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
    mainText: 'Go get coffee',
    subText: `You'll need energy for today's adventure`,
    planet: 'Earth',
    completed: false,
    trackCoords: [47.639648, -122.326103]
  },
  {
    id: 'Earth-2',
    mainText: `Find s'mores stuff`,
    subText: `Get items from Pete's Market`,
    planet: 'Earth',
    completed: false,
    trackCoords: [47.639937, -122.329336]
  },
  {
    id: 'Mars-1',
    mainText: 'Equip weekend gear',
    subText: `Pack a bag, then drive toward Bellevue`,
    planet: 'Mars',
    completed: false,
    trackCoords: [47.638697, -122.241656]
  },
  {
    id: 'Mars-2',
    mainText: 'Find wine in Woodenville',
    subText: 'Visit the Columbia Winery',
    planet: 'Mars',
    completed: false,
    trackCoords: [47.734268,-122.152549]
  },
  {
    id: 'Venus-1',
    mainText: `Go to Leavenworth`,
    subText: 'Navigate to the center of town',
    planet: 'Venus',
    completed: false,
    trackCoords: [47.595447, -120.660692]
  },
  {
    id: 'Venus-2',
    mainText: `Find Run of the River`,
    subText: 'Check in at the B&B',
    planet: 'Venus',
    completed: false,
    trackCoords: [47.585451, -120.662003]
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

function decreaseGlimmer(amount) {
  glimmer = Math.max(0, glimmer - amount);
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

function getThreshold() {
  // return localStore.get('threshold') || 0.05;
  let threshold = localStore.get('threshold');
  if (threshold === null || isNaN(threshold)) {
    return 0.05;
  }
  return parseFloat(threshold);
}

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

  getDistThreshold: function() {
    return getThreshold();
  },

  getDist: function(coordsA, coordsB) {
    return haversine(coordsA, coordsB);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  updateThreshold: function(value) {
    localStore.save('threshold', value);
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

function toggleCheat(objectiveId, setting) {
  let objectiveIndex;

  for (let i=0, l=objectives.length; i<l; i++) {
    if (objectives[i].id === objectiveId) {
      objectiveIndex = i;
      break;
    }
  }

  if (objectiveIndex === undefined) {
    throw new Error(`Cannot toggle cheat. Unknown
      planet name: ${name}`);
  }
  if (typeof setting !== 'boolean') {
    throw new Error(`Invalid cheat setting: ${setting}.
      The setting must be a boolean.`);
  }

  objectives[objectiveIndex].completed = setting;
  localStore.save('objectives', objectives);

  DestinyStore.emitChange();
}

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
    if (next) {
      planets[index + 1].discovered = isComplete;
    }

    /*
    if (isComplete && next) {
      planets[index + 1].discovered = true;
    }
    */
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

function undoCheckIn(objectiveId) {
  for (let objective of objectives) {
    if (objective.id === objectiveId && objective.completed === true) {
      objective.completed = false;
      decreaseGlimmer(GLIMMER_EARNED_PER_OBJECTIVE);
      break;
    }
  }

  localStore.save('objectives', objectives);
  updatePlanets();
  DestinyStore.emitChange();
}

function onGeolocationError(positionError) {
  geo.status = GEOLOCATION_ERROR;
  geo.positionErrorCode = positionError.code;

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
    case DestinyConstants.OBJECTIVE_UNDO_CHECKIN:
      undoCheckIn(action.objectiveId);
    break;
    case DestinyConstants.CHEAT_TOGGLE:
      toggleCheat(action.cheatName, action.setting);
    break;
    default:
      console.warn(`Unrecognized action: ${action.actionType}`);
    break;
  }
});

module.exports = DestinyStore;
