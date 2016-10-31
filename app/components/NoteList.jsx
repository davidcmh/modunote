var React = require('react');
var Note = require('Note');

var notes = [
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
];

var NoteList = React.createClass({
  getDefaultProps: function() {
    return {
      notes: notes
    };
  },
  render: function() {
    var noteNodes = this.props.notes.map(function(n) {
      return (
        <Note noteData={n} key={n.id}/>
      );
    });

    return (
      <div>
        {noteNodes}
      </div>
    )
  }
});

module.exports = NoteList;
