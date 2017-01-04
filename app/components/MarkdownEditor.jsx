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
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'

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
        source: '',
        newContext: '',
        newTopic: '',
        newTag: ''
    };

    styles = {
        chip: {
            margin: 4
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        defaultFont: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px'
        },
        outerBox: {
            padding:'5px'
        },
        innerBox: {
            background:'white',
            padding:'10px'
        },
        header: {
            fontSize:'16px',
            display:'block',
            paddingTop:'10px',
            paddingBottom:'10px'
        },
        headerInline: {
            fontSize:'16px',
            display:'inline-block',
            paddingTop:'10px',
            paddingBottom:'10px'
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

    handleCreateContext = () => {
        var contextData = {
            name: this.state.newContext
        };

        this.props.dispatch(actions.createContext(contextData));
        this.setState({newContext:''});
    };

    handleCreateTopic = () => {
        var topicData = {
            name: this.state.newTopic
        };

        this.props.dispatch(actions.createTopic(topicData));
        this.setState({newTopic:''});
    };

    handleCreateTag = () => {
        var tagData = {
            name: this.state.newTag
        };

        this.props.dispatch(actions.createTag(tagData));
        this.setState({newTag:''});
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
            <div style={this.styles.defaultFont}>
                <Grid>
                    <Row>
                        <Col style={this.styles.outerBox} xs={4}>
                            <div style={this.styles.innerBox}>
                                <span style={this.styles.header}>CONTEXT</span>
                                <AutoComplete
                                    id="CreateContext"
                                    searchText={this.state.newContext}
                                    dataSource={_.map(this.props.contexts.items, 'name')}
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    openOnFocus={true}
                                    onUpdateInput={(input) => this.setState({newContext: input})}
                                />
                                <FlatButton
                                    label="Create"
                                    onTouchTap={this.handleCreateContext}
                                    disabled={this.state.newContext == ''}
                                />
                            </div>
                        </Col>
                        <Col style={this.styles.outerBox} xs={4}>
                            <div style={this.styles.innerBox}>
                                <span style={this.styles.header}>TOPIC</span>
                                <AutoComplete
                                    id="CreateTopic"
                                    searchText={this.state.newTopic}
                                    dataSource={_.map(this.props.topics.items, 'name')}
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    openOnFocus={true}
                                    onUpdateInput={(input) => this.setState({newTopic: input})}
                                />
                                <FlatButton
                                    label="Create"
                                    onTouchTap={this.handleCreateTopic}
                                    disabled={this.state.newTopic == ''}
                                />
                            </div>
                        </Col>
                        <Col style={this.styles.outerBox} xs={4}>
                            <div style={this.styles.innerBox}>
                                <span style={this.styles.header}>TAG</span>
                                <AutoComplete
                                    id="CreateTag"
                                    searchText={this.state.newTag}
                                    dataSource={_.map(this.props.tags.items, 'name')}
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    openOnFocus={true}
                                    onUpdateInput={(input) => this.setState({newTag: input})}
                                />
                                <FlatButton
                                    label="Create"
                                    onTouchTap={this.handleCreateTag}
                                    disabled={this.state.newTag == ''}
                                />
                            </div>
                        </Col>

                    </Row>

                    <Row>
                        <Col style={this.styles.outerBox} xs={12}>
                            <div style={this.styles.innerBox}>
                                <Row>
                                    <Col xs={10}>
                                        <span style={this.styles.headerInline}>NOTE</span>
                                    </Col>
                                    <Col xs={2}>
                                        <FlatButton
                                            label="Create note"
                                            secondary={true}
                                            onTouchTap={this.handleAddNote}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={4}>
                                        Context &nbsp;
                                        <AutoComplete
                                            id="Context"
                                            textFieldStyle={this.styles.defaultFont}
                                            menuStyle={this.styles.defaultFont}
                                            listStyle={this.styles.defaultFont}

                                            searchText={this.state.context}
                                            dataSource={_.map(this.props.contexts.items, 'name')}
                                            filter={AutoComplete.caseInsensitiveFilter}
                                            openOnFocus={true}
                                            onUpdateInput={(input) => this.setState({context: input})}
                                        />
                                    </Col>
                                    <Col xs={4}>
                                        Topic &nbsp;
                                        <AutoComplete
                                            id="Topic"
                                            textFieldStyle={this.styles.defaultFont}
                                            searchText={this.state.topic}
                                            dataSource={_.map(this.props.topics.items, 'name')}
                                            filter={AutoComplete.caseInsensitiveFilter}
                                            openOnFocus={true}
                                            onUpdateInput={(input) => this.setState({topic: input})}
                                        />
                                    </Col>
                                    <Col xs={4}>
                                        Date added &nbsp;
                                        <DatePicker
                                            id='Date'
                                            value={this.state.date}
                                            hintText='Default to current date and time'
                                            textFieldStyle={this.styles.defaultFont}
                                            style={{display:'inline-block'}}
                                            onChange={(event, date) => this.setState({date: date})}
                                        />
                                    </Col>
                                </Row>

                                Title &nbsp;
                                <TextField
                                    id='Title'
                                    value={this.state.title}
                                    textFieldStyle={this.styles.defaultFont}
                                    style={{width:'96%'}}
                                    onChange={(event) => this.setState({title: event.target.value})}
                                />
                                <br />

                                <Row>
                                    <Col xs={6}>
                                        Tags &nbsp;
                                        <AutoComplete
                                            id="Tags"
                                            textFieldStyle={this.styles.defaultFont}
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
                                    </Col>
                                    <Col xs={6}>
                                        Source &nbsp;
                                        <TextField
                                            id='Source'
                                            value={this.state.source}
                                            textFieldStyle={this.styles.defaultFont}
                                            onChange={(event) => this.setState({source: event.target.value})}
                                        />
                                        <br />
                                    </Col>
                                </Row>

                                <br />
                                Content - Markdown
                                <textarea
                                    className="Content"
                                    value={this.state.content}
                                    onChange={(event) => this.setState({content: event.target.value})}
                                    style={{width:'99%', height:'250px', marginTop:'5px', borderColor:'rgba(0, 0, 0, 0.298039)', padding:'10px'}}
                                />
                                <br />
                                <br />

                                Content - Preview
                                <div style={{borderStyle:'solid', borderWidth:'1px', borderColor:'rgba(0, 0, 0, 0.298039)', padding:'10px'}}>
                                    <Markdown
                                        className="preview"
                                        source={this.state.content}
                                        escapeHtml
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Grid>
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