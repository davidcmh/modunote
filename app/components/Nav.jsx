var React = require('react');
var {Link} = require('react-router');
import {Tabs, Tab} from 'material-ui/Tabs';
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

class Nav extends React.Component {
    state = {
        showSearchModal: false
    };

    handleOpen = () => {
        this.setState({showSearchModal: true});
    };

    handleClose = () => {
        this.setState({showSearchModal: false});
    };

    handleSubmit = () => {
        this.setState({showSearchModal: false});
        var {dispatch} = this.props;
        dispatch(actions.fetchNotes({
            "deckId": _.find(this.props.decks.items, {name: this.state.topic}).id
        }));
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
                        hintText=""
                        dataSource={_.map(this.props.decks.items, 'name')}
                        filter={AutoComplete.caseInsensitiveFilter}
                        onUpdateInput={(input) => this.state.topic = input}
                    />
                    <br /> Context <TextField id='context' onChange={(event) => this.state.context = parseInt(event.target.context)} />
                    <br /> Tags <TextField id='tags' onChange={(event) => this.state.tags = event.target.value} />
                    <br /> Keywords <TextField id='keywords' />
                    <br /> Date <DatePicker style={{display:'inline-block'}} />
                </Dialog>

                <Tabs>
                    <Tab label="Home" containerElement={<Link to="/"/>}/>
                    <Tab label="Notes" containerElement={<Link to="/notes"/>}/>
                </Tabs>
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
