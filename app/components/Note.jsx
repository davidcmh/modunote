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
        },
        noteHeader: {
          paddingBottom: '10px'
        },
        noteContent: {
            fontSize: '12px',
            paddingTop: 0
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
    //{this.props.noteData.tags && this.props.noteData.tags.length ? <div style={this.styles.wrapper}> {_.map(this.props.noteData.tags.split(','), this.renderTag)} </div> : null}

    render() {
        var noteInfo = [
            'topic: ' + this.props.noteData.topic,
            'context: ' + this.props.noteData.context
        ];

        if (this.props.noteData.tags)
            noteInfo.push('tags: ' + this.props.noteData.tags);

        return (
            <div>
                <Card>
                    <CardHeader
                        title={this.props.noteData.title}
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={this.styles.noteHeader}
                    >
                        <p style={{fontSize:'11px'}}>
                            {noteInfo.join(' | ')}
                        </p>
                        <p style={{fontSize:'11px'}}>
                            {
                                [
                                    'date created: ' + this.props.noteData.date_created,
                                    'date updated: ' + this.props.noteData.date_updated
                                ].join(' | ')
                            }
                        </p>
                    </CardHeader>
                    <CardText
                        expandable={true}
                        style={this.styles.noteContent}
                    >
                        <Markdown source={this.props.noteData.content}/>
                    </CardText>
                </Card>
            </div>
        );
    }
}


module.exports = Note;