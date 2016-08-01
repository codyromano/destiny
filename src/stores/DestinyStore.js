let AppDispatcher = require('../dispatcher/AppDispatcher');
let DestinyConstants = require('../constants/DestinyConstants');
let EventEmitter = require('events').EventEmitter;

let geo = {
  userCoords: null
};

const CHANGE_EVENT = 'change';

let GeoStore = Object.assign({}, EventEmitter.prototype, {
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

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case DestinyConstants.GEOLOCATION_GET:
      console.log('gelocationget called');
    break;
  }
});

module.exports = GeoStore;