import _ from 'lodash';
import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const maxNumbers = 75,
          numbers = _.chunk(
            [...Array(maxNumbers).keys()].map(k => k + 1),
            maxNumbers / 5
          ),
          cardCount = 30;

    let cards = Array(cardCount).fill();

    cards = cards.map(card => {
        let rows = Array(5).fill(),
            usedNumbers = [];

        return rows.map(row => {
          let newRow = [];

          numbers.forEach(chunk => {
            let randomChoice = _.sample(chunk);
            while (usedNumbers.includes(randomChoice)) {
              randomChoice = _.sample(chunk);
            }
            usedNumbers.push(randomChoice);
            newRow.push(randomChoice);
          });

          return newRow;
        });

    });

    this.state = {
      // Card is a 2d array containing the numbers
      cards: cards,
      maxNumbers: maxNumbers,
      numbers: numbers,
    };
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="App">
        {cards.map(card => <Card rows={card} />)}
      </div>
    );
  }
}

const Card = ({ rows }) => {
  const block = text => <div className="block"><span>{text}</span></div>;
  return (
    <div className="card">
      <div className="row">
        {'BINGO'.split('').map(letter => block(letter))}
      </div>
      {
        rows.map(row => {
          return (
            <div className="row">
              {row.map(num => block(num))}
            </div>
          );
        })
      }
    </div>
  );
};

export default App;
