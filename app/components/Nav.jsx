var React = require('react');
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
var {connect} = require('react-redux');
var actions = require('actions');
import AutoComplete from 'material-ui/AutoComplete';
var _ = require('lodash');
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionHome from 'material-ui/svg-icons/action/home';
var {Link} = require('react-router');

class Nav extends React.Component {
    static contextTypes = { router: React.PropTypes.object };

    state = {
        showSearchModal: false,
        topics: [],
        activeSearchTopicValue: '',
        tags: [],
        activeSearchTagValue: '',
        contexts: [],
        activeSearchContextValue: '',
        currentFilters: {},
        disableSearch: false
    };

    styles = {
        chip: {
            margin: 4
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        headerInfo: {
            fontSize:'11px',
            fontFamily: 'Roboto, sans-serif',
            display: 'inline',
            verticalAlign: 'super'
        }
    };

    handleOpen = () => {
        this.setState({showSearchModal: true});
    };

    handleClose = () => {
        this.setState({showSearchModal: false});
    };

    // TODO: handle invalid topics input
    handleSubmit = () => {
        this.setState({showSearchModal: false});
        var {dispatch} = this.props;
        const filters = {};
        if(this.state.contexts.length) filters.contexts = _.map(this.state.contexts, 'label');
        if(this.state.topics.length) filters.topics = _.map(this.state.topics, 'label');
        if(this.state.tags.length) filters.tags = _.map(this.state.tags, 'label');
        dispatch(actions.fetchNotes(filters));
        this.setState({contexts:[]});
        this.setState({topics:[]});
        this.setState({tags:[]});
        this.setState({currentFilters:filters});
        console.log('Filters from handleSubmit:', filters);
    };

    handleDeleteContext = (key) => {
        const contexts = this.state.contexts;
        const indexToDelete = _.indexOf(_.map(this.state.contexts, 'id'), key);
        contexts.splice(indexToDelete, 1);
        this.setState({contexts: contexts});
    };

    handleDeleteTopic = (key) => {
        const topics = this.state.topics;
        const indexToDelete = _.indexOf(_.map(this.state.topics, 'id'), key);
        topics.splice(indexToDelete, 1);
        this.setState({topics: topics});
    };

    handleDeleteTag = (key) => {
        const tags = this.state.tags;
        const indexToDelete = _.indexOf(_.map(this.state.tags, 'id'), key);
        tags.splice(indexToDelete, 1);
        this.setState({tags: tags});
    };

    handleAddContext = () => {
        const contexts = this.state.contexts;
        contexts.push({
            key: contexts.length,
            label: this.state.activeSearchContextValue
        });
        this.setState({contexts: contexts});
        this.setState({activeSearchContextValue: ''});
    };

    handleAddTopic = () => {
        const topics = this.state.topics;
        topics.push({
            key: topics.length,
            label: this.state.activeSearchTopicValue
        });
        this.setState({topics: topics});
        this.setState({activeSearchTopicValue: ''});
    };

    handleAddTag = () => {
        const tags = this.state.tags;
        tags.push({
            key: tags.length,
            label: this.state.activeSearchTagValue
        });
        this.setState({tags: tags});
        this.setState({activeSearchTagValue: ''});
    };

    renderContext = (context) => {
        return (
            <Chip
                key={context.key}
                onRequestDelete={() => this.handleDeleteContext(context.key)}
                style={this.styles.chip}
            >
                {context.label}
            </Chip>
        );
    };

    renderTopic = (topic) => {
        return (
            <Chip
                key={topic.key}
                onRequestDelete={() => this.handleDeleteTopic(topic.key)}
                style={this.styles.chip}
            >
                {topic.label}
            </Chip>
        );
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
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleSubmit}
            />
        ];

        const { router } = this.context;

        return (
            <div>
                <IconButton
                    containerElement={<Link to="/" />}
                    onTouchTap={() => this.setState({disableSearch: false})}
                >
                    <ActionHome />
                </IconButton>
                <IconButton
                    containerElement={<Link to="/editor" />}
                    onTouchTap={() => this.setState({disableSearch: true})}
                >
                    <EditorModeEdit />
                </IconButton>
                <IconButton
                    onTouchTap={this.handleOpen}
                    disabled={this.state.disableSearch}
                >
                    <SearchIcon />
                </IconButton>
                {this.state.disableSearch ? null :
                    <p style={this.styles.headerInfo}>
                        {_.isEmpty(this.state.currentFilters) ?
                            'All notes'
                            : _.map(
                            this.state.currentFilters, function (v, k) {
                                return k + ': ' + _.join(v, ', ')
                            }).join(' | ')}
                    </p>
                }
                <Dialog
                    title="Search"
                    actions={actions}
                    modal={true}
                    open={this.state.showSearchModal}
                >
                    Topics &nbsp;
                    <AutoComplete
                        id="Topics"
                        searchText={this.state.activeSearchTopicValue}
                        dataSource={_.map(this.props.topics.items, 'name')}
                        filter={AutoComplete.caseInsensitiveFilter}
                        openOnFocus={true}
                        onUpdateInput={(input) => this.setState({activeSearchTopicValue: input})}
                    />
                    <FlatButton
                        label="Add"
                        secondary={true}
                        onTouchTap={this.handleAddTopic}
                        disabled={this.state.activeSearchTopicValue == ''}
                    />
                    {this.state.topics.length > 0 ? <div style={this.styles.wrapper}> {this.state.topics.map(this.renderTopic, this)} </div> : null}
                    <br />

                    Tags &nbsp;
                    <AutoComplete
                        id="Tag"
                        searchText={this.state.activeSearchTagValue}
                        dataSource={_.map(this.props.tags.items, 'name')}
                        filter={AutoComplete.caseInsensitiveFilter}
                        openOnFocus={true}
                        onUpdateInput={(input) => this.setState({activeSearchTagValue: input})}
                    />
                    <FlatButton
                        label="Add"
                        secondary={true}
                        onTouchTap={this.handleAddTag}
                        disabled={this.state.activeSearchTagValue == ''}
                    />
                    {this.state.tags.length > 0 ? <div style={this.styles.wrapper}> {this.state.tags.map(this.renderTag, this)} </div> : null}
                    <br />

                    Context &nbsp;
                    <AutoComplete
                        id="Context"
                        searchText={this.state.activeSearchContextValue}
                        dataSource={_.map(this.props.contexts.items, 'name')}
                        filter={AutoComplete.caseInsensitiveFilter}
                        openOnFocus={true}
                        onUpdateInput={(input) => this.setState({activeSearchContextValue: input})}
                    />
                    <FlatButton
                        label="Add"
                        secondary={true}
                        onTouchTap={this.handleAddContext}
                        disabled={this.state.activeSearchContextValue == ''}
                    />
                    {this.state.contexts.length > 0 ? <div style={this.styles.wrapper}> {this.state.contexts.map(this.renderContext, this)} </div> : null}
                    <br />

                    Keywords
                    <TextField
                        id='keywords'
                    />
                    <br />

                    Date &nbsp;
                    <DatePicker
                        id='Date'
                        style={{display:'inline-block'}}
                    />
                </Dialog>
            </div>
        );
    }
}

module.exports = connect(
    (state) => {
        return {
            contexts: state.contexts,
            topics: state.topics,
            tags: state.tags
        };
    }
)(Nav);
