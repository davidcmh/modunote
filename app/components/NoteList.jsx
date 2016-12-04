var React = require('react');
var Note = require('Note');
var {connect} = require('react-redux');
var _ = require('lodash');

var NoteList = React.createClass({
    render: function () {
        var noteNodes = _.map(this.props.notes.items, function (n) {
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

module.exports = connect(
    (state) => {
        return {
            notes: state.notes
        };
    }
)(NoteList);
