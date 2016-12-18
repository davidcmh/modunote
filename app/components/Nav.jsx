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

class Nav extends React.Component {
    state = {
        showSearchModal: false,
        tags: [],
        activeTagValue: ''
    };

    styles = {
        chip: {
            margin: 4
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap'
        }
    };

    handleOpen = () => {
        this.setState({showSearchModal: true});
    };

    handleClose = () => {
        this.setState({showSearchModal: false});
    };

    // TODO: handle invalid topic input
    handleSubmit = () => {
        this.setState({showSearchModal: false});
        var {dispatch} = this.props;
        const filters = {};
        if(this.state.topic) filters.deckId = _.find(this.props.decks.items, {name: this.state.topic}).id;
        if(this.state.tags.length) filters.tags = _.map(this.state.tags, 'label');
        dispatch(actions.fetchNotes(filters));
        this.setState({topic:''});
        this.setState({tags:[]});
    };

    handleDeleteTag = (key) => {
        const tags = this.state.tags;
        const indexToDelete = _.indexOf(_.map(this.state.tags, 'id'), key);
        tags.splice(indexToDelete, 1);
        this.setState({tags: tags});
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

        return (
            <div>
                <IconButton onTouchTap={this.handleOpen}><SearchIcon /></IconButton>
                <Dialog
                    title="Search"
                    actions={actions}
                    modal={true}
                    open={this.state.showSearchModal}
                >
                    Topic &nbsp;
                    <AutoComplete
                        id="Topic"
                        hintText=""
                        dataSource={_.map(this.props.decks.items, 'name')}
                        filter={AutoComplete.caseInsensitiveFilter}
                        openOnFocus={true}
                        onUpdateInput={(input) => this.state.topic = input}
                    />
                    <br />

                    Tags &nbsp;
                    <TextField
                        id='tags'
                        value={this.state.activeTagValue}
                        onChange={(event) => this.setState({activeTagValue: event.target.value})}
                    />
                    <FlatButton
                        label="Add"
                        secondary={true}
                        onTouchTap={this.handleAddTag}
                        disabled={this.state.activeTagValue == ''}
                    />
                    {this.state.tags.length > 0 ? <div style={this.styles.wrapper}> {this.state.tags.map(this.renderTag, this)} </div> : null}
                    <br />

                    Context
                    <TextField
                        id='context'
                        onChange={(event) => this.setState({context: parseInt(event.target.context)})} />
                    <br />

                    Keywords
                    <TextField
                        id='keywords'
                    />
                    <br />

                    Date
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
            decks: state.decks
        };
    }
)(Nav);
