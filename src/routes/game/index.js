import React from 'react';
import Game from './Game';
import DestinyStore from '../../stores/DestinyStore';

export default {
  path: '/Game',
  action(context) {
    return <Game/>;
  }
};
