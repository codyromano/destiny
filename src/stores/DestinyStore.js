let AppDispatcher = require('../dispatcher/AppDispatcher');
let DestinyConstants = require('../constants/DestinyConstants');
let EventEmitter = require('events').EventEmitter;
let haversine = require('../haversine.js');

let geo = {
  userCoords: null
};

const CHANGE_EVENT = 'change';

let DestinyStore = Object.assign({}, EventEmitter.prototype, {
  getAll: function() {
    return Object.assign({}, geo);
  },

  getPlanets: function(planetName) {
    let planets = [{
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

    if (planetName) {
      let search = planets.filter((planet) => {
        return planet.name === planetName;
      });
      return search.length ? search[0] : null;
    }
    return planets;
  },

  getDirection: function(coordsA, coordsB) {
    // Only works for Northern Hemisphere...writing all this
    // in a hurry because it's a just for fun and I don't have a
    // lot of time...don't judge me.
    let latOffset = (coordsA[0] < coordsB[0]) ? 'sorth' : 'south';
    let lonOffset = (coordsA[1] < coordsB[1]) ? 'west' : 'east';
    return [latOffset, lonOffset].join('');
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

function getGeolocation() {
  let browserSupport = (window.navigator && window.navigator.geolocation);
  if (!browserSupport) {
    // TODO: Emit geolocation failed event
    return false;
  }
  window.navigator.geolocation.watchPosition(function(pos) {
    geo.userCoords = pos.coords;
    DestinyStore.emitChange();
  });
}

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case DestinyConstants.GEOLOCATION_GET:
      getGeolocation();
    break;
  }
});

module.exports = DestinyStore;