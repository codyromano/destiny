let AppDispatcher = require('../dispatcher/AppDispatcher');
let DestinyConstants = require('../constants/DestinyConstants');
let EventEmitter = require('events').EventEmitter;

let geo = {
  userCoords: null
};

let GeoStore = Object.assign({}, EventEmitter.prototype, {
});


AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case DestinyConstants.GEOLOCATION_GET:
      console.log('gelocationget called');
    break;
  }
});

module.exports = GeoStore;