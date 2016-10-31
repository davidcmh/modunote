var React = require('react');

var Note = React.createClass({
  getInitialState: function() {
    return {
      showAnswer: false
    };
  },
  getDefaultProps: function() {
    return {}
  },
  onClick: function() {
    this.setState({showAnswer:!this.state.showAnswer});
  },
  render: function() {
    return (
      <div>
        <h2>Question: {this.props.noteData.question}</h2>
      {this.state.showAnswer ? <h3>Answer: {this.props.noteData.answer}</h3> : null}
        <button onClick={this.onClick}>Show/Hide answer</button>
      </div>
    );
  }
});

module.exports = Note;
