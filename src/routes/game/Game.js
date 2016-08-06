import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Game.css';
import DestinyStore from '../../stores/DestinyStore';

const title = 'Game';

class Game extends Component {
  constructor(props, context) {
    super();
    this.props = props;
    this.context = context;
    this.state = {
      selectedAction: 'New Game'
    };
  }

  componentDidMount() {
    DestinyStore.addChangeListener(() => this.onStoreChange());
  }

  onStoreChange() {
    this.setState(DestinyStore.getAll());
  }

  startNewGame() {
    window.location.href = '/orbit/';
  }

  loadSavedGame() {
    console.log('load saved game');
  }

  gameActionSelected(optionText) {
    console.log(optionText);
    this.setState({
      selectedAction: optionText
    });
  }

  render() {
    let gameActions = [
      {
        text: 'New Game',
        callback: this.startNewGame
      },
      {
        text: 'Load',
        callback: this.loadSavedGame
      }
    ].map((action, i) => {
      let selected = this.state.selectedAction; 
      let className = (selected === action.text) ? s.gameActionSelected : s.gameAction;
    
      let callback = () => {
        this.gameActionSelected(action.text);
        action.callback();
      };

      return (<li key={i}>
        <button className={className} onClick={callback}>{action.text}</button>
      </li>);
    });

    return (
      <div className={s.root}>
        <div className={s.container}>
          <ul className={s.gameActionsList}>
            {gameActions}
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Game);
