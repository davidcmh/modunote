// adapted from: http://www.reactexamples.com/react-markdown-editor/
var React = require('react');
var _ = require('lodash');
var Markdown = require('react-markdown');
var {connect} = require('react-redux');
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
var actions = require('actions');
var moment = require('moment');

class MarkdownEditor extends React.Component {
    state = {
        context: '',
        topic: '',
        activeTagValue: '',
        tags: [],
        newNoteData: {},
        title: '',
        content: '',
        date: '',
        source: ''
    };

    styles = {
        chip: {
            margin: 4
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        overallDiv: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px'
        }
    };

    handleAddTag = () => {
        const tags = this.state.tags;
        tags.push({
            key: tags.length,
            label: this.state.activeTagValue
        });
        this.setState({tags: tags});
        this.setState({activeTagValue: ''});
    };

    handleDeleteTag = (key) => {
        const tags = this.state.tags;
        const indexToDelete = _.indexOf(_.map(this.state.tags, 'id'), key);
        tags.splice(indexToDelete, 1);
        this.setState({tags: tags});
    };

    clearFields = () => {
      this.setState({
          context: '',
          topic: '',
          activeTagValue: '',
          tags: [],
          newNoteData: {},
          title: '',
          content: '',
          date: '',
          source: ''
      });
    };

    handleAddNote = () => {
        // add buffer to manually selected date, so that date will not change after time zone adjustment
        var date = this.state.date == '' ? moment(Date.now()) : moment(this.state.date).add(16, 'hours');
        var newNoteData = {
            contextId: _.find(this.props.contexts.items, {'name':this.state.context}).id,
            topicId: _.find(this.props.topics.items, {'name':this.state.topic}).id,
            title: this.state.title,
            content: this.state.content,
            dateCreated: date,
            dateUpdated: date,
            source: this.state.source
        };

        var existingTags = this.props.tags.items;
        var tagIds = _.map(this.state.tags, function(tag) {
            return _.find(existingTags, {'name':tag.label}).id;
        });

        this.props.dispatch(actions.createNote(newNoteData, tagIds));
        this.clearFields();
    };

    renderTag = (tag) => {
        return (
            <Chip
                key={tag.key}
                onRequestDelete={() => this.handleDeleteTag(tag.key)}
                style={this.styles.chip}
            >
                {tag.label}
            </Chip>
        );
    };

    render() {
        return (
            <div style={this.styles.overallDiv}>
                Context &nbsp;
                <AutoComplete
                    id="Context"
                    searchText={this.state.context}
                    dataSource={_.map(this.props.contexts.items, 'name')}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    onUpdateInput={(input) => this.setState({context: input})}
                />
                <br />

                Topic &nbsp;
                <AutoComplete
                    id="Topic"
                    searchText={this.state.topic}
                    dataSource={_.map(this.props.topics.items, 'name')}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    onUpdateInput={(input) => this.setState({topic: input})}
                />
                <br />

                Tags &nbsp;
                <AutoComplete
                    id="Tags"
                    searchText={this.state.activeTagValue}
                    dataSource={_.map(this.props.tags.items, 'name')}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    onUpdateInput={(input) => this.setState({activeTagValue: input})}
                />
                <FlatButton
                    label="Add"
                    secondary={true}
                    onTouchTap={this.handleAddTag}
                    disabled={this.state.activeTagValue == ''}
                />
                {this.state.tags.length > 0 ? <div style={this.styles.wrapper}> {this.state.tags.map(this.renderTag, this)} </div> : null}
                <br />

                Date added &nbsp;
                <DatePicker
                    id='Date'
                    value={this.state.date}
                    hintText='Default to current date and time'
                    style={{display:'inline-block'}}
                    onChange={(event, date) => this.setState({date: date})}
                />
                <br />

                Source &nbsp;
                <TextField
                    id='Source'
                    value={this.state.source}
                    onChange={(event) => this.setState({source: event.target.value})}
                />
                <br />

                Title &nbsp;
                <TextField
                    id='Title'
                    value={this.state.title}
                    onChange={(event) => this.setState({title: event.target.value})}
                />
                <br />
                <br />

                Content - Markdown
                <textarea
                    className="Content"
                    value={this.state.content}
                    onChange={(event) => this.setState({content: event.target.value})}
                    style={{width:'99%', height:'250px'}}
                />
                <br />
                <br />
                <FlatButton
                    label="Add note"
                    secondary={true}
                    onTouchTap={this.handleAddNote}
                />
                <br />
                <br />

                Content - Preview
                <Markdown
                    className="preview"
                    source={this.state.content}
                    escapeHtml
                />

            </div>
        );
    }
}

module.exports = connect(
    (state) => {
        return {
            contexts: state.contexts,
            topics: state.topics,
            tags: state.tags,
            note: state.note
        };
    }
)(MarkdownEditor);