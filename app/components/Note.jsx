var React = require('react');
import {Card, CardHeader, CardText} from 'material-ui/Card';
var Markdown = require('react-markdown');
import Chip from 'material-ui/Chip';

class Note extends React.Component {
    styles = {
        chip: {
            margin: 4
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap'
        }
    };

    renderTag = (label, index) => {
        return (
            <Chip
                key={index}
                style={this.styles.chip}
            >
                {label}
            </Chip>
        );
    };

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        title={this.props.noteData.title}
                        actAsExpander={true}
                        showExpandableButton={true}
                    >
                        {this.props.noteData.tags.length ? <div style={this.styles.wrapper}> {_.map(this.props.noteData.tags.split(','), this.renderTag)} </div> : null}
                    </CardHeader>
                    <CardText expandable={true}>
                        <Markdown source={this.props.noteData.content}/>
                    </CardText>
                </Card>
            </div>
        );
    }
}


module.exports = Note;