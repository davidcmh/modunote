var React = require('react');
import {Card, CardHeader, CardText} from 'material-ui/Card';

var Note = React.createClass({
  render: function() {
    return (
      <div>
        <Card>
          <CardHeader
              title={this.props.noteData.title}
              subtitle="#tags"
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardText expandable={true}>
            <pre>{this.props.noteData.content}</pre>
          </CardText>
        </Card>
      </div>
    );
  }
});


module.exports = Note;