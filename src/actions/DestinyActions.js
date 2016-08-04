let AppDispatcher = require('../dispatcher/AppDispatcher');
let DestinyConstants = require('../constants/DestinyConstants');

let DestinyActions = {
  getGeolocation: () => {
    AppDispatcher.dispatch({
      actionType: DestinyConstants.GEOLOCATION_GET
    });
  },
  checkIn(objectiveId) {
    AppDispatcher.dispatch({
      actionType: DestinyConstants.OBJECTIVE_CHECKIN,
      objectiveId: objectiveId
    });
  }
};

module.exports = DestinyActions;