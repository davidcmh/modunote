var React = require('react');
var Card = require('Card');

var cardList = [
  {
    id: 1,
    question: 'Why is the sky blue?',
    answer: "Blue light is scattered in all directions by the tiny molecules of air in Earth's atmosphere. Blue is scattered more than other colors because it travels as shorter, smaller waves. This is why we see a blue sky most of the time."
  },
  {
    id: 2,
    question: 'What is the capital of Australia?',
    answer: "Canberra"
  },
  {
    id: 3,
    question: 'When was United Kingdom founded?',
    answer: "1 May 1707"
  }
]

var CardViewer = React.createClass({
  getDefaultProps: function() {
    return {
      cards: cardList
    };
  },
  render: function() {
    var cardNodes = this.props.cards.map(function(c) {
      return (
        <Card cardData={c} key={c.id}/>
      );
    });

    return (
      <div>
        {cardNodes}
      </div>
    )
  }
});

module.exports = CardViewer;
