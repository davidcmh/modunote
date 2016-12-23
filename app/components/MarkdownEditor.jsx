// adapted from: http://www.reactexamples.com/react-markdown-editor/

'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var _ = require('lodash');
var Markdown = require('react-markdown');

var hasLocalStorage = supportsLocalStorage();
var initialSource = getDefaultSource();

var MarkdownEditor = React.createClass({
    onChange: function(e) {
        this.setState({ source: e.target.value });
        this.storeSource(e.target.value);
    },

    storeSource: hasLocalStorage ? _.debounce(function(src) {
        localStorage.markdownSource = src || initialSource;
    }, 250) : function() {},

    render: function() {
        return (
            <div className="app">
            <textarea
                className="editor"
                defaultValue={initialSource}
                onChange={this.onChange}
            />

                <Markdown
                    className="preview"
                    source={this.state ? this.state.source : initialSource}
                    escapeHtml
                />
            </div>
        );
    }
});

//ReactDom.render(
//<App />,
//    document.getElementById('root')
//);

function supportsLocalStorage() {
    var mod = 'test';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch (e) {
        return false;
    }
}

function getDefaultSource() {
    return (hasLocalStorage && localStorage.markdownSource) || [
            '# Markdown editor', '',
            'This editor is taken directly from ' +
            '[react-markdown-editor](http://www.reactexamples.com/react-markdown-editor/), which is based on ' +
            '[react-markdown](https://github.com/rexxars/react-markdown).', '',
            'For how to write in markdown, check this out: ' +
            '[Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)', '',
            'It works with basic markdown features such as bullet points:', '',
            '* bullet point 1', '',
            '* point 2', '',
            '* point 3', '',
            'And it works with images too:','',
            '![image](images/australia-test.jpg)'
        ].join('\n');
}

module.exports = MarkdownEditor;