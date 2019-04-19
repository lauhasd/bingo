import _ from 'lodash';
import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const maxNumbers = 75;
    this.state = {
      // Card is a 3d array containing the cards with rows and numbers
      cards: [],
      cardCount: 9,
      maxNumbers: maxNumbers,
      numbers: _.chunk(
        [...Array(maxNumbers).keys()].map(k => k + 1),
        maxNumbers / 5
      ),
    };
  }

  componentDidMount() {
    this.generateCards();
  }

  generateCards() {
    const { cardCount, numbers } = this.state;

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

    this.setState({cards: cards});
  }

  updateCardCount(newCount) {
    const count = parseInt(newCount)
    this.setState({cardCount: count}, () => {
      if (!(isNaN(count) || count <= 0)) {
        this.generateCards();
      }
    });
  }

  render() {
    const { cards, cardCount } = this.state;
    return (
      <div className="App">
        <div className="editor">
          How many cards to print?
          <input onChange={(e) => this.updateCardCount(e.target.value)}
                 type='number'
                 value={cardCount} />
          <button onClick={() => window.print()}>Print</button>
        </div>
        {cards.map(card => <Card rows={card} />)}
      </div>
    );
  }
}

const Card = ({ rows }) => {
  const block = (text, extraCls="") => <div className={"block " + extraCls}><span>{text}</span></div>;
  return (
    <div className="card">
      <div className="row title-row">
        {'BINGO'.split('').map(letter => block(letter))}
      </div>
      {
        rows.map((row, rowIndex) => {
          return (
            <div className="row">
              {row.map((num, numIndex) => {
                if (rowIndex === 2 && numIndex === 2) {
                  return block('free', 'free');
                } else {
                  return block(num);
                }
               })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default App;
