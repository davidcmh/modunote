var React = require('react');
var Note = require('Note');
var {connect} = require('react-redux');
var _ = require('lodash');
import CircularProgress from 'material-ui/CircularProgress';

var NoteList = React.createClass({
    render: function () {
        var noteNodes = _.map(this.props.notes.items, function (n) {
            return (
                <Note noteData={n} key={n.id}/>
            );
        });

        return (
            <div>
                {this.props.notes.isFetching ? <CircularProgress size={40} thickness={4} /> : null}
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
