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
  },
  undoCheckIn(objectiveId) {
    AppDispatcher.dispatch({
      actionType: DestinyConstants.OBJECTIVE_UNDO_CHECKIN,
      objectiveId: objectiveId
    });
  },
  toggleCheat(cheatName, setting) {
    AppDispatcher.dispatch({
      cheatName: cheatName,
      setting: setting,
      actionType: DestinyConstants.CHEAT_TOGGLE
    });
  }
};

module.exports = DestinyActions;