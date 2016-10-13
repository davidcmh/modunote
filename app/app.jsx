var React = require('react');
var ReactDOM = require('react-dom');
var CardViewer = require('CardViewer');

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

ReactDOM.render(
  <CardViewer cards={cardList}/>,
  document.getElementById('app')
);
