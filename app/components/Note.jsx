var React = require('react');
import {Card, CardHeader, CardText} from 'material-ui/Card';
var Markdown = require('react-markdown');

var Note = React.createClass({
  render: function() {
    return (
      <div>
        <Card>
          <CardHeader
              title={this.props.noteData.title}
              subtitle= {"#" + this.props.noteData.tags}
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardText expandable={true}>
              <Markdown source={this.props.noteData.content}/>
          </CardText>
        </Card>
      </div>
    );
  }
});


module.exports = Note;