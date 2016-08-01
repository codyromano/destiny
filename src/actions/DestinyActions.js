let AppDispatcher = require('../dispatcher/AppDispatcher');
let DestinyConstants = require('../constants/DestinyConstants');

let DestinyActions = {
  getGeolocation: () => {
    AppDispatcher.dispatch({
      actionType: DestinyConstants.GEOLOCATION_GET
    });
  }
};

module.exports = DestinyActions;